import { useEffect, useRef, useState } from 'react';

import Calendar from 'react-calendar';

import dayjs from 'dayjs';

import Input from '@components/input/Input';

import * as S from './DatePicker.style';

type Props = {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  isRight?: boolean;
};

type CalendarPosition = { top: number; left?: number; right?: number };

const CustomDatePicker = ({ name, value, onChange, isRight = false }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState<CalendarPosition>({ top: 0 });
  const [calendarPlacement, setCalendarPlacement] = useState<'top' | 'bottom'>('bottom');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    const updatePosition = () => {
      if (inputRef.current && showCalendar) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const calendarHeight = 350; // 예상 캘린더 높이

        const newPlacement = spaceBelow >= calendarHeight ? 'bottom' : 'top';

        setCalendarPlacement(newPlacement);
        if (isRight) {
          const rightPosition = window.innerWidth - rect.right;
          setCalendarPosition({
            top: rect.top + (newPlacement === 'bottom' ? rect.height : 0),
            left: undefined,
            right: rightPosition,
          });
        } else {
          setCalendarPosition({
            top: rect.top + (newPlacement === 'bottom' ? rect.height : 0),
            left: rect.left,
            right: undefined,
          });
        }
        // 위치가 설정된 후 캘린더를 보이게 함
        setTimeout(() => {
          setIsCalendarVisible(true);
        }, 50);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    if (showCalendar) {
      updatePosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showCalendar, isRight]);

  const handleDateChange = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    onChange(name, formattedDate);
    setShowCalendar(false);
    setIsCalendarVisible(false);
  };

  const handleInputClick = () => {
    if (showCalendar) {
      // 이미 켜져있으면 끄기
      setShowCalendar(false);
      setIsCalendarVisible(false);
    } else {
      // 꺼져있으면 켜기
      setShowCalendar(true);
    }
  };

  return (
    <S.DatePickerWrapper>
      <Input
        name={name}
        ref={inputRef}
        type='text'
        value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
        onClick={handleInputClick}
        readOnly
        height='md'
      />

      {showCalendar && (
        <S.CalendarContainer
          ref={calendarRef}
          $top={calendarPosition.top}
          $left={calendarPosition.left}
          $right={calendarPosition.right}
          $position={calendarPlacement}
          className={isCalendarVisible ? 'visible' : ''}
        >
          <Calendar
            onChange={(value) => {
              if (typeof value === 'object') {
                handleDateChange(value as Date);
              }
            }}
            value={value ? new Date(value) : new Date()}
            formatDay={(_, date) => date.getDate().toString()}
            locale='ko-KR'
          />
        </S.CalendarContainer>
      )}
    </S.DatePickerWrapper>
  );
};

export default CustomDatePicker;
