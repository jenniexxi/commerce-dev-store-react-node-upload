import { execSync, spawn } from 'child_process';
import dayjs from 'dayjs';
import { existsSync, writeFileSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';

/**
 * Vite 개발 서버 실행 및 로그 출력 스크립트
 *
 * 기능:
 * - Vite 개발 서버 실행 및 자동 포트 감지
 * - 브라우저 자동 실행 (Windows/Mac 지원)
 * - API 로그 컬러 출력 (요청/응답 구분, HTTP 메서드별 색상)
 * - 실행 중인 프로세스 자동 정리
 * - Express 로그 서버 실행 (3030 포트)
 *
 * 사용법:
 * 1. yarn dev 또는 npm run dev로 실행
 * 2. 기존 실행 중인 프로세스는 자동으로 정리됨
 * 3. 새 터미널이 열리며 Vite 서버가 시작됨
 * 4. 브라우저가 자동으로 열림
 *
 */

/**
 * 실행 중인 Node.js 프로세스를 정리하는 함수
 * Windows와 Unix 계열 OS에 따라 다른 명령어 사용
 * Windows: tasklist/taskkill 명령어 사용
 * Unix: pgrep/pkill 명령어 사용
 */
function cleanupProcesses() {
  console.log('프로세스 정리 중...');
  try {
    if (platform() === 'win32') {
      console.log('Windows 프로세스 정리 중...');
      const currentPid = process.pid;
      console.log('현재 프로세스 ID:', currentPid);

      // Windows에서 실행 중인 node.exe 프로세스 목록 가져오기
      const processList = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV /NH', { encoding: 'utf8' });
      console.log('발견된 프로세스:', processList);

      // CSV 형식의 프로세스 목록을 파싱하여 PID 추출
      const processes = processList
        .split('\r\n')
        .filter((line) => line.trim())
        .map((line) => {
          const match = line.match(/"node\.exe","(\d+)"/);
          return match ? match[1] : null;
        })
        .filter((pid) => pid && pid !== currentPid.toString());

      console.log('종료할 프로세스:', processes);

      // 각 프로세스를 강제 종료
      for (const pid of processes) {
        try {
          console.log(`프로세스 종료 시도: ${pid}`);
          execSync(`taskkill /F /PID ${pid}`, {
            stdio: 'pipe',
            timeout: 5000, // 5초 이내 종료되지 않으면 타임아웃
          });
          console.log(`프로세스 종료 성공: ${pid}`);
        } catch (e) {
          console.log(`프로세스 종료 실패 ${pid}. 계속 진행... :`, e);
        }
        // 프로세스 종료 후 1초 대기 (안정성 확보)
        execSync('timeout /t 1', { stdio: 'ignore' });
      }

      console.log('프로세스 정리 완료');
    } else {
      console.log('Unix 프로세스 정리 중...');
      try {
        // Unix 계열에서 서버 프로세스 확인
        const hasServerProcess = execSync('pgrep -f "node.*server.mjs"', { stdio: 'pipe' }).toString();
        const hasViteProcess = execSync('pgrep -f vite', { stdio: 'pipe' }).toString();

        if (hasServerProcess) {
          execSync('pkill -f "node.*server.mjs"');
          console.log('서버 프로세스 종료됨');
        }
        if (hasViteProcess) {
          execSync('pkill -f vite');
          console.log('Vite 프로세스 종료됨');
        }
        if (!hasServerProcess && !hasViteProcess) {
          console.log('정리할 프로세스 없음');
        }
      } catch (e) {
        // pgrep 명령어가 프로세스를 찾지 못하면 에러를 반환함
        // 이는 정상적인 상황이므로 무시
        console.log('활성 프로세스 없음');
      }
    }
  } catch (error) {
    if (platform() === 'win32' || (error as any)?.status !== 1) {
      console.log('정리 중 오류:', error);
    }
  }
  console.log('프로세스 정리 함수 종료');
}

/**
 * OS별로 적절한 터미널 실행 명령어를 반환하는 함수
 * - Mac: osascript를 사용하여 Terminal.app 실행
 * - Windows: cmd.exe를 사용하여 새 명령 프롬프트 실행
 * - Linux: x-terminal-emulator를 사용하여 기본 터미널 실행
 */
function getTerminalCommand(): { command: string; args: string[] } {
  const currentPath = process.cwd();
  console.log('현재 경로:', currentPath);

  // Express 서버 스크립트 정의
  const serverScript = `
    import express from 'express';
    import cors from 'cors';
    import { spawn } from 'child_process';
    import dayjs from 'dayjs';
    import http from 'http';

    // Vite 서버 포트 감지를 위한 변수들
    let currentPort = null;
    let isFirstLog = true;
    const vitePortRegex = /localhost:(\\d+)/;

    /**
     * ANSI 색상 코드를 제거하는 함수
     * Vite 출력에서 포트 번호를 정확히 추출하기 위해 사용
     */
    function stripAnsi(str) {
      return str.replace(/\\x1B[[(?);]{0,2}(;?\\d)*./g, "");
    }

    /**
     * OS에 따라 적절한 브라우저 실행 명령어를 사용하여 URL을 엶
     */
    function openBrowser(url) {
      let command;
      let args;

      switch (process.platform) {
        case "darwin":
          command = "open";
          args = [url];
          break;
        case "win32":
          command = "cmd";
          args = ["/c", "start", "", url];
          break;
        default:
          console.log("지원하지 않는 플랫폼입니다. 직접 브라우저를 여세요:", url);
          return;
      }

      spawn(command, args, {
        stdio: "inherit",
        shell: process.platform === "win32",
      });
      console.log(\`\\n---------------------- Browser is opened. HAPPY HACKING ----------------------\`);
    }

    /**
     * Vite 서버가 실행되었는지 확인하고 브라우저를 여는 함수
     * 서버가 준비되지 않았다면 재시도
     */
    function checkServer() {
      if (currentPort === null || currentPort <= 0 || currentPort > 65535) {
        console.log("유효한 Vite 포트를 찾지 못했습니다. 다시 시도 중...");
        setTimeout(checkServer, 1000);
        return;
      }

      const url = \`http://localhost:\${currentPort}\`;

      http
        .get(url, (res) => {
          console.log("로컬 서버 호출");
          if (res.statusCode === 200) {
            console.log("로컬 서버 응답 완료\\n\\n브라우저 실행 중...");
            openBrowser(url);
            startExpressServer();
          } else {
            console.log(
              \`서버 응답 실패. 재시도 중... \${currentPort} | 응답 코드:\`,
              res.statusCode
            );
            setTimeout(checkServer, 2000);
          }
        })
        .on("error", (err) => {
          console.error(\`서버 연결 오류 (포트 \${currentPort}):\`, err.message);
          setTimeout(checkServer, 1000);
        });
    }

    // Vite 서버 실행
    const vite = spawn("npx", ["vite"], {
      stdio: ["inherit", "pipe", "inherit"],
      shell: process.platform === "win32",
    });

    /**
     * Express 서버를 시작하는 함수
     * 로그 수집을 위한 엔드포인트 제공
     */
    function startExpressServer() {
      const app = express();
      app.use(cors());
      app.use(express.json());

      // 일반 로그용 엔드포인트
      app.post('/__console_log', (req, res) => {
        const { args } = req.body;
        console.log(...args);
        res.send('OK');
      });

      // 에러 로그용 엔드포인트
      app.post('/__console_error', (req, res) => {
       const { error } = req.body;
        console.error('\x1b[41m%s\x1b[0m',error);
        res.send('OK');
      });

       // 경고 로그용 엔드포인트
      app.post('/__console_warn', (req, res) => {
       const { args } = req.body;
         console.warn('\x1b[48;5;166m\x1b[97m%s\x1b[0m', ...args);
       res.send('OK');
      });

      app.listen(3030, () => {
        console.log('\\x1b[32m%s\\x1b[0m', '로그 서버가 3030 포트에서 시작되었습니다');
      });
    }

    // Vite 서버의 출력을 감시하여 포트 번호 감지
    vite.stdout.on("data", (data) => {
      const output = stripAnsi(data.toString());

      if (isFirstLog) {
        console.log(
          "---------------------- Vite 서버 시작",
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "----------------------\\n"
        );
        isFirstLog = false;
      }

      // 포트 번호 추출 및 서버 상태 확인
      const match = output.match(vitePortRegex);
      if (match && currentPort === null) {
        currentPort = parseInt(match[1], 10);
        if (currentPort > 0 && currentPort < 65536) {
          console.log(\`Vite 서버 확인: \${currentPort}포트에서 실행 중\\n\`);
          checkServer();
        } else {
          console.log(\`유효하지 않은 포트 번호: \${currentPort}\`);
          currentPort = null;
        }
      }
    });

    // 종료 시그널 처리
    process.on("SIGINT", () => {
      vite.kill();
      process.exit();
    });
  `;

  const scriptPath = join(currentPath, 'server.mjs');
  console.log('스크립트 경로:', scriptPath);

  try {
    console.log('서버 스크립트 작성 중...');
    writeFileSync(scriptPath, serverScript);
    console.log('서버 스크립트 생성 완료');

    if (existsSync(scriptPath)) {
      console.log('파일 생성 확인 완료');
    } else {
      console.log('파일 생성 실패');
    }
  } catch (error) {
    console.error('서버 스크립트 생성 중 오류:', error);
  }

  // OS별 터미널 실행 명령어 반환
  switch (platform()) {
    case 'darwin': // macOS
      return {
        command: 'osascript',
        args: ['-e', `tell application "Terminal" to do script "cd '${currentPath}' && node '${scriptPath}'"`],
      };
    case 'win32': {
      // Windows
      const cmdScriptPath = join(currentPath, 'start.cmd');
      const cmdScript = `
          @echo off
          cd /d "${currentPath}"
          node "${scriptPath}"
          pause
        `;
      writeFileSync(cmdScriptPath, cmdScript);
      return {
        command: 'cmd.exe',
        args: ['/c', 'start', 'cmd', '/k', `"${cmdScriptPath}"`],
      };
    }
    default: // Linux 등 기타 OS
      return {
        command: 'x-terminal-emulator',
        args: ['-e', `bash -c "cd '${currentPath}' && node '${scriptPath}'; exec bash"`],
      };
  }
}

/**
 * 지정된 시간만큼 대기하는 유틸리티 함수
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 메인 실행 함수
 * 1. 프로세스 정리
 * 2. 새 터미널 실행
 * 3. 종료 시그널 처리
 */
async function main() {
  console.log('====== 스크립트 시작 ======');
  console.log('플랫폼:', platform());
  console.log('현재 디렉토리:', process.cwd());

  console.log('스크립트 초기화 중...');
  cleanupProcesses();
  console.log('프로세스 정리 완료, 터미널 시작 준비 중...');

  try {
    console.log('프로세스 정리 완료 대기 중...');
    await delay(1000); // 프로세스 정리 완료 대기

    console.log('메인 함수 실행 중');
    console.log('터미널 명령어 준비 중...');

    const { command, args } = getTerminalCommand();
    console.log('터미널 명령어 준비 완료:', { command, args });

    console.log('터미널 실행 시도 중...');
    const terminal = spawn(command, args, {
      stdio: 'inherit',
      shell: platform() === 'win32',
    });

    console.log('터미널 실행 완료');

    // 프로세스 종료 처리를 위한 Promise 반환
    return new Promise<void>((resolve) => {
      // 터미널 실행 오류 처리
      terminal.on('error', (error) => {
        console.error('터미널 실행 오류:', error);
        resolve();
      });

      // 터미널 종료 처리
      terminal.on('close', (code) => {
        console.log('터미널 프로세스 종료. 종료 코드:', code);
        resolve();
      });

      // SIGINT (Ctrl+C) 시그널 처리
      process.on('SIGINT', () => {
        console.log('SIGINT 신호 수신, 정리 중...');
        terminal.kill();
        cleanupProcesses();
        console.log(
          '\n--------------- 프로세스 종료됨 ---------------\n' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '\n',
        );
        resolve();
      });
    });
  } catch (error) {
    console.error('메인 함수 오류:', error);
    throw error;
  }
}

// 스크립트 실행 및 오류 처리
main().catch((error) => {
  console.error('처리되지 않은 오류:', error);
  process.exit(1);
});
