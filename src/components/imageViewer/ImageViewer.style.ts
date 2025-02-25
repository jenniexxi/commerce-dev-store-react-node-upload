import styled from 'styled-components';

import { pxToRem } from '@utils/display';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 6.4rem);
  display: flex;
  flex-direction: column;
`;

export const ThumbnailList = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1.6rem;
  height: 9.6rem;
`;

export const Thumbnail = styled.div<{ $selected: boolean }>`
  height: 6.4rem;
  width: 6.4rem;
  border-radius: 1.2rem;
  overflow: hidden;
  opacity: 0.6;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  & ~ div {
    margin-left: 0.8rem;
  }
  &.active {
    opacity: 1;
    border: 1px solid ${({ theme }) => theme.colors.primary1};
  }
`;
export const ImageViewArea = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ViewImage = styled.img<{ $scale: number; $translateX?: number; $translateY?: number }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.2s;
  touch-action: none;
  transform: translate(${(props) => pxToRem(props.$translateX)}, ${(props) => pxToRem(props.$translateY)})
    scale(${(props) => props.$scale});
`;
