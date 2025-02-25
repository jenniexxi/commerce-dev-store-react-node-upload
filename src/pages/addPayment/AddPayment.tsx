import React, { useCallback, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
import { useInfiniteQuery } from '@tanstack/react-query';

import R from '@utils/resourceMapper';

import claimApi, { AddPaymentItem } from '@apis/claimApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './AddPayment.style';
import AddPaymentItemView from './features/AddPaymentItemView';

type Props = {};
const AddPayment = () => {
  const navigate = useNavigate();

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['AddPaymentList'],
    queryFn: ({ pageParam }) =>
      claimApi.getAddPaymentList({
        page: pageParam,
        size: 10,
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
    (node: HTMLLIElement | null) => {
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

  return (
    <S.Container>
      <S.Header>
        <S.BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <SvgIcon name={R.svg.icoChevronLeft} />
        </S.BackButton>
        <T.Headline1B>추가결제 예정 조회</T.Headline1B>
      </S.Header>
      <S.ListView>
        {data?.pages.map((page, pageIndex) => {
          if (page.data.totalElements === 0) {
            return <>추가 결제 예정 내역이 없습니다.</>;
          } else {
            return (
              <React.Fragment key={pageIndex}>
                {page?.data.content?.map((item: AddPaymentItem, itemIndex: number) => (
                  <AddPaymentItemView
                    key={item.orderClaimIdEncrypt}
                    content={item}
                    ref={
                      pageIndex === data.pages?.length - 1 && itemIndex === page.data.content.length - 1
                        ? lastElementRef
                        : null
                    }
                  />
                ))}
              </React.Fragment>
            );
          }
        })}
      </S.ListView>
    </S.Container>
  );
};

export default AddPayment;
