import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import { throttle } from 'lodash';

import * as S from './VirtualScroll.style';

/**
 * VirtualScroll 컴포넌트의 속성을 정의하는 인터페이스
 * @template T - 데이터 항목의 타입
 */
type VirtualScrollProps<T> = {
  /** 렌더링할 데이터 배열 */
  data: T[];
  /** 각 아이템을 렌더링하는 함수 */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 미리 렌더링할 아이템 수 (기본값: 5) */
  overscan?: number;
  /** 추가 데이터를 로드하는 함수 */
  loadMore?: () => void;
  /** 추가 페이지 존재 여부 */
  hasNextPage?: boolean;
  /** 데이터 로딩 중 여부 */
  isLoading?: boolean;
  /** 페이지네이션 모드 사용 여부 (기본값: false) */
  paginationMode?: boolean;
  /** 로딩 중 상태를 표시할 커스텀 컴포넌트 */
  loadingComponent?: React.ReactNode;
  /** 데이터가 없을 때 표시할 커스텀 컴포넌트 */
  emptyComponent?: React.ReactNode;
  /** 로드 더 보기 트리거 임계값 (0-100) */
  loadMoreThreshold?: number;
};

/**
 * 가상 스크롤 기능을 제공하는 컴포넌트
 * @template T - 데이터 항목의 타입
 * @param {VirtualScrollProps<T>} props - 컴포넌트 속성
 * @returns {React.ReactElement} 가상 스크롤 컴포넌트
 */
export const VirtualScroll = <T,>({
  data,
  renderItem,
  overscan = 5,
  loadMore,
  hasNextPage,
  isLoading,
  paginationMode = false,
  loadingComponent,
  emptyComponent,
  loadMoreThreshold = 80,
}: VirtualScrollProps<T>): React.ReactElement => {
  // 스크롤 컨테이너 ref
  const parentRef = useRef<HTMLDivElement>(null);
  // 이전 스크롤 위치 저장
  const prevScrollTopRef = useRef(0);
  // 추가 데이터 로드 여부
  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  // useVirtualizer 훅 사용하여 가상화 설정
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 50, []),
    overscan,
  });

  // 스크롤 이벤트 핸들러
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (!parentRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

        // 스크롤 방향 확인(아래로 스크롤했을 때 true 반환)
        const isScrollingDown = scrollTop > prevScrollTopRef.current;

        prevScrollTopRef.current = scrollTop;

        const shouldLoad =
          isScrollingDown && scrollPercentage >= loadMoreThreshold && hasNextPage === true && isLoading !== true;

        setShouldLoadMore(shouldLoad);
      }, 200),
    [loadMoreThreshold, hasNextPage, isLoading],
  );

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    //이벤트 리스너 등록
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (shouldLoadMore && loadMore) {
      console.log('로드중...');
      loadMore();
    }
  }, [shouldLoadMore, loadMore]);

  // renderItem 함수 메모이제이션 (불필요한 리렌더링 방지)
  const memoizedRenderItem = useCallback(renderItem, [renderItem]);

  return (
    <S.VirtualContainer ref={parentRef}>
      <S.VirtualizerWrapper style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];
          return (
            <S.ItemContainer
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {memoizedRenderItem(item, virtualRow.index)}
            </S.ItemContainer>
          );
        })}
      </S.VirtualizerWrapper>
      {paginationMode && hasNextPage && isLoading && loadingComponent}
      {paginationMode && !hasNextPage && emptyComponent}
    </S.VirtualContainer>
  );
};

export default VirtualScroll;
