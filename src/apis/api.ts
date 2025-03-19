import { Cookies } from 'react-cookie';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAuthStore } from '@stores/useAuthStore';

export type APIResponse = {
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
};

const cookies = new Cookies();

export const cookieManager = {
  getAuthToken: () => cookies.get(import.meta.env.VITE_AUTH_TOKEN_KEY),
  setAuthToken: (token: string) => cookies.set(import.meta.env.VITE_AUTH_TOKEN_KEY, token),
  removeAuthToken: () => cookies.remove(import.meta.env.VITE_AUTH_TOKEN_KEY),
  getSessionID: () => cookies.get(import.meta.env.VITE_SESSION_ID_KEY),
  setSessionID: (token: string) => cookies.set(import.meta.env.VITE_SESSION_ID_KEY, token),
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COMMERCE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const logRequest = (config: AxiosRequestConfig) => {
  const baseUrl = import.meta.env.VITE_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  console.log(
    [
      '\x1b[36m[요청]\x1b[0m',
      (config.method?.toUpperCase() === 'GET'
        ? '\x1b[92m'
        : config.method?.toUpperCase() === 'POST'
          ? '\x1b[33m'
          : config.method?.toUpperCase() === 'PUT'
            ? '\x1b[95m'
            : '\x1b[97m') +
        config.method?.toUpperCase() +
        '\x1b[0m',
      '\x1b[90m' + baseUrl + '\x1b[0m' + '\x1b[97m' + pathUrl + '\x1b[0m',
    ].join(''),
  );
};

const logResponse = (response: AxiosResponse | undefined) => {
  if (!response) {
    console.log('\x1b[91m❌\x1b[0m\x1b[32m[응답]\x1b[0m 에러 발생(no response)');
    return;
  }

  const { status, statusText, config, data } = response;
  const statusDisplay = statusText ? `(${status}:${statusText})` : `(${status})`;
  const baseUrl = import.meta.env.VITE_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  if (pathUrl.includes('systems/logins/force-auth')) {
    return;
  }

  const errorPrefix = status >= 400 ? '\x1b[91m❌\x1b[0m' : '';

  // API 정보와 상태 표시를 먼저 조합
  const apiInfo = [
    errorPrefix,
    '\x1b[94m[응답]\x1b[0m',
    (config.method?.toUpperCase() === 'GET'
      ? '\x1b[92m'
      : config.method?.toUpperCase() === 'POST'
        ? '\x1b[33m'
        : config.method?.toUpperCase() === 'PUT'
          ? '\x1b[95m'
          : '\x1b[97m') +
      config.method?.toUpperCase() +
      '\x1b[0m',
    '\x1b[90m' +
      baseUrl +
      '\x1b[0m' +
      '\x1b[97m' +
      pathUrl +
      '\x1b[0m' +
      (status >= 200 && status < 300 ? '\x1b[32m' : '\x1b[33m') +
      statusDisplay +
      '\x1b[0m',
  ]
    .join('')
    .replace(/\s+/g, '')
    .trim();

  // 데이터를 포함한 전체 메시지 조합
  const logMessage = apiInfo + ' ' + (data ? JSON.stringify(data) : '');

  console.log(logMessage);
};

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  // logRequest(config);

  const token = cookieManager.getAuthToken();
  const session = cookieManager.getSessionID();
  if (token) {
    // config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (session) {
    config.headers['SESSION'] = session;
  }
  // 회원
  config.headers['Authorization'] = `Bearer ${useAuthStore.getState().token}`;

  // config.headers['Authorization'] = `Basic cnJvdW5kY2xpZW50Mjpycm91bmRjbGllbnQyc2VjcmV0==`;
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // logResponse(response);
    return response;
  },
  (error) => {
    logResponse(error.response);
    return Promise.reject(error);
  },
);

export const fetchData = <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  switch (method) {
    case 'get':
      return axiosInstance.get<T>(url, config).then((resp) => resp.data);
    case 'post':
      return axiosInstance.post<T>(url, data, config).then((resp) => resp.data);
    case 'put':
      return axiosInstance.put<T>(url, data, config).then((resp) => resp.data);
    case 'delete':
      return axiosInstance.delete<T>(url, config).then((resp) => resp.data);
    default:
      throw new Error('Invalid HTTP method');
  }
};
