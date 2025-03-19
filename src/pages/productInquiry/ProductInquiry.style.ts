import styled, { css } from 'styled-components';

import { neutral } from '@styles/theme';

import { pxToRem } from '@utils/display';
import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

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
      height: ${pxToRem(45)};
      display: flex;
      align-items: center;
      justify-content: center;
      ${({ theme }) => theme.fonts.body1_normalm};
      color: ${({ theme }) => theme.colors.text4};
      &:enabled:hover,
      &:enabled:focus {
      }
    }
    .react-calendar__navigation {
      display: flex;
      height: ${pxToRem(41)};
      align-items: center;
      justify-content: center;
      margin: 0.4rem 0 0 0;
    }
    .react-calendar__navigation button {
      min-width: ${pxToRem(44)};
      background: none;
      &:enabled:hover,
      &:enabled:focus {
        background-color: transparent;
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
    .react-calendar__tile--now {
      background: transparent;
    }
    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
      padding: 0;
    }
    .react-calendar__year-view__months {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr);
    }
    .react-calendar__year-view__months abbr {
    }
    .react-calendar__tile--active {
      background: transparent;
      &:enabled:hover,
      &:enabled:focus {
        background: transparent;
      }
    }
    .react-calendar__tile--active abbr {
      padding: 0.8rem 1.2rem;
      background-color: ${({ theme }) => theme.colors.text3};
      color: ${({ theme }) => theme.colors.primary1};
      border-radius: 2rem;
    }
    .react-calendar__tile:disabled {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.status_disabled};
    }
    .react-calendar__navigation__prev-button {
      text-indent: -99999999999rem;
      width: 2rem;
      height: 2rem;
      background-image: url(${R.svg.icoChevronLeft}) !important;
      background-size: 100% 100% !important;
      min-width: 2rem !important;
      margin-right: 1.2rem;
    }
    .react-calendar__navigation__next-button {
      text-indent: -99999999999rem;
      width: 2rem;
      height: 2rem;
      background-image: url(${R.svg.icoChevronRight}) !important;
      background-size: 100% 100% !important;
      min-width: 2rem !important;
      margin-left: 1.2rem;
    }
    .react-calendar__navigation__label {
      flex-grow: 0 !important;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: ${({ theme }) => theme.colors.background1};
    }
  }
`;

export const TypeModalBtnType = styled.div`
  padding: 1.6rem;
  > div {
    height: 4.8rem;
  }
  input + label {
    margin-left: 0.8rem;
  }
`;

export const PeriodModalBtnType = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 1.6rem;
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

export const GoodsBox = styled.div`
  display: flex;
  margin: 1.6rem;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.6rem;
`;

export const GoodsImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1.2rem;
  border: ${({ theme }) => theme.colors.line1};
`;

export const GoodsDetail = styled.div`
  flex: 1;
  width: calc(100% - 8.8rem);
  margin-left: 0.8rem;
  padding: 1.05rem 0.4rem;
`;

export const GoodsStore = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
  margin-bottom: 0.2rem;
`;

export const GoodsText = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
`;

export const TextWriteWrap = styled.div`
  padding: 0 1.6rem 4rem;
`;

export const GoodsTextareaBox = styled.div<{ isFocused: boolean }>`
  position: relative;
  margin-bottom: 0.8rem;
  height: 16rem;
  border-radius: 1.2rem;
  padding: 1.6rem 1.6rem 3rem;
  border: 1px solid ${({ isFocused, theme }) => (isFocused ? theme.colors.text3 : theme.colors.line3)};
`;

export const GoodsTextarea = styled.textarea`
  width: 100%;
  height: 11.4rem;
  outline: none;
  border: none;
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};
  &::placeholder {
    color: ${({ theme }) => theme.colors.text6};
  }
`;

export const TextLengthBox = styled.div`
  position: absolute;
  bottom: 0.9rem;
  right: 1.6rem;
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.icon4};
  em {
    color: ${({ theme }) => theme.colors.line3};
    margin: 0 0.2rem;
  }
`;

export const ChkBoxWrap = styled.div`
  display: flex;
  height: 3.6rem;
  margin-bottom: 1.6rem;
  > div {
    &:first-child {
      margin-right: 1.6rem;
    }
  }
`;

