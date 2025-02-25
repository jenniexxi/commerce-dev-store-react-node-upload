import styled, { css } from 'styled-components';

import { fonts } from '@styles/theme';

import { pxToRem } from '@utils/display';

import { BtnSize, BtnType } from './Button';

export const Button = styled.button<{
  $btnType: BtnType;
  $size: BtnSize;
  $width?: number | '100%';
  disabled?: boolean;
  $align?: 'center';
  $textHighLight?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  min-width: auto;

  ${({ $align }) =>
    $align &&
    css`
      justify-content: ${$align};
    `}

  ${({ $width }) =>
    $width && typeof $width === 'number'
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: ${$width};
        `}
  ${({ $btnType, $size, disabled, theme }) => {
    switch ($btnType) {
      case 'tertiary':
        return css`
          background-color: ${theme.colors.background1};
          color: ${disabled ? theme.colors.status_disabled : theme.colors.text3};
          border: 1px solid ${theme.colors.line3};
        `;
      case 'secondary':
        return css`
          background-color: ${disabled ? theme.colors.status_disabled : theme.colors.background2};
          color: ${disabled ? theme.colors.text1 : theme.colors.text3};
        `;
      case 'text':
        return css`
          color: ${theme.colors.text5};
        `;
      case 'highlight':
        return css`
          color: ${theme.colors.text3};
          background-color: ${theme.colors.primary1};
        `;

      case 'primary':
      default:
        return css`
          background-color: ${disabled ? theme.colors.status_disabled : theme.colors.text3};
          color: ${$size === 'lg' ? theme.colors.primary1 : theme.colors.text1};
          ${disabled &&
          css`
            color: ${theme.colors.white};
          `};
        `;
    }
  }}
  ${({ $size }) => {
    switch ($size) {
      case 'md':
        return css`
          border-radius: 1.2rem;
          height: 4.8rem;
          ${fonts.body1_normalb};
        `;
      case 'sm':
        return css`
          border-radius: 1.2rem;
          height: 4.4rem;
          ${fonts.body2_normalb};
          padding: 0 2rem;
        `;
      case 'xsm':
        return css`
          border-radius: 0.8rem;
          height: 3.4rem;
          ${fonts.body3_normalm};
          padding: 0 1.2rem;
        `;
      case 'lg':
      default:
        return css`
          border-radius: 1.6rem;
          height: 5.6rem;
          ${fonts.body1_normalb};
        `;
    }
  }}
    ${({ $textHighLight, theme, disabled }) =>
    $textHighLight &&
    css`
      color: ${disabled ? theme.colors.white : theme.colors.primary1};
    `}
`;
export const IconDivider = styled.span`
  width: 0.4rem;
`;

export const IconButton = styled.button<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  display:flex;
  align-items: center;
  justify-content: center;
`;

//#region  Two button
export const TwoButtonContainer = styled.div<{ $direction: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
`;
//#endregion

//close button wrap
export const CloseButton = styled.button<{
  $closeBtnPosition?: { top?: number; right?: number; bottom?: number; left?: number };
}>`
  ${({ $closeBtnPosition }) => {
    if ($closeBtnPosition) {
      return css`
        position: absolute;
        ${$closeBtnPosition.top !== undefined && `top:${$closeBtnPosition.top}px;`}
        ${$closeBtnPosition.right !== undefined && `right:${$closeBtnPosition.right}px;`}
        ${$closeBtnPosition.bottom !== undefined && `bottom:${$closeBtnPosition.bottom}px;`}
        ${$closeBtnPosition.left !== undefined && `left:${$closeBtnPosition.left}px;`}
      `;
    }
  }}
`;
