import { useEffect, useRef } from 'react';

import { SwiperCarousel } from '@components';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

import ProdItemList from '@components/prodItemList/ProdItemList';

import { FavoriteGoods } from '@apis/favoritesApi';
import { GoodsInfo } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;
  recommended?: GoodsInfo[];
  favoriteGoodsList: FavoriteGoods['content'];
};

const ProductRecommended = ({ recommended, goodsId, favoriteGoodsList }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const items =
    recommended?.map((item, index) => {
      const favoriteItem = favoriteGoodsList.find((fav) => String(fav.goodsInfo.goodsId) === String(item.goodsId));

      return {
        index,
        goodsId: item.goodsId,
        imageFilesUrl: item.imageFilesUrl,
        brandName: item.brandName,
        displayGoodsName: item.displayGoodsName,
        discount: item.saleRate,
        price: item.paymentPrice.number,
        score: item.feedbackTotalScore,
        reviewCount: item.feedbackTotal,
        isFavorite: !!favoriteItem,
        favoriteGoodsIdEncrypt: favoriteItem?.favoriteGoodsIdEncrypt ?? '',
      };
    }) ?? [];

  // 6개씩 나누기
  const chunkedItems = Array.from({ length: Math.ceil(items.length / 6) }, (_, i) => items.slice(i * 6, i * 6 + 6));

  useEffect(() => {
    if (!swiperRef.current || !paginationRef.current) return;

    const swiper = swiperRef.current;

    const updatePagination = () => {
      if (!paginationRef.current) return;
      const current = swiper.realIndex + 1;
      const total = chunkedItems.length;
      paginationRef.current.innerHTML = `<span class="current">${current}</span><span class="total">${total}</span>`;
    };

    swiper.on('slideChange', updatePagination);
    updatePagination();

    return () => {
      swiper.off('slideChange', updatePagination);
    };
  }, [chunkedItems, swiperRef.current]);

  return (
    <S.PordRecommend>
      <S.SecTitle className='secTitle'>
        <strong>같이 둘러볼만한</strong>
        <br />
        다양한 스토어 상품 추천드려요
      </S.SecTitle>
      {items.length > 0 ? (
        <S.PordItemSwiperContainer>
          <SwiperCarousel
            slidesPerView={1}
            isPagination={false}
            modules={[Navigation]}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {chunkedItems.map((chunk, pageIndex) => (
              <S.PordItemSlide key={pageIndex}>
                <ProdItemList
                  items={chunk}
                  columnType='col03'
                />
              </S.PordItemSlide>
            ))}
          </SwiperCarousel>
          <S.PordItemControlsWrapper>
            <button
              ref={prevButtonRef}
              className='btnPrev'
            ></button>
            <div
              className='pagination'
              ref={paginationRef}
            ></div>
            <button
              ref={nextButtonRef}
              className='btnNext'
            ></button>
          </S.PordItemControlsWrapper>
        </S.PordItemSwiperContainer>
      ) : (
        <S.EmptyMessage>추천 상품이 없습니다.</S.EmptyMessage>
      )}
    </S.PordRecommend>
  );
};

export default ProductRecommended;
