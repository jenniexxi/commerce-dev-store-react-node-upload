import React, { useCallback, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import IconButton from '@components/button/IconButton';
import CountBadge from '@components/count/CountBadge';

import { useHeader } from '@hooks/useHeader';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import GoodsQnasAPI from '@apis/goodsQnasApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './ProductInquiry.style';
import Filter, { SearchParamsQuery } from './features/Filter';
import InquiryItem from './features/InquiryItem';

const ProductInquiryCheck = () => {
  const navigate = useNavigate();

  useHeader('상품 문의', {
    showHeader: true,
    showRightButton: true,
    rightElement: (
      <>
        <IconButton
          onClick={() => {}}
          img={R.svg.icoSearch}
        />
        <div
          onClick={() => {
            navigate(PAGE_WITHOUT_FOOTER_ROUTES.SHOPPINGCART.path);
          }}
        >
          <IconButton img={R.svg.icoShoppingbag} />
          <CountBadge count={99} />
        </div>
      </>
    ),
  });

  const [searchParams, setSearchParams] = useState<SearchParamsQuery>({
    page: 0,
    size: 10,
    bbsTypeId: undefined,
    startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    inquiryStatus: 'ALL',
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['goodsInquiryMe', searchParams],
    queryFn: ({ pageParam }) => {
      return GoodsQnasAPI.getGoodsQnasMeInquiry({
        page: pageParam,
        size: searchParams.size,
        bbsTypeId: searchParams.bbsTypeId,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        answerHoldYn:
          searchParams.inquiryStatus === 'ALL' ? undefined : searchParams.inquiryStatus === 'READY' ? true : false,
        answerDoneYn:
          searchParams.inquiryStatus === 'ALL' ? undefined : searchParams.inquiryStatus === 'DONE' ? true : false,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
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

  const pages = data?.pages || [];

  console.log(pages);

  const handleChange = (name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Filter
        searchParam={searchParams}
        onChange={handleChange}
      />
      {pages.map((pageData, pageIndex) => {
        return (
          <React.Fragment key={pageIndex}>
            {pageData?.data.content.length > 0 ? (
              pageData?.data.content?.map((item, itemIndex) => {
                const isLastItem = pageIndex === pages.length - 1 && itemIndex === pageData.data.content.length - 1;
                return (
                  <S.InquiryItemWrap
                    key={item.goodsQnaIdEncrypt}
                    ref={isLastItem ? lastItemRef : null}
                  >
                    <InquiryItem
                      item={item}
                      refetch={refetch}
                    />
                  </S.InquiryItemWrap>
                );
              })
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
    </>
  );
};

export default ProductInquiryCheck;
