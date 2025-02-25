import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useInfiniteQuery } from '@tanstack/react-query';
import { MYPAGE_CLAIM_SORT_CODES } from '@type';
import dayjs from 'dayjs';

import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import claimApi, { ClaimListContent } from '@apis/claimApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './ClaimHistory.style';
import ClaimHistorySectionItem from './features/ClaimHistorySectionItem';
import Filter from './features/Filter';

const ClaimHistory = () => {
  useHeader('취소/교환/반품 조회');
  const key = useLocation()?.state?.key ?? MYPAGE_CLAIM_SORT_CODES.ALL_CLAIM;

  const [searchParams, setSearchParams] = useState({
    page: 0,
    size: 10,
    mypageItemStatusEnum: key, // 기본값
    startDate: dayjs().add(-1, 'years').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    goodsName: '',
  });

  const { isLoading, data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['ClaimHistoryList', searchParams],
    queryFn: ({ pageParam }) =>
      claimApi.getClaimList({
        ...searchParams,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last || allPages.length >= lastPage.data.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const handleChange = (name: string, value: string) => {
    if (name === 'startDate' || name === 'endDate') {
      const newDates = {
        ...searchParams,
        [name]: value,
      };

      // startDate와 endDate 모두 있을 때만 검사
      if (newDates.startDate && newDates.endDate) {
        const start = dayjs(newDates.startDate);
        const end = dayjs(newDates.endDate);

        const oneYearFromStart = start.add(1, 'year');

        if (start.isAfter(end)) {
          showModal.text('종료일은 시작일보다 이전일 수 없습니다.');
          return;
        }

        if (name === 'startDate' && end.isAfter(oneYearFromStart)) {
          // 시작일 선택 시 종료일이 1년 이상 차이나는 경우
          showModal.text('최대 조회기간은 1년입니다.');
          return;
        }

        setSearchParams(newDates);
      }
    }

    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <S.Container>
      {data?.pages.map((page, pageIndex) => {
        if (page.data.totalElements === 0) {
          <S.ContsNoWrap>
            <SvgIcon
              name={R.svg.icoExclamationCircleFill}
              width={64}
              height={64}
              tintColor={colors.status_disabled}
            />
            <S.NoDataText>취소/교환/반품한 내역이 없습니다.</S.NoDataText>
          </S.ContsNoWrap>;
        } else {
          return (
            <>
              <Filter
                searchParam={searchParams}
                onChange={handleChange}
              />
              <React.Fragment key={pageIndex}>
                {page?.data.content?.map((item: ClaimListContent, itemIndex: number) => (
                  <ClaimHistorySectionItem
                    key={item.orderClaimIdEncrypt}
                    content={item}
                    updateList={refetch}
                    ref={
                      pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1
                        ? lastElementRef
                        : null
                    }
                  />
                ))}
              </React.Fragment>
            </>
          );
        }
      })}
    </S.Container>
  );
};

export default ClaimHistory;
