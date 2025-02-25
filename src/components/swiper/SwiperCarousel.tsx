import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperProps, SwiperSlide } from 'swiper/react';

import * as S from './SwiperCarousel.style';

type Props = SwiperProps & {
  children?: JSX.Element[];
  isPagination?: boolean;
  slideClick?: () => void;
  slideNavi?: boolean;
  className?: string;
};

const SwiperCarousel = ({
  children,
  isPagination = false,
  slideClick,
  slideNavi = false,
  modules = [],
  slidesPerView,
  className,
  ...props
}: Props) => {
  return (
    <S.SwiperContainer className={className}>
      <S.CustomSwiper
        modules={[Pagination, Navigation, ...modules]}
        pagination={{ enabled: isPagination, clickable: true }}
        navigation={{ enabled: slideNavi }}
        slidesPerView={slidesPerView}
        {...props}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <SwiperSlide
                key={index}
                onClick={slideClick}
              >
                {child}
              </SwiperSlide>
            ))
          : children}
      </S.CustomSwiper>
    </S.SwiperContainer>
  );
};

export default SwiperCarousel;
