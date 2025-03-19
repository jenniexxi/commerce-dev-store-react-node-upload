import { useState } from 'react';

import Calendar from 'react-calendar';

import { T } from '@commons';
import { Button, Modal, Radio } from '@components';
import dayjs from 'dayjs';

import { addToast } from '@components/toast/Toast';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import * as S from '../ProductInquiry.style';

type FilterOption = {
  label: string;
  value: string;
};

export type SearchParamsQuery = {
  page: number;
  size: number;
  bbsTypeId?: number;
  startDate: string;
  endDate: string;
  inquiryStatus: string;
};

const INQUIRY_STATUS_OPTIONS = [
  { label: '전체', value: 'ALL' },
  { label: '답변예정', value: 'READY' },
  { label: '답변완료', value: 'DONE' },
];

type Props = {
  searchParam: SearchParamsQuery;
  onChange: (name: string, value: string) => void;
};

const Filter = ({ searchParam, onChange }: Props) => {
  const [selectedType, setSelectedType] = useState<FilterOption>({ label: '전체', value: 'ALL' });
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [temporaryType, setTemporaryType] = useState(selectedType);

  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [periodModalOpen, setPeriodModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [showStartCalendar, setShowStartCalendar] = useState(true);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const onChangePeriod = (value: string) => {
    onChange('endDate', dayjs().format('YYYY-MM-DD'));
    setSelectedPeriod(value);
    setShowCustom(false);

    switch (value) {
      case '1':
        onChange('startDate', dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
        break;
      case '3':
        onChange('startDate', dayjs(searchParam.endDate).add(-3, 'months').format('YYYY-MM-DD'));
        break;
      case '6':
        onChange('startDate', dayjs(searchParam.endDate).add(-6, 'months').format('YYYY-MM-DD'));
        break;
      case '12':
        onChange('startDate', dayjs(searchParam.endDate).add(-12, 'months').format('YYYY-MM-DD'));
        break;
      default:
        handleCustomPeriod();
        break;
    }
  };

  const onChangeType = (item: FilterOption) => {
    setSelectedType(item);
    onChange('inquiryStatus', item.value);
  };

  const validatePeriod = (endDate: Date) => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      const oneYearFromStart = start.add(1, 'year');

      if (start.isAfter(end)) {
        addToast('종료일은 시작일보다 이전일 수 없습니다.');
        return false;
      }

      if (startDate && end.isAfter(oneYearFromStart)) {
        addToast('최대 1년까지 조회 가능해요');
        return false;
      }
    }
    return true;
  };

  const handleCustomPeriod = () => {
    if (startDate && endDate) {
      setShowCustom(true);
      onChange('startDate', dayjs(startDate).format('YYYY-MM-DD'));
      onChange('endDate', dayjs(endDate).format('YYYY-MM-DD'));
    }
  };

  const resetCalendar = () => {
    setShowStartCalendar(true);
    setShowEndCalendar(false);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <>
      <S.FilterContainer>
        <S.ChipWrap>
          <S.FixedChipWrapper>
            <S.FixedChip onClick={() => setTypeModalOpen(true)}>
              {selectedType.label}
              <S.ChipSvgIcon
                name={R.svg.icoChevronDown}
                tintColor={colors.icon3}
              />
            </S.FixedChip>
          </S.FixedChipWrapper>
          <S.ChipBox>
            <S.Chip
              $isSelected={selectedPeriod === '1'}
              onClick={() => onChangePeriod('1')}
            >
              1개월
            </S.Chip>
            <S.Chip
              $isSelected={selectedPeriod === '3'}
              onClick={() => onChangePeriod('3')}
            >
              3개월
            </S.Chip>
            <S.Chip
              $isSelected={selectedPeriod === '6'}
              onClick={() => onChangePeriod('6')}
            >
              6개월
            </S.Chip>
            <S.Chip
              $isSelected={selectedPeriod === '12'}
              onClick={() => onChangePeriod('12')}
            >
              1년
            </S.Chip>
            <S.Chip
              $isSelected={selectedPeriod === 'custom'}
              onClick={() => {
                setPeriodModalOpen(true);
                resetCalendar();
              }}
            >
              {startDate && endDate && showCustom
                ? `${dayjs(startDate).format('YYYY.MM')}~${dayjs(endDate).format('YYYY.MM')}`
                : '직접입력'}
              <S.ChipSvgIcon
                name={R.svg.icoChevronDown}
                tintColor={selectedPeriod === 'custom' ? colors.white : colors.icon3}
              />
            </S.Chip>
          </S.ChipBox>
        </S.ChipWrap>
      </S.FilterContainer>
      {typeModalOpen && (
        <Modal
          type='bottomSheet'
          onHide={() => setTypeModalOpen(false)}
          showCloseBtn={false}
          fixedArea={
            <S.TypeModalBtnBox>
              <Button
                title='확인'
                width='100%'
                align='center'
                onClick={() => {
                  onChangeType(temporaryType);
                  setTypeModalOpen(false);
                }}
              />
            </S.TypeModalBtnBox>
          }
        >
          <S.TypeModalBtnType>
            {INQUIRY_STATUS_OPTIONS.map((item) => {
              return (
                <Radio
                  key={item.value}
                  id={item.value}
                  value={item.value}
                  label={item.label}
                  name='statusOption'
                  selectedValue={temporaryType.value}
                  onChange={() => setTemporaryType(item)}
                  fontType='body1_normal'
                />
              );
            })}
          </S.TypeModalBtnType>
        </Modal>
      )}
      {periodModalOpen && (
        <Modal
          type='bottomSheet'
          onHide={() => setPeriodModalOpen(false)}
          showCloseBtn={false}
          fixedArea={
            <S.TypeModalBtnBox>
              <Button
                width={56}
                btnType='tertiary'
                title={
                  <SvgIcon
                    name={R.svg.icoRefresh}
                    width={20}
                    height={20}
                  />
                }
                style={{
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                  flexShrink: 0,
                }}
              />
              <Button
                title='확인'
                width={1}
                align='center'
                disabled={!(startDate && endDate)}
                onClick={() => {
                  setShowCustom(true);
                  onChangePeriod('custom');
                  setPeriodModalOpen(false);
                }}
              />
            </S.TypeModalBtnBox>
          }
        >
          <S.PeriodModalBtnType>
            <S.DateCalendarWrap>
              <S.DateWrap
                onClick={() => {
                  setShowStartCalendar(true);
                  setShowEndCalendar(false);
                }}
              >
                <S.DateText>시작일</S.DateText>
                <S.DateBox>
                  {startDate ? (
                    <T.Body1_NormalM
                      $color={colors.primary_text1}
                      $mr={12}
                    >
                      {dayjs(startDate).format('YYYY.MM')}
                    </T.Body1_NormalM>
                  ) : (
                    <T.Body1_Normal
                      $color={colors.text5}
                      $mr={12}
                    >
                      시작일을 선택해주세요
                    </T.Body1_Normal>
                  )}
                  <SvgIcon
                    name={showStartCalendar ? R.svg.icoChevronUp : R.svg.icoChevronDown}
                    width={20}
                    height={20}
                  />
                </S.DateBox>
              </S.DateWrap>
              {showStartCalendar && (
                <Calendar
                  onChange={(value) => {
                    setStartDate(value as Date);
                    setShowEndCalendar(true);
                    setShowStartCalendar(false);
                  }}
                  value={startDate}
                  locale='ko-KR'
                  maxDetail='year'
                  view='year'
                  maxDate={new Date()}
                  prev2Label={null}
                  next2Label={null}
                />
              )}
            </S.DateCalendarWrap>
            <S.DateCalendarWrap>
              <S.DateWrap
                onClick={() => {
                  setShowStartCalendar(false);
                  setShowEndCalendar(true);
                }}
              >
                <S.DateText>종료일</S.DateText>
                <S.DateBox>
                  {endDate ? (
                    <T.Body1_NormalM
                      $color={colors.primary_text1}
                      $mr={12}
                    >
                      {dayjs(endDate).format('YYYY.MM')}
                    </T.Body1_NormalM>
                  ) : (
                    <T.Body1_Normal
                      $color={colors.text5}
                      $mr={12}
                    >
                      종료일을 선택해주세요
                    </T.Body1_Normal>
                  )}
                  <SvgIcon
                    name={showStartCalendar ? R.svg.icoChevronUp : R.svg.icoChevronDown}
                    width={20}
                    height={20}
                  />
                </S.DateBox>
              </S.DateWrap>
              {showEndCalendar && (
                <Calendar
                  onChange={(value) => {
                    if (validatePeriod(value as Date)) {
                      setEndDate(
                        dayjs(value as Date)
                          .endOf('month')
                          .toDate(),
                      );
                      setShowEndCalendar(false);
                      setShowStartCalendar(false);
                    }
                  }}
                  value={endDate || new Date()}
                  locale='ko-KR'
                  maxDetail='year'
                  view='year'
                  maxDate={new Date()}
                  prev2Label={null}
                  next2Label={null}
                />
              )}
            </S.DateCalendarWrap>
          </S.PeriodModalBtnType>
        </Modal>
      )}
    </>
  );
};

export default Filter;
