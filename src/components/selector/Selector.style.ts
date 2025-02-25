import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';
import R from '@utils/resourceMapper';

export const SelectContainer = styled.div<{ $width?: number; $disable: boolean }>`
  position: relative;
  ${({ $width }) =>
    $width
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: 100%;
        `};
  ${({ $disable }) => $disable && css``}
`;

export const Selector = styled.div<{
  $selectedOption: any;
  $isOpen: boolean;
  $disable: boolean;
}>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  min-height: 4.8rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 0 3.5rem 0 1.6rem;
  border-radius: 1.2rem;
  color: ${({ theme }) => theme.colors.text4};
  ${({ theme }) => theme.fonts.body1_normal};
  line-height: 4.6rem;
  &:after {
    display: inline-block;
    content: '';
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.colors.icon2};
    mask-image: url(/src/assets/svg/ico_chevron_left.svg);
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
    ${({ $disable }) => $disable && css``}
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1.5rem;
    right: 1.6rem;
    transform: rotate(270deg);
  }
  ${({ $isOpen, theme }) =>
    $isOpen &&
    css`
      border: 1px solid ${theme.colors.icon2};
      border-bottom-color: ${({ theme }) => theme.colors.line3};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      &:after {
        transform: rotate(90deg);
      }
    `}
  ${({ $disable, theme }) =>
    $disable &&
    css`
      background-color: ${theme.colors.background2};
      color: ${theme.colors.text3};
    `}
`;

export const OptionContainer = styled.ul`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.icon2};
  border-top: none;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  z-index: 1;
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line3};
`;

export const Option = styled.li<{ $disabled?: boolean }>`
  padding: 1.6rem;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1;
  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          color: ${theme.colors.text6};
          /* border: 1px solid ${theme.colors.line3};
          background-color: ${theme.colors.background2}; */
        `
      : css`
          color: ${theme.colors.black};
        `}
`;

export const OptionSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  span {
    width: 10rem;
  }
`;
