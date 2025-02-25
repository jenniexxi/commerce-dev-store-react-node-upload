import { useEffect, useRef, useState } from 'react';

import { SwiperCarousel } from '@components';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';

import IconButton from '@components/button/IconButton';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import { DetailsContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
};

const ProductBanner = ({ goodsInfo }: Props) => {
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const handleAutoPlay = () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }

    // 🔹 Swiper의 실제 autoplay 상태를 가져와서 업데이트
    setTimeout(() => {
      setIsAutoPlay(swiper.autoplay.running);
    }, 0);
  };

  const updatePagination = (swiper: SwiperType) => {
    if (!paginationRef.current) return;

    const current = swiper.realIndex + 1;
    const total = swiper.slides.length;

    paginationRef.current.innerHTML = `<span class="current">${current}</span><span class="total">${total}</span>`;
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    swiper.on('slideChange', () => updatePagination(swiper));

    return () => {
      swiper.off('slideChange', () => updatePagination(swiper));
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      setIsAutoPlay(swiperRef.current.autoplay.running);
    }
  }, [swiperRef.current]);

  const bannerImages = goodsInfo?.exhibitionList?.map((item) => item.listImageUrl) || [];

  if (bannerImages.length === 0) return null;

  return (
    <S.ProdListInfoViewNoSpace>
      <S.BannerSwiperContainer $withInfluencer={false}>
        <SwiperCarousel
          slidesPerView={1}
          isPagination={false}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={500}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updatePagination(swiper);
            setIsAutoPlay(swiper.autoplay.running);
          }}
        >
          {bannerImages.map((url, index) => (
            <S.ProdListThumb
              key={index}
              src={url}
              width='100%'
              height='160px'
            />
          ))}
        </SwiperCarousel>
        <S.ControlsWrapper>
          <IconButton
            className={`btnAutoPlay ${!isAutoPlay ? 'play' : ''}`}
            img={isAutoPlay ? R.svg.icoPause : R.svg.icoPlay}
            onClick={handleAutoPlay}
            tintColor={colors.white}
          />
          <div
            className='pagination'
            ref={paginationRef}
          ></div>
        </S.ControlsWrapper>
      </S.BannerSwiperContainer>
    </S.ProdListInfoViewNoSpace>
  );
};

export default ProductBanner;
