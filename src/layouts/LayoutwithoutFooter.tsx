import { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@components';

import { useHeaderStore } from '@stores/useHeaderStore';

import * as S from './Layout.style';

/**
 * 레이아웃 컴포넌트
 * 헤더, 본문 콘텐츠, 푸터를 포함하는 전체 레이아웃 관리
 * 헤더 설정의 상태 관리 및 페이지 간 이동 시 헤더 설정 초기화 처리
 * @returns {JSX.Element} 레이아웃 컴포넌트
 */

// Layout.tsx
const LayoutwithoutFooter = () => {
  const headerConfig = useHeaderStore((state) => state.headerConfig);
  const resetHeader = useHeaderStore((state) => state.resetHeader);
  const location = useLocation();

  // 페이지 변경 시 헤더 초기화
  useEffect(() => {
    resetHeader();
  }, [location.pathname, resetHeader]);

  return (
    <S.LayoutView>
      <Header {...headerConfig} />
      <Outlet />
    </S.LayoutView>
  );
};

export default LayoutwithoutFooter;
