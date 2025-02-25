export const setupDevLogger = () => {
  const originalConsoleLog = console.log;
  const logQueue: Array<() => void> = [];
  let isProcessing = false;

  const processLogQueue = () => {
    if (isProcessing || logQueue.length === 0) return;

    isProcessing = true;
    const logFn = logQueue.shift();
    logFn?.();

    setTimeout(() => {
      isProcessing = false;
      processLogQueue();
    }, 0);
  };

  console.log = function (...args: any[]) {
    logQueue.push(() => {
      // 모든 로그를 한 줄로 처리
      const processedArgs = args.map((arg) => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg); // 한 줄로 직렬화
          } catch {
            return arg;
          }
        }
        if (typeof arg === 'string' && arg.includes('\x1b[')) {
          return arg;
        }
        if (typeof arg === 'string') {
          return `\x1b[36m${arg}\x1b[0m`;
        }
        return arg;
      });

      // 브라우저 콘솔에도 직렬화된 버전 출력
      processedArgs.forEach((arg) => {
        originalConsoleLog(arg);
      });

      // 서버로 직렬화된 버전 전송
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3030/__console_log', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ args: processedArgs }));
    });

    processLogQueue();
  };

  // 경고 로그
  const originalWarn = console.warn;
  console.warn = function (...args) {
    logQueue.push(() => {
      const processedArgs = args.map((arg) => (typeof arg === 'object' && arg !== null ? JSON.stringify(arg) : arg));

      // 브라우저 콘솔에도 직렬화된 버전 출력
      processedArgs.forEach((arg) => {
        originalWarn(arg);
      });

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3030/__console_warn', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ args: processedArgs }));
    });

    processLogQueue();
  };

  // 에러 로그
  const originalError = console.error;
  console.error = function (...args) {
    logQueue.push(() => {
      const processedArgs = args.map((arg) => (typeof arg === 'object' && arg !== null ? JSON.stringify(arg) : arg));

      originalError('\x1b[91m❌\x1b[0m', ...processedArgs);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3030/__console_error', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(
        JSON.stringify({
          error: {
            message: processedArgs.join(' '),
            stack: args.find((arg) => arg instanceof Error)?.stack,
          },
        }),
      );
    });

    processLogQueue();
  };

  // 글로벌 에러 핸들러
  window.onerror = function (message, source, lineno, colno, error) {
    console.error({ message, source, lineno, colno, stack: error?.stack });
  };

  // React 에러 바운더리
  window.addEventListener('unhandledrejection', function (event) {
    console.error(event.reason);
  });
};
