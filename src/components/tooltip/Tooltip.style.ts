import styled, { css } from 'styled-components';

export const TipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const TipTrigger = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #838383;
  width: 1.6rem;
`;

export const TipTarget = styled.div`
  display: none;
  position: absolute;
  top: 2.5rem;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 2;
  transition: all 0.3s;
  &.show {
    display: block;
    opacity: 1;
  }
  &.top {
    top: -4rem;
    i {
      transform: rotate(-180deg) translateX(-10px);
      top: auto;
      bottom: -4rem;
    }
  }
`;

export const TipTargetInner = styled.div`
  position: absolute;
  padding: 1.6rem;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0px 0px 8px rgba(21, 21, 21, 0.12);
  text-align: left;
  width: 28rem;
`;

export const TipArrow = styled.i<{ $arrowBorderColor?: string; $arrowBackgroundColor?: string }>`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
    color: transparent;
    display: inline-block;
    vertical-align: middle;
  }

  &:before {
    left: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    ${({ $arrowBorderColor }) => css`
      border-bottom: 6px solid ${$arrowBorderColor || '#e7e7f0'};
    `}
  }

  &:after {
    left: 1px;
    top: 1px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    ${({ $arrowBackgroundColor }) => css`
      border-bottom: 5px solid ${$arrowBackgroundColor || '#fff'};
    `}
  }
`;
