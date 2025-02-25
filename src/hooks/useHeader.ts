import { useEffect, useRef } from 'react';

import { useHeaderStore } from '@stores/useHeaderStore';

export interface HeaderConfig {
  leftCallback?: () => void;
  rightCallback?: () => void;
  isTransparent?: boolean;
  isHidden?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  showRightButton?: boolean;
  showLeftButton?: boolean;
  showTitle?: boolean;
  showHeader?: boolean;
  showBottomBorder?: boolean;
  backColor?: string;
}

/**
 * 헤더 설정을 관리하는 커스텀 훅
 * @param {string} title - 헤더 제목
 * @param {Partial<HeaderConfig>} config - 추가 헤더 설정
 *
 * @example
 * // 기본 사용법
 * useHeader('페이지 제목');
 *
 * @example
 * // 추가 설정과 함께 사용
 * useHeader('커스텀 헤더', {
 *   showLeftButton: false,
 *   showRightButton: true,
 *   rightElement: <CustomButton />,
 *   onRightClick: () => console.log('오른쪽 버튼 클릭')
 * });
 *
 * @example
 * // 헤더 숨기기
 * useHeader('', { showHeader: false });
 */

export const useHeader = (title: string, config: Partial<HeaderConfig> = {}) => {
  const updateHeader = useHeaderStore((state) => state.updateHeader);
  const mountedRef = useRef(false);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 설정이 변경될 때마다 헤더 업데이트
    updateHeader({
      title,
      showHeader: true,
      showTitle: true,
      showLeftButton: true,
      showRightButton: false,
      showBottomBorder: false,
      onLeftClick: config.leftCallback,
      onRightClick: config.rightCallback,
      ...config,
    });

    // 마운트 여부 체크
    if (!mountedRef.current) {
      mountedRef.current = true;
    }

    // cleanup: 컴포넌트가 언마운트될 때 헤더 초기화
    return () => {
      updateHeader({
        title: '',
        showHeader: false,
        showTitle: false,
        showLeftButton: false,
        showRightButton: false,
      });
    };
  }, [title, config, updateHeader]);

  // 마운트 여부 반환 (필요한 경우 사용)
  return mountedRef.current;
};
