import { motion } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';

import { pxToRem } from '@utils/display';

import { ModalTypes } from './Modal.type';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

// center시 좌우 여백 값
const HORIZONTAL_GAP = 20;

export const BackDrop = styled.div<{ $isAnimation: boolean; $backDropColor?: string; $zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${({ $isAnimation }) =>
    $isAnimation &&
    css`
      animation: ${fadeIn} 0.3s ease-out;
    `}
  ${({ $backDropColor }) =>
    $backDropColor &&
    css`
      background: ${$backDropColor};
    `}
    z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : 100)};
`;

export const ModalView = styled.div<{ type: ModalTypes; $isAnimated: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  ${({ type, $isAnimated }) => {
    switch (type) {
      case 'center':
        return css`
          top: 50%;
          transform: translate(-50%, -50%);
          ${$isAnimated &&
          css`
            animation: ${fadeIn} 0.3s ease-out;
          `};
        `;
      case 'topSheet':
        return css`
          top: 0;

          ${$isAnimated &&
          css`
            animation: ${slideDown} 0.3s ease-out;
          `};
        `;
      case 'bottomSheet':
      case 'expandableBottomSheet':
        return css`
          bottom: 0;
          height: auto;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          ${$isAnimated &&
          css`
            animation: ${slideUp} 0.3s ease-out;
          `};
        `;
      case 'full':
        return css`
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(0, 0);
        `;
      default:
        return '';
    }
  }}
`;

export const BottomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.5rem;
  padding: 2rem 1.6rem;
  p {
    ${({ theme }) => theme.colors.text3}
  }
  button {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

// span이 독립적으로 움직이지 않도록 수정
export const BottomHeaderWithoutTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.2rem;
  cursor: grab;
  width: 100%;
  touch-action: none;
  user-select: none;
  pointer-events: none; /* 자식 요소에 이벤트가 전달되지 않도록 설정 */

  &:active {
    cursor: grabbing;
  }

  span {
    width: 5rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.colors.line3};
    pointer-events: none; /* 드래그 이벤트가 span에 직접 영향을 주지 않도록 */
  }
`;

export const ExpandableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  padding: 0 16px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  cursor: grab;
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  h1 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text3};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.32px;
    pointer-events: none; /* 드래그 이벤트가 h1에 영향을 주지 않도록 */
  }

  .btnClose {
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%);
    z-index: 101; /* 버튼이 다른 요소 위에 오도록 */
    pointer-events: auto; /* 클릭 이벤트가 작동하도록 */
  }
`;

export const ScrollView = styled.div<{ $type: 'bottomSheet' | 'full' | 'expandableBottomSheet' }>`
  ${({ $type }) => {
    switch ($type) {
      case 'bottomSheet':
      case 'expandableBottomSheet':
      case 'full':
        return css`
          flex: 1;
          overflow-y: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
          min-height: 0;
        `;
      default:
        return '';
    }
  }}
`;

export const MotionChildView = styled(motion.div)<{
  type: ModalTypes;
  $width: number;
  $radius: number;
  $isExpanded?: boolean;
}>`
  background: #ffffff;

  ${({ type, $width, $radius, $isExpanded }) => {
    switch (type) {
      case 'center':
        return css`
          border-radius: ${pxToRem($radius)};
          width: ${pxToRem($width - HORIZONTAL_GAP * 2)};
        `;

      case 'topSheet':
        return css`
          border-bottom-left-radius: ${pxToRem($radius)};
          border-bottom-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
        `;
      case 'bottomSheet':
        return css`
          border-top-left-radius: ${pxToRem($radius)};
          border-top-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        `;
      case 'expandableBottomSheet':
        return css`
          border-radius: ${$isExpanded ? '0' : `${pxToRem($radius)} ${pxToRem($radius)} 0 0`};
          width: ${pxToRem($width)};
          display: flex;
          flex-direction: column;
          max-height: ${$isExpanded ? '100vh' : '80vh'};
          height: ${$isExpanded ? '100vh' : 'auto'};
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          transition:
            border-radius 0.3s ease,
            max-height 0.3s ease,
            height 0.3s ease;
        `;
      case 'full':
        return css`
          display: flex;
          flex-direction: column;
          max-height: 100vh;
          height: 100%;
        `;
      default:
        return '';
    }
  }};
`;

export const ChildView = styled.div<{
  type: ModalTypes;
  $width: number;
  $radius: number;
}>`
  background: #ffffff;

  ${({ type, $width, $radius }) => {
    switch (type) {
      case 'center':
        return css`
          border-radius: ${pxToRem($radius)};
          width: ${pxToRem($width - HORIZONTAL_GAP * 2)};
        `;

      case 'topSheet':
        return css`
          border-bottom-left-radius: ${pxToRem($radius)};
          border-bottom-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
        `;
      case 'bottomSheet':
      case 'expandableBottomSheet':
        return css`
          border-top-left-radius: ${pxToRem($radius)};
          border-top-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        `;
      case 'full':
        return css`
          display: flex;
          flex-direction: column;
          max-height: 100vh;
          height: 100%;
        `;
      default:
        return '';
    }
  }};
`;

export const CloseBtn = styled.div<{
  $closeBtnPosition: { top: number; right: number };
}>`
  position: absolute;
  ${({ $closeBtnPosition }) => css`
    top: ${pxToRem($closeBtnPosition.top)};
    right: ${pxToRem($closeBtnPosition.right)};
  `}
  width:2.4rem;
  height: 2.4rem;
`;

export const TextModalWrapper = styled.div`
  padding: 2.4rem 2rem 2rem 2rem;
  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.text3};
    margin-bottom: 2.4rem;
    white-space: pre-line;
  }
`;

export const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  padding: 0 16px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  h1 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text3};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.32px;
  }
  .btnClose {
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%);
  }
`;