export const InquiryInfoBox = styled.div`
  position: relative;
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text4};
  padding-left: 1.2rem;
  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 0.4rem;
    height: 0.4rem;
    background-color: ${neutral[20]};
    border-radius: 0.2rem;
  }
  a {
    ${({ theme }) => theme.fonts.body2_normalb};
    color: ${({ theme }) => theme.colors.text4};
    text-decoration: underline;
  }
`;

export const NoteListWrap = styled.div`
  padding: 2rem 1.6rem 2.4rem;
`;

export const NoteTitle = styled.h2`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text4};
  margin-bottom: 0.8rem;
`;

export const NoteList = styled.ul`
  li {
    position: relative;
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text4};
    padding-left: 1.2rem;
    &::before {
      display: inline-block;
      position: absolute;
      top: 0.8rem;
      left: 0;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${neutral[20]};
      border-radius: 0.2rem;
    }
    + li {
      margin-top: 0.8rem;
    }
  }
`;

export const BottomButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 2rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.background1};
`;

export const SelectorBox = styled.div`
  display: flex;
`;

export const InquiryItemWrap = styled.div`
  margin: 2rem 1.6rem;
  position: relative;
`;

export const StatusGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
`;

export const AnswerStatus = styled.span`
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${({ theme }) => theme.colors.text5};
  margin-right: 0.8rem;
`;

export const DateInquiry = styled.span`
  ${({ theme }) => theme.fonts.body3_normalm};
  color: ${({ theme }) => theme.colors.text5};
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  button {
    &:first-child {
      position: relative;
      margin-right: 1.7rem;
      &::before {
        display: block;
        content: '';
        position: absolute;
        top: 0.4rem;
        right: -0.9rem;
        width: 0.1rem;
        height: 1rem;
        background-color: ${({ theme }) => theme.colors.line3};
      }
    }
  }
`;

export const GoodsGroup = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 1.2rem;
  }
`;

export const TextBox = styled.div`
  flex: 1;
  width: calc(100% - 9.2rem);
  margin: 1.05rem 0 0 1.2rem;
`;

export const StoreName = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
  margin-bottom: 0.2rem;
`;

export const GoodsName = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
`;

export const QnaGroup = styled.div``;

export const DateGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 2.2rem;
  margin: 0.8rem 0 0 2.4rem;
`;

export const AnswerDate = styled.span`
  position: relative;
  ${({ theme }) => theme.fonts.body3_normalm};
  color: ${({ theme }) => theme.colors.text5};
  margin-right: 1.7rem;
  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0.4rem;
    right: -0.9rem;
    width: 0.1rem;
    height: 1rem;
    background-color: ${({ theme }) => theme.colors.line3};
  }
`;

export const AnswerSvgIcon = styled(SvgIcon)`
  position: absolute;
  bottom: 0.3rem;
  right: 0;
`;

export const InquiryContents = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TitSvgIcon = styled(SvgIcon)`
  margin-top: 0.2rem;
`;

export const GoodsContents = styled.div<{ $expanded?: boolean }>`
  flex: 1;
  width: calc(100% - 2.2rem);
  margin-left: 1rem;
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${(props) =>
    props.$expanded
      ? css`
          white-space: normal;
          overflow: visible;
        `
      : css`
          ${({ theme }) => theme.mixins.ellipsis(3)};
          max-height: 66px;
        `};
`;

export const AnswerContents = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1.6rem;
`;

export const AnswerBox = styled.div`
  margin-left: 1rem;
  p {
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const DateInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
`;

export const SvgButton = styled.button``;

////////// 필터 추가
export const FilterContainer = styled.div`
  position: sticky;
  top: 6.4rem;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ChipWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.8rem 0 1.6rem 1.6rem;
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
    margin-right: 1.6rem;
  }
`;

export const ChipSvgIcon = styled(SvgIcon)`
  margin-left: 0.4rem;
`;

export const TypeModalBtnBox = styled.div`
  display: flex;
  padding: 2rem 1.6rem;
`;

export const EmptyDataWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 4rem;
  flex: 1;
  p {
    ${({ theme }) => theme.fonts.body1_normal};
    color: ${({ theme }) => theme.colors.text3};
    margin-top: 0.8rem;
  }
`;
