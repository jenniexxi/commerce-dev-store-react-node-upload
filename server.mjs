
    import express from 'express';
    import cors from 'cors';
    import { spawn } from 'child_process';
    import dayjs from 'dayjs';
    import http from 'http';

    // Vite 서버 포트 감지를 위한 변수들
    let currentPort = null;
    let isFirstLog = true;
    const vitePortRegex = /localhost:(\d+)/;

    /**
     * ANSI 색상 코드를 제거하는 함수
     * Vite 출력에서 포트 번호를 정확히 추출하기 위해 사용
     */
    function stripAnsi(str) {
      return str.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, "");
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
      console.log(`\n---------------------- Browser is opened. HAPPY HACKING ----------------------`);
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

      const url = `http://localhost:${currentPort}`;

      http
        .get(url, (res) => {
          console.log("로컬 서버 호출");
          if (res.statusCode === 200) {
            console.log("로컬 서버 응답 완료\n\n브라우저 실행 중...");
            openBrowser(url);
            startExpressServer();
          } else {
            console.log(
              `서버 응답 실패. 재시도 중... ${currentPort} | 응답 코드:`,
              res.statusCode
            );
            setTimeout(checkServer, 2000);
          }
        })
        .on("error", (err) => {
          console.error(`서버 연결 오류 (포트 ${currentPort}):`, err.message);
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
        console.error('[41m%s[0m',error);
        res.send('OK');
      });

       // 경고 로그용 엔드포인트
      app.post('/__console_warn', (req, res) => {
       const { args } = req.body;
         console.warn('[48;5;166m[97m%s[0m', ...args);
       res.send('OK');
      });

      app.listen(3030, () => {
        console.log('\x1b[32m%s\x1b[0m', '로그 서버가 3030 포트에서 시작되었습니다');
      });
    }

    // Vite 서버의 출력을 감시하여 포트 번호 감지
    vite.stdout.on("data", (data) => {
      const output = stripAnsi(data.toString());

      if (isFirstLog) {
        console.log(
          "---------------------- Vite 서버 시작",
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "----------------------\n"
        );
        isFirstLog = false;
      }

      // 포트 번호 추출 및 서버 상태 확인
      const match = output.match(vitePortRegex);
      if (match && currentPort === null) {
        currentPort = parseInt(match[1], 10);
        if (currentPort > 0 && currentPort < 65536) {
          console.log(`Vite 서버 확인: ${currentPort}포트에서 실행 중\n`);
          checkServer();
        } else {
          console.log(`유효하지 않은 포트 번호: ${currentPort}`);
          currentPort = null;
        }
      }
    });

    // 종료 시그널 처리
    process.on("SIGINT", () => {
      vite.kill();
      process.exit();
    });
  