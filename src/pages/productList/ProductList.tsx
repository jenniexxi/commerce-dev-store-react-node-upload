import React, { useCallback, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@components';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useAuthStore } from '@stores/useAuthStore';

import { useHeader } from '@hooks/useHeader';

import { PAGE_ROUTES, PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import DisplayAPI, { SalesListData } from '@apis/DisplayApi';

import * as S from './ProductList.style';
import { TOKEN } from './const';

const PAGE_LIMIT = 20;

export const ProductList = () => {
  // const [type, setType] = useState<DisplayGoodsSortTypeCode>(DISPLAY_GOODS_SORT_TYPE.BEST);
  // const type = DISPLAY_BEST_GOODS_TYPE.MONTH;

  const navigate = useNavigate();
  useHeader('', {
    showHeader: false,
  });
  const { setToken } = useAuthStore();

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<SalesListData>({
  //   queryKey: ['produceList', type],
  //   queryFn: ({ pageParam }) => DisplayAPI.getSalesList(pageParam as number, PAGE_LIMIT, type),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (lastPage.last || allPages.length >= lastPage.totalPages) {
  //       return undefined;
  //     }
  //     return allPages.length;
  //   },
  // });

  // const observer = useRef<IntersectionObserver>();
  // const lastElementRef = useCallback(
  //   (node: HTMLLIElement | null) => {
  //     if (isFetchingNextPage) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isFetchingNextPage, hasNextPage, fetchNextPage],
  // );

  // 장바구니 이동버튼 추가
  const gotoCart = () => {
    navigate(PAGE_WITHOUT_FOOTER_ROUTES.SHOPPINGCART.path);
  };
  const gotoMyPage = () => {
    navigate(PAGE_ROUTES.MYPAGE.path);
  };
  const gotoSearch = () => {
    navigate(PAGE_ROUTES.SEARCH.path);
  };

  const changeToken = (index: number) => {
    setToken(TOKEN[index]);
  };

  const tempStyle = {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    margin: 10,
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={tempStyle}
          onClick={gotoCart}
        >
          장바구니
        </div>
        <div
          style={tempStyle}
          onClick={gotoMyPage}
        >
          마이페이지
        </div>

        <div
          style={tempStyle}
          onClick={gotoSearch}
        >
          검색
        </div>
      </div>

      <S.ProdListContainer>
        <Button
          title='1번유저'
          onClick={() => {
            changeToken(0);
          }}
        />
        <Button
          title='2번유저'
          onClick={() => {
            changeToken(1);
          }}
        />
        <Button
          title='3번유저'
          onClick={() => {
            changeToken(2);
          }}
        />
        <Button
          title='4번유저'
          onClick={() => {
            changeToken(3);
          }}
        />
        <Button
          title='5번유저'
          onClick={() => {
            changeToken(4);
          }}
        />
        {/* {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((item, itemIndex) => (
              <S.ProdListItem
                key={item.goodsId}
                ref={
                  pageIndex === data.pages.length - 1 && itemIndex === page.content.length - 1 ? lastElementRef : null
                }
              >
                <S.ProdListItemLink to={`/productdetail/${item.goodsId}`} />
                <S.ProdListThumbBox>
                  <S.ProdListThumb
                    src={item.imageFilesUrl}
                    alt={item.displayGoodsName}
                  />
                </S.ProdListThumbBox>
                <S.ProdListInfoName>
                  <S.ProdListBradnName>{item.goodsId}</S.ProdListBradnName>
                  <S.ProdListBradnName>{item.brandName}</S.ProdListBradnName>
                  <S.ProdListDisplayName>{item.displayGoodsName}</S.ProdListDisplayName>
                </S.ProdListInfoName>
                <S.ProdListInfoPrice>
                  <S.ProdListSaleRate>{item.saleRate}</S.ProdListSaleRate>
                  <S.ProdListPaymentPrice>
                    {item.paymentPrice.number}
                    {item.paymentPrice.currencyCode}
                  </S.ProdListPaymentPrice>
                  <S.ProdListRecommendPrice>
                    {item.recommendPrice.number}
                    {item.recommendPrice.currencyCode}
                  </S.ProdListRecommendPrice>
                </S.ProdListInfoPrice>
              </S.ProdListItem>
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>} */}
      </S.ProdListContainer>
    </>
  );
};

export default ProductList;
