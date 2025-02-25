import React from 'react';

import ReactDOM from 'react-dom/client';

import { setupDevLogger } from '@utils/logger';

import App from './App.tsx';

const isDev = import.meta.env.VITE_COMMERCE_API_BASE_URL.includes('-dev.');

// 개발 환경에서만 글로벌 에러 핸들러 등록
if (isDev) {
  setupDevLogger();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
