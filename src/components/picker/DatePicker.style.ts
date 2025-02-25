import 'react-calendar/dist/Calendar.css';

import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CalendarContainer = styled.div<{
  $top: number;
  $left?: number;
  $right?: number;
  $position: 'top' | 'bottom';
}>`
  position: fixed;
  top: ${(props) => pxToRem(props.$top)};
  ${({ $left, $right }) => {
    if ($left) {
      return css`
        left: ${pxToRem($left)};
      `;
    }
    if ($right) {
      return css`
        right: ${pxToRem($right)};
      `;
    }
  }}

  transform: translateY(${(props) => (props.$position === 'top' ? '-100%' : '0')});
  z-index: 1000;
  background: white;
  border: 0.1rem solid #e0e0e0;
  border-radius: 0.8rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &.visible {
    opacity: 1;
  }

  .react-calendar {
    border: none;
    width: ${pxToRem(280)};

    // 캘린더 커스텀 스타일
    .react-calendar__tile {
      height: ${pxToRem(40)};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;

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
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${pxToRem(16)};
`;

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${pxToRem(4)};
`;

export const DayCell = styled.button<{ $isSelected?: boolean }>`
  padding: ${pxToRem(8)};
  text-align: center;
  border: none;
  background: ${(props) => (props.$isSelected ? '#007AFF' : 'transparent')};
  color: ${(props) => (props.$isSelected ? 'white' : 'inherit')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$isSelected ? '#007AFF' : '#f0f0f0')};
  }
`;
