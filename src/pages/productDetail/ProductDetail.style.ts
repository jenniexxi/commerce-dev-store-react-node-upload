import styled, { css } from 'styled-components';

export const ProductDetailContainer = styled.div`
  display: block;
  .secTopLine {
    border-top: 8px solid ${(props) => props.theme.colors.line2};
  }
`;

export const CustomPagination = css`
  .swiper-pagination {
    position: absolute;
    bottom: 2rem;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    overflow: hidden;
    .swiper-pagination-bullet {
      ${({ theme }) => css`
        ${theme.fonts.body1_normal}
        color:${theme.colors.text1};
      `}
      width:1.6rem;
      height: 0.2rem;
      background-color: #e5e5e8;
      border-radius: 0;
      margin: 0;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      ${({ theme }) => css`
        ${theme.fonts.body1_normalm}
        color:${theme.colors.text1};
      `}
      background-color:#151515;
      border-radius: 1px;
    }
  }
`;

export const ProdListThumbBox = styled.div`
  display: block;
  position: relative;
  ${CustomPagination}
`;
export const ProdListThumb = styled.img`
  display: block;
`;

export const Quantity = styled.div`
  display: block;
  margin: 5rem 0;
`;
export const QuantityMinus = styled.button`
  display: block;
`;
export const QuantityPlus = styled.button`
  display: block;
`;
export const PriceBox = styled.div`
  display: block;
  margin: 5rem 0;
`;
export const PriceTitle = styled.span`
  display: block;
  font-size: 2rem;
`;
export const Price = styled.span`
  display: block;
  font-size: 2rem;
`;

export const ImageViewButton = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 2.4rem;
  background: rgba(21, 21, 21, 0.5);
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.6rem;
    height: 1.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
