import React, { useCallback, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useInfiniteQuery } from '@tanstack/react-query';
import { MYPAGE_SORT_CODES } from '@type';
import dayjs from 'dayjs';

import { useHeader } from '@hooks/useHeader';

import { PAGE_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import orderApi, { OrderHistoryContent } from '@apis/orderApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './OrderHistory.style';
import Filter from './features/Filter';
import OrderHistorySectionGoods from './features/OrderHistorySectionGoods';

const OrderHistory = () => {
  useHeader('주문조회');
  const key = useLocation()?.state?.key ?? MYPAGE_SORT_CODES.ALL_ORDER;

  const [searchParams, setSearchParams] = useState({
    size: '10',
    mypageItemStatusEnum: key, // 기본값
    startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    goodsName: '',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['OrderHistoryList', searchParams],
    queryFn: ({ pageParam }) =>
      orderApi.getOrderList({
        page: pageParam.toString(),
        ...searchParams,
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
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setSearchParams({
      size: '10',
      mypageItemStatusEnum: MYPAGE_SORT_CODES.ALL_ORDER,
      startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      goodsName: '',
    });
  };

  return (
    <S.Container>
      <Filter
        searchParam={searchParams}
        onChange={handleChange}
        handleReset={handleReset}
      />
      {data?.pages.map((page, pageIndex) => {
        return (
          <React.Fragment key={pageIndex}>
            {page?.data.content.length > 0 ? (
              page?.data.content?.map((content: OrderHistoryContent, itemIndex: number) => (
                <S.OrderHistorySectionContainer
                  key={content.ordersIdEncrypt}
                  ref={
                    pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1
                      ? lastElementRef
                      : null
                  }
                >
                  <S.OrderHistorySectionHeader
                    to={PAGE_ROUTES.MYPAGE_ORDER_HISTORY_DETAIL.path}
                    state={{ key: content.ordersIdEncrypt }}
                  >
                    <div>
                      <S.OrderDate>{dayjs(content.orderDate).format('YYYY.MM.DD')}</S.OrderDate>
                      <S.OrderNumber>{content.orderNumber}</S.OrderNumber>
                    </div>
                    <SvgIcon
                      name={R.svg.icoChevronRight}
                      width={20}
                      height={20}
                    />
                  </S.OrderHistorySectionHeader>
                  {content.shippingList.map((item) => (
                    <OrderHistorySectionGoods
                      key={item.orderShippingPriceIdEncrypt}
                      shippingList={item}
                    />
                  ))}
                </S.OrderHistorySectionContainer>
              ))
            ) : (
              <S.EmptyDataWrap>
                <SvgIcon
                  name={R.svg.icoExclamationCircleFill}
                  width={64}
                  height={64}
                  tintColor={colors.status_disabled}
                />
                <p>주문한 내역이 없습니다.</p>
              </S.EmptyDataWrap>
            )}
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};

export default OrderHistory;
