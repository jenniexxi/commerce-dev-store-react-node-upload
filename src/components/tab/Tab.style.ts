import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

const selectedTab = css`
  font-weight: 700;
  font-size: 1.6rem;
  color: #000000;
  background-color: #ffffff;
`;
const defaultTab = css`
  font-weight: 400;
  font-size: 1.6rem;
  color: #777777;
  background-color: #ffffff;
`;

export const TabContainer = styled.div`
  width: 100%;
`;
export const TabItemView = styled.ul<{
  $height?: number;
  $isStickyTab: boolean;
}>`
  width: 100%;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  align-items: center;

  overflow-x: auto; // 가로 스크롤 허용
  white-space: nowrap; // 내부 요소들이 줄바꿈되지 않도록 설정
  -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤 지원

  // 스크롤바 숨기기 (선택적)
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }

  ${({ $isStickyTab }) =>
    $isStickyTab &&
    css`
      position: fixed;
      top: 0;
    `}

  ${({ $height }) =>
    $height &&
    css`
      height: ${pxToRem($height)};
    `}
`;

export const TabItem = styled.li<{
  $width?: number;
  $height: number;
  $isFixedWidth: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $height }) => 'height:' + pxToRem($height - 1) + ';'}
  border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
  ${({ $isFixedWidth, $width }) => {
    if ($isFixedWidth) {
      return css`
        width: ${pxToRem($width)};

        flex-shrink: 0;
      `;
    } else {
      return css`
        flex: 1;
      `;
    }
  }}
`;

export const TabItemLabel = styled.div<{ $isBottomLineStretch: boolean; $isSelected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${({ $isBottomLineStretch }) => {
    if ($isBottomLineStretch) {
      return css`
        width: 100%;
      `;
    } else {
      return css``;
    }
  }}
  span {
    ${({ $isSelected }) => ($isSelected ? selectedTab : defaultTab)}
    position: relative;
    margin-top: 0.3rem;
  }
`;

export const SelectBorder = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  bottom: -0.1rem;
  width: 100%;
  ${({ $isSelected }) =>
    $isSelected
      ? css`
          height: 0.2rem;
          background-color: #000;
        `
      : css``}
`;
export const NewIcon = styled.div`
  position: absolute;
  right: -0.7rem;
  top: -0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.status_danger};
`;

export const TabContent = styled.div<{
  $isStickyTab: boolean;
  $tabViewHeight?: number;
}>`
  overflow-y: auto;
  ${({ $isStickyTab, $tabViewHeight }) =>
    $isStickyTab &&
    css`
      margin-top: ${pxToRem($tabViewHeight)};
    `}
`;
