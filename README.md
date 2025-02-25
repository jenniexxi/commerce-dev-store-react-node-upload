# 🚀 초기 설정

## 📦 패키지 매니저 세팅

이 프로젝트는 yarn을 사용하여 패키지를 관리합니다. 프로젝트를 시작하기 전에 반드시 아래 단계를 따라야 합니다.

### 1. 해당 프로젝트의 패키지 매니저는 yarn을 사용하므로, 먼저 yarn을 설치해야 합니다.

npm이 이미 설치된 경우, 다음 명령어로 yarn을 설치할 수 있습니다.

npm 이 설치돼있지 않은 경우엔 [2. Node.js와 NVM설치](#2-nodejs-및-nvm-설치)부터 진행해주세요.

```bash
npm install --global yarn
```

설치가 완료되면 `yarn --version` 명령어로 설치 여부를 확인할 수 있습니다.

### 2. Node.js 및 NVM 설치

`Node Version Manager (NVM)`를 사용하여 Node.js를 관리합니다.

운영 체제에 따라 적절한 설치 방법을 선택하세요.

Node Version Manager (NVM)는 Node.js의 여러 버전을 설치하고 관리할 수 있게 해주는 유용한 도구입니다.

#### NVM (Node Version Manager) 설치

`NVM`을 설치하는 가장 안전하고 쉬운 방법은 공식 홈페이지를 통해 다운로드하는 것입니다. 다음 단계를 따라 NVM을 설치하세요
Window 사용자는 [Windows 사용자를 위한 참고 사항](#windows-사용자를-위한-참고-사항)을 확인해주세요

1. NVM 공식 GitHub 페이지 방문

   브라우저에서 <a href="https://github.com/nvm-sh/nvm/" target="_blank">NVM GitHub 페이지</a>를 엽니다.

2. 설치 지침 확인

   페이지의 "Installing and Updating" 섹션을 찾아 최신 설치 지침을 확인합니다.

3. 설치 스크립트 실행

   제공된 설치 명령어를 복사하여 터미널에 붙여넣고 실행합니다. 일반적으로 아래와 같은 형식의 명령어 예시를 볼 수
   있습니다.

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.x/install.sh | bash
   ```

   또는

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.x/install.sh | bash
   ```

   주의: 실제 명령어는 버전에 따라 다를 수 있으므로, 반드시 공식 페이지의 지침을 따르세요.

4. 설치 완료 후 환경 설정

   설치 스크립트가 안내하는 대로 환경 변수를 설정합니다. 보통 `.bashrc`, `.zshrc`, 또는 기타 셸 설정 파일에 관련 라인을
   추가해야 합니다.

5. 새 터미널 열기 또는 설정 다시 불러오기

   변경사항을 적용하기 위해 새 터미널 창을 열거나, 다음 명령어로 설정을 다시 불러옵니다

   ```bash
   source ~/.bashrc  # bash 사용 시
   ```

   또는

   ```bash
   source ~/.zshrc   # zsh 사용 시
   ```

6. 설치 확인: 다음 명령어로 NVM이 정상적으로 설치되었는지 확인합니다

   ```bash
   nvm --version
   ```

##### Windows 사용자를 위한 참고 사항

Windows 사용자는 <a href="https://github.com/coreybutler/nvm-windows" target="_blank">nvm-windows</a>를 사용해야 합니다.
이는 별도의 프로젝트이며, 설치 방법이 다를 수 있습니다. nvm-windows GitHub 페이지에서 최신 설치 지침을 확인하세요.

### 3. 설치 확인

1. Node.js 20.10.0 버전 설치:

   ```bash
   nvm install 20.10.0
   ```

2. 설치한 Node.js 버전 사용:

   ```bash
   nvm use 20.10.0
   ```

3. 설치 확인:
   ```bash
   node --version
   ```
4. npm도 확인
   ```bash
    npm --version
   ```

## 📖 프로젝트 세팅

### 1. yarn install 하여 의존성 패키지 다운로드(node_modules)

```bash
 yarn install
```

### 2. 🔐 VSCode 관리자 권한 설정 (Windows)

#### 1) PowerShell 실행 정책 변경

관리자 권한으로 PowerShell을 실행한 후 아래 명령어 입력

```bash
 Set-ExecutionPolicy RemoteSigned
```

#### 2) VSCode 관리자 권한 실행 설정

1. VSCode 바로가기 생성 (없는 경우)
2. 바로가기 우클릭 > 속성
3. 고급 클릭
4. "관리자 권한으로 실행" 체크
5. 확인 클릭

#### 3) VSCode 통합 터미널 설정

1. VSCode에서 Ctrl + Shift + P 입력 후 "기본 설정: 설정 열기(JSON)" 선택
2. 아래 설정 추가:

```json
{
  "terminal.integrated.profiles.windows": {
    "PowerShell Admin": {
      "path": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      "args": ["-NoExit", "-Command", "Start-Process PowerShell -Verb RunAs"],
      "icon": "terminal-powershell"
    }
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell Admin"
}
```

#### 4) 환경 변수 설정

1. Windows 검색에서 "시스템 환경 변수 편집" 검색하여 실행
2. "환경 변수" 클릭
3. "시스템 변수" 섹션에서 다음 확인/추가:

- Path에 아래 경로들이 있는지 확인

```bash
C:\Program Files\nodejs\
%AppData%\npm
%AppData%\Yarn\bin
```

- 없다면 "편집" > "새로 만들기"로 추가

4. 변경사항 적용을 위해 VSCode 재시작

## 🏃🏻‍♂️ 프로젝트 실행

`yarn dev`명령어 실행시 브라우저를 자동으로 열게 세팅돼있습니다.(scrips/dev.ts에 명령어 동작 정의)

```bash
 yarn dev
```

## 실행 시 주의사항

- 프로세스가 정상적으로 종료되지 않은 경우, 다음 실행 시 자동으로 정리됩니다.
- 기본적으로 Vite는 5173 포트, 로그 서버는3030 포트를 사용합니다.
- 비정상 종료 시 수동으로 프로세스 종료가 필요할 수 있습니다:

```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -f node
```
