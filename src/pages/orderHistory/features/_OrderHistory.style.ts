import 'react-calendar/dist/Calendar.css';

import { Button, Input } from '@components';
import { AllOrderStates } from '@type';
import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

import SvgIcon from '@commons/SvgIcon';

export const FilterBackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000050;
`;

export const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SearchSection = styled.div`
  padding: 0 1.6rem 0.8rem;
`;

export const SearchInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  height: 4.8rem;
  border: none;
  padding: 1.3rem 4.8rem 1.3rem 1.6rem;
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text6};
  }
`;

export const OrderHistorySectionGoodsContainer = styled.div`
  padding: 2rem 1.6rem;
`;

export const OrderHistorySectionGoodsItem = styled.div`
  position: relative;
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductPart = styled.div`
  position: relative;
`;

export const ExchangeBoxPart = styled.div`
  position: relative;
  margin-top: 1.6rem;
`;

export const PayState = styled.div<{ $code: string }>`
  ${({ theme }) => theme.fonts.body2_normalb};
  margin-bottom: 0.8rem;
  ${({ $code }) => {
    switch ($code) {
      case AllOrderStates.Order.SI:
      case AllOrderStates.Order.SS:
      case AllOrderStates.Order.SC:
      case AllOrderStates.Claim.EI:
      case AllOrderStates.Claim.RI:
        return css`
          color: ${({ theme }) => theme.colors.primary_text1};
        `;
      case AllOrderStates.Order.BF:
      case AllOrderStates.Claim.CC:
      case AllOrderStates.Claim.EC:
      case AllOrderStates.Claim.RC:
        return css`
          color: ${({ theme }) => theme.colors.text4};
        `;
      case AllOrderStates.Order.SD:
        return css`
          color: ${({ theme }) => theme.colors.status_danger};
        `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.text5};
        `;
    }
  }}
`;

export const ProductInfo = styled.div`
  display: flex;
  img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 1.08rem;
    border: 1px solid ${(props) => props.theme.colors.line2};
  }
`;

export const TextBox = styled.div`
  flex: 1;
  padding-left: 0.8rem;
  width: calc(100% - 7.2rem);
`;

export const MoreButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 3.6rem;
  height: 3.6rem;
  font-weight: 800;
  font-size: 1.8rem;
`;

export const BrandName = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalm};
  color: ${({ theme }) => theme.colors.text5};
  ${({ theme }) => theme.mixins.ellipsis(1)};
  margin-bottom: 0.2rem;
`;

export const GoodsName = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
  margin-bottom: 0.2rem;
`;

export const DetailOption = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
  span {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    width: auto;
    max-width: calc(100% - 2.8rem);
    ${({ theme }) => theme.mixins.ellipsis(1)};
  }
  em {
    position: relative;
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    font-style: normal;
    padding-left: 1rem;
    &::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.colors.line3};
      position: absolute;
      top: 0.3rem;
      left: 0.5rem;
    }
  }
`;

export const GoodsOption = styled.div`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
  margin-bottom: 0.4rem;
`;

export const ReasonText = styled.span`
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  text-decoration: underline;
`;

export const Price = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 0.4rem;
`;

export const ExchangeBedge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  ${({ theme }) => theme.fonts.caption2_normalm};
  color: ${({ theme }) => theme.colors.primary1};
  padding: 0.25rem 0.4rem;
  background-color: ${({ theme }) => theme.colors.text3};
  border-radius: 0.8rem;
`;

export const GoodsShipState = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text2};
`;

export const AddGoodsContainer = styled.div`
  position: relative;
  padding: 10px;
`;
export const AddBedge = styled.div`
  width: 6rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey500};
  text-align: center;
  background: ${(props) => props.theme.colors.white};
  margin-bottom: 1rem;
`;

export const ModalGoodsInfo = styled.div`
  padding: 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 10rem;
    height: 10rem;
    border: 1px solid ${(props) => props.theme.colors.grey400};
    margin-bottom: 2rem;
  }
  div {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  button {
    margin-bottom: 0.5rem;
  }
`;

export const ChipWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.8rem 1.6rem 1.6rem;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

export const FixedChipWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, #fff 80.15%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }
`;

export const FixedChip = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 2.4rem;
  min-width: 5.6rem;
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  border: 1px solid ${({ theme }) => theme.colors.line3};
  background-color: ${({ theme }) => theme.colors.background1};
  border-radius: 2.4rem;
  position: sticky;
  top: 0.8rem;
  left: 0;
  z-index: 10;
`;

export const ChipBox = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  flex-grow: 1;
  padding-left: 0.8rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled.div<{
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 2.4rem;
  min-width: 5.6rem;
  flex-shrink: 0;
  margin-right: 0.8rem;
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${({ $isSelected, theme }) => {
    if (!$isSelected) {
      return css`
        border-radius: 2.4rem;
        border: 1px solid ${theme.colors.line3};
        background-color: ${theme.colors.background1};
        color: ${theme.colors.text3};
        ${theme.fonts.body2_normal};
      `;
    } else {
      return css`
        background-color: ${theme.colors.text3};
        border: 1px solid ${theme.colors.text3};
        color: ${theme.colors.text1};
      `;
    }
  }}
  &:last-child {
    margin-right: 0;
  }
`;

export const ChipSvgIcon = styled(SvgIcon)`
  margin-left: 0.4rem;
`;

export const TypeModalBtnBox = styled.div`
  display: flex;
  padding: 2rem 1.6rem;
`;

export const TypeModalBtnType = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 1.6rem 0.8rem;
`;

export const PeriodModalBtnType = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 1.6rem;
`;

export const TypeBtn = styled(Button)<{ $selected: boolean }>`
  width: calc(50% - 0.6rem);
  margin-bottom: 1.2rem;
  &:nth-child(2n) {
    margin-left: 1.2rem;
  }
  ${({ $selected, theme }) =>
    $selected
      ? css`
          border: 1px solid ${theme.colors.icon2};
          ${theme.fonts.body2_normalb};
          color: ${theme.colors.text3};
        `
      : css`
          ${theme.fonts.body2_normal};
        `}
`;

export const DateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.4rem;
`;

export const DateText = styled.div`
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};
`;

export const DateBox = styled.div`
  display: flex;
`;

export const DateCalendarWrap = styled.div`
  &:first-child {
    > div {
      &:first-child {
        border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
      }
    }
  }
  .react-calendar {
    border: none;
    width: 100%;
    // 캘린더 커스텀 스타일
    .react-calendar__tile {
      height: ${pxToRem(40)};
      display: flex;
      align-items: center;
      justify-content: center;
      ${({ theme }) => theme.fonts.body2_normalm};
      &:enabled:hover,
      &:enabled:focus {
        background-color: #f0f0f0;
      }
    }
    .react-calendar__tile--active {
      background: #007aff;
      color: white;
      &:enabled:hover,
      &:enabled:focus {
        background: #007aff;
      }
    }
    .react-calendar__navigation {
      height: ${pxToRem(44)};
      margin-bottom: 0;
    }
    .react-calendar__navigation button {
      min-width: ${pxToRem(44)};
      background: none;
      &:enabled:hover,
      &:enabled:focus {
        background-color: #f0f0f0;
      }
    }
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.75em;
    }
    .react-calendar__navigation__label__labelText {
      ${({ theme }) => theme.fonts.headline2b};
    }
    .react-calendar__month-view__weekdays__weekday {
      ${({ theme }) => theme.fonts.caption1_normal};
      color: ${({ theme }) => theme.colors.text5};
      abbr[title] {
        text-decoration: none;
      }
    }
  }
`;
