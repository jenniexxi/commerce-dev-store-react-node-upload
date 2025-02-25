import { ReactNode } from 'react';

import { useOutletContext } from 'react-router-dom';

/**
 * 헤더 설정을 위한 인터페이스
 */
export type HeaderConfig = {
  showHeader?: boolean;
  showLeftButton?: boolean;
  showRightButton?: boolean;
  showTitle?: boolean;
  title?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  isStick?: boolean;
};

/**
 * Outlet 컨텍스트 인터페이스
 */
type OutletContext = {
  updateHeader: (config: HeaderConfig) => void;
};

/**
 * 타입이 지정된 Outlet 컨텍스트를 사용하기 위한 커스텀 훅
 */
export const useTypedOutletContext = () => useOutletContext<OutletContext>();
