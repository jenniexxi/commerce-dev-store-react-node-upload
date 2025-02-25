import styled, { css } from 'styled-components';

export const HorScrollWrap = styled.div`
  position: relative;
  overflow: hidden;
  padding-left: 20px;
`;

export const ScrollList = styled.ul`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollItem = styled.li<{
  $isActive: boolean;
  $width?: number;
  $height?: number;
  $marginRight?: number;
}>`
  margin-right: ${({ $marginRight }) => ($marginRight ? `${$marginRight}px` : '10px')};
  span {
    ${({ $isActive }) =>
      $isActive
        ? css`
            background-color: #aaa;
            color: #fff;
          `
        : css`
            background-color: #ddd;
            color: #000;
          `}
    width: ${({ $width }) => ($width ? `${$width}px` : '84px')};
    height: ${({ $height }) => ($height ? `${$height}px` : '58px')};
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`;
