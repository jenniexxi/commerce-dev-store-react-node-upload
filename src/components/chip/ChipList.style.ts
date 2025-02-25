import styled, { css } from 'styled-components';

import R from '@utils/resourceMapper';

import { ChipColorType, ChipType } from './ChipList';

export const ChipWrap = styled.div``;

export const Chip = styled.div<{
  $chipType: ChipType;
  $colorType: ChipColorType;
  $isSelected: boolean;
  $disabled: boolean;
  $hasChild: boolean;
}>`
  & + div {
    margin-left: 1rem;
  }
  ${({ $chipType, $colorType, theme }) => {
    switch ($chipType) {
      case 'option':
        return css`
          border-radius: 1.2rem;
          border: 1px solid ${theme.colors.line3};
          color: ${theme.colors.text3};
          ${theme.fonts.body2_normal};
          padding: 0.8rem 1.2rem;
          line-height: 1.286;
        `;
      default:
        if ($colorType === 'black') {
          return css`
            border-radius: 2.4rem;
            border: 1px solid ${theme.colors.line3};
            background-color: ${theme.colors.background1};
            color: ${theme.colors.text3};
            ${theme.fonts.body2_normal};
            padding: 0.8rem 1.45rem;
            line-height: 1.286;
          `;
        } else {
          return css`
            border-radius: 2.4rem;
            border: 1px solid ${theme.colors.line3};
            background-color: ${theme.colors.background1};
            color: ${theme.colors.text3};
            ${theme.fonts.body2_normal};
            padding: 0.8rem 1.45rem;
            line-height: 1.286;
          `;
        }
    }
  }}
  ${({ $chipType, $colorType, $isSelected, theme }) => {
    if (!$isSelected) return;
    switch ($chipType) {
      case 'option':
        return css`
          border: 1px solid ${theme.colors.text3};
          color: ${theme.colors.text3};
        `;
      default:
        switch ($colorType) {
          case 'gray':
            return css`
              border: 1px solid ${theme.colors.background2};
              background-color: ${theme.colors.background2};
              color: ${theme.colors.text3};
            `;
          default:
            return css`
              background-color: ${theme.colors.text3};
              border: 1px solid ${theme.colors.text3};
              color: ${theme.colors.text1};
            `;
        }
    }
  }}
    ${({ $chipType, $disabled, theme }) =>
    $chipType === 'option' &&
    $disabled &&
    css`
      border: 1px solid ${theme.colors.line3};
      color: ${theme.colors.status_disabled};
    `}
    ${({ $colorType, $isSelected, theme, $hasChild }) => {
    if (!$hasChild) return;

    let childStyles;

    if ($isSelected) {
      switch ($colorType) {
        case 'gray':
          childStyles = css`
            color: ${theme.colors.text3};
            filter: invert(9%) sepia(6%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(95%);
          `;
          break;
        default:
          childStyles = css`
            color: ${theme.colors.text1};
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
          `;
          break;
      }
    } else {
      childStyles = css`
        color: ${theme.colors.text3};
      `;
    }

    return css`
      position: relative;
      padding: 0.8rem 3.2rem 0.8rem 1.2rem;
      &:after {
        display: inline-block;
        content: '';
        background-image: url(${R.svg.icoChevronLeft});
        filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(85%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
        transform: rotate(270deg);
        ${childStyles}
      }
    `;
  }};
`;

export const ChipChild = styled.div``;

export const ChipChildWrap = styled.ul``;

export const ChipListWrap = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  padding: 0.8rem 1.6rem;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const FilterItemBox = styled.div<{ $filterUI: boolean }>`
  position: sticky;
  top: 0.8rem;
  left: 0;
  z-index: 10;
  ${({ $filterUI }) =>
    $filterUI
      ? css`
          &::before {
            display: inline-block;
            content: '';
            width: 6.8rem;
            height: 5.2rem;
            background: linear-gradient(90deg, #fff 80.15%, rgba(255, 255, 255, 0) 100%);
            position: absolute;
            top: -12px;
            left: -17px;
            z-index: -1;
          }
          span {
            display: none;
          }
        `
      : css``}
`;

export const FilterItem = styled.div<{ $filterUI: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.4rem;
  border: 1px solid ${(props) => props.theme.colors.line3};
  background-color: ${(props) => props.theme.colors.background1};
  color: ${(props) => props.theme.colors.text3};
  padding: 0.85rem 0.862rem;
  margin-right: 0.8rem;
  height: 3.6rem;
  span {
    font-size: 1.4rem;
    letter-spacing: 0.02em;
    font-weight: 400;
    margin-left: 0.4rem;
  }
  strong {
    ${({ theme }) => theme.fonts.body2_normalb};
    margin-left: 0.4rem;
  }
`;
