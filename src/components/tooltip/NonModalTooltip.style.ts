import styled, { css } from 'styled-components';

import { neutral } from '@styles/theme';

export const TipContainer = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.4rem;
`;

export const TipTrigger = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #838383;
`;

export const TipTarget = styled.div<{ $position: 'center' | 'right' | 'left'; $isTop: boolean }>`
  width: 28rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;

  padding: 1.6rem;

  ${({ $isTop }) =>
    $isTop
      ? css`
          bottom: calc(100% + 8px); // 트리거 요소 위에 위치하고 8px 간격
        `
      : css`
          margin-top: 8px;
        `}

  ${({ $position }) => {
    switch ($position) {
      case 'left':
        return css`
          left: 0px;
        `;
      case 'right':
        return css`
          right: 0px;
        `;
      case 'center':
      default:
        return css`
          left: calc((100% - 280px) / 2);
        `;
    }
  }}

  border-radius: 1.2rem;

  z-index: 2;
  transition: all 0.3s;

  box-shadow: 0px 0px 8px rgba(15, 15, 15, 0.1);
`;
export const TitleWrap = styled.div`
  height: 2.2rem;
  margin-bottom: 1.2rem;
  p {
    height: 2.2rem;
    line-height: 2.2rem;
  }
`;
export const Dot = styled.i`
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  background-color: ${neutral[20]};
  margin-right: 0.8rem;
  margin-top: 0.45rem;
  flex-shrink: 0;
`;
export const TipTargetInner = styled.div`
  display: flex;
  margin-top: 0.8rem;
  p {
    color: ${({ theme }) => theme.colors.text4};
    line-height: 1.4;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;
