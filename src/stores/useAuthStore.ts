import { useCookies } from 'react-cookie';

import { create } from 'zustand';

// 쿠키 이름과 옵션 상수
const AUTH_COOKIE_NAME = 'auth_token';
const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 31536000, // 1년 (초 단위)
  sameSite: 'strict' as const,
  // secure: process.env.NODE_ENV === 'production', // 프로덕션에서만 secure 설정
};

// 기본 토큰 값 (기존 코드와 동일하게 유지)
// const DEFAULT_TOKEN =
//   'eyJraWQiOiJFMDQ3NTA0Q0Y5NUYwNzI0QUU1ODc3QTk0NjRFRjBCMSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzFhMWI1Ny02NmEyLTRmNjItYjJmZi01ZDFjNjJkMjY5MGIiLCJpc3MiOiJodHRwOi8vMTAuMjEzLjMxLjI0ODo5MDkzL2FjY291bnQvYXV0aHNlcnZlciIsImFkdWx0WW4iOnRydWUsInVzZXJTZXEiOjExNywiYXV0aG9yaXRpZXMiOlsiUkVTT1VSQ0UiLCJVU0VSIl0sInBsYXRmb3JtcyI6W3siY2QiOiIwMTBDQVIiLCJzZXEiOiIifSx7ImNkIjoiMDEwQ09NTUVSQ0UiLCJzZXEiOjU4fSx7ImNkIjoiMDEwUEFZIiwic2VxIjoxMTd9LHsiY2QiOiIwMTBXQUxLIiwic2VxIjo3NDQ5fV0sImF1ZCI6InJyb3VuZGNsaWVudDEiLCJuYmYiOjE3NDA2MTQzNTAsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJybGV2ZWwiOiIwMSIsImV4cCI6MTc3MjE1MDM1MCwibWVtYmVyU2hpcFR5cGUiOiJNRU1CRVIiLCJpYXQiOjE3NDA2MTQzNTAsImp0aSI6IjI3OTI5ZjhmLTFlYWMtNGRlNi04ZTFkLThhODIwYzkxNjllZSIsImF1dGhEZXZpY2VTZXEiOjEwM30.TEiwbyUe02ijzW0k5-QeN1BCufuZYYK5PvRcObDc0LCThDAELoAIhyTIwqcn7xSPIWxfmLlyW0TQBa0tUj6lv4hHGMGlslToQwtPBAuwP1o-wLIdG7Sf_BnMvE19rhZJEH9T9B1kn6c0igs0RRJA2PmbpoKnmOA8NhDgm2cd_PQkXJKzbNvbRnOOZ5LtsGiL_pNWQ7Ku7m73bG0EWTth7UX8F_A24ybQJ03WjD-PtBCpYKV4AmQmF5eA0q2sD7zhw0UC59oipalAqN18j_kn7O_qKR09Stm7C4ZpFxgOliEUofoH8au_EYbXiZa7ynfZyq5QLYosrCwJcLJDjQEG0A';

const DEFAULT_TOKEN =
  'eyJraWQiOiJFMDQ3NTA0Q0Y5NUYwNzI0QUU1ODc3QTk0NjRFRjBCMSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzFhMWI1Ny02NmEyLTRmNjItYjJmZi01ZDFjNjJkMjY5MGIiLCJpc3MiOiJodHRwOi8vMTAuMjEzLjMxLjI0ODo5MDkzL2FjY291bnQvYXV0aHNlcnZlciIsImFkdWx0WW4iOnRydWUsInVzZXJTZXEiOjExNywiYXV0aG9yaXRpZXMiOlsiUkVTT1VSQ0UiLCJVU0VSIl0sInBsYXRmb3JtcyI6W3siY2QiOiIwMTBDQVIiLCJzZXEiOiIifSx7ImNkIjoiMDEwQ09NTUVSQ0UiLCJzZXEiOjU4fSx7ImNkIjoiMDEwUEFZIiwic2VxIjoxMTd9LHsiY2QiOiIwMTBXQUxLIiwic2VxIjo3NDQ5fV0sImF1ZCI6InJyb3VuZGNsaWVudDEiLCJuYmYiOjE3NDA2MTQzNTAsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJybGV2ZWwiOiIwMSIsImV4cCI6MTc3MjE1MDM1MCwibWVtYmVyU2hpcFR5cGUiOiJNRU1CRVIiLCJpYXQiOjE3NDA2MTQzNTAsImp0aSI6IjI3OTI5ZjhmLTFlYWMtNGRlNi04ZTFkLThhODIwYzkxNjllZSIsImF1dGhEZXZpY2VTZXEiOjEwM30.TEiwbyUe02ijzW0k5-QeN1BCufuZYYK5PvRcObDc0LCThDAELoAIhyTIwqcn7xSPIWxfmLlyW0TQBa0tUj6lv4hHGMGlslToQwtPBAuwP1o-wLIdG7Sf_BnMvE19rhZJEH9T9B1kn6c0igs0RRJA2PmbpoKnmOA8NhDgm2cd_PQkXJKzbNvbRnOOZ5LtsGiL_pNWQ7Ku7m73bG0EWTth7UX8F_A24ybQJ03WjD-PtBCpYKV4AmQmF5eA0q2sD7zhw0UC59oipalAqN18j_kn7O_qKR09Stm7C4ZpFxgOliEUofoH8au_EYbXiZa7ynfZyq5QLYosrCwJcLJDjQEG0A';
// 기존 AuthStore 타입과 확장된 기능
type AuthStore = {
  token: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
};

// 쿠키 관련 후크
export const useAuthCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE_NAME]);

  const setTokenCookie = (token: string) => {
    setCookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
  };

  const removeTokenCookie = () => {
    removeCookie(AUTH_COOKIE_NAME, { path: '/' });
  };

  const getTokenFromCookie = () => {
    return cookies[AUTH_COOKIE_NAME] || '';
  };

  return {
    setTokenCookie,
    removeTokenCookie,
    getTokenFromCookie,
  };
};

// Zustand 스토어 생성
export const useAuthStore = create<AuthStore>((set) => {
  // 쿠키에서 초기 토큰 값 가져오기 시도
  let initialToken = '';

  // 브라우저 환경에서만 실행되도록 (SSR 문제 방지)
  if (typeof window !== 'undefined') {
    try {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`));
      if (authCookie) {
        initialToken = authCookie.split('=')[1].trim();
      }
    } catch (error) {
      console.error('Failed to get token from cookie:', error);
    }
  }

  // 초기 상태 설정
  return {
    token: initialToken || DEFAULT_TOKEN,
    // token: DEFAULT_TOKEN,
    isAuthenticated: !!initialToken,
    setToken: (token: string) => set({ token, isAuthenticated: !!token }),
    clearToken: () => set({ token: '', isAuthenticated: false }),
  };
});

// 편리한 사용을 위한 후크
export const useAuth = () => {
  const { token, isAuthenticated, setToken, clearToken } = useAuthStore();
  const { setTokenCookie, removeTokenCookie } = useAuthCookies();

  // 로그인: 스토어와 쿠키에 모두 토큰 설정
  const login = (newToken: string) => {
    setToken(newToken);
    setTokenCookie(newToken);
  };

  // 로그아웃: 스토어와 쿠키에서 모두 토큰 제거
  const logout = () => {
    clearToken();
    removeTokenCookie();
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
};
