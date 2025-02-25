import { useRef, useState } from 'react';

import Calendar from 'react-calendar';

import { T } from '@commons';
import { Button, Modal } from '@components';
import { MYPAGE_SORT_CODES } from '@type';
import dayjs from 'dayjs';

import { showModal } from '@components/modal/ModalManager';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import { OrderListQuery } from '@apis/orderApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './_OrderHistory.style';

type FilterOption = {
  label: string;
  value: string;
};

const SEARCH_ITEM_TYPE: FilterOption[] = [
  { label: '전체', value: MYPAGE_SORT_CODES.ALL_ORDER },
  { label: '입금대기중', value: MYPAGE_SORT_CODES.DEPOSIT_READY },
  { label: '결제완료', value: MYPAGE_SORT_CODES.DEPOSIT_COMPLETE },
  { label: '배송준비중', value: MYPAGE_SORT_CODES.SHIPPING_READY },
  { label: '배송중', value: MYPAGE_SORT_CODES.SHIPPING_ING },
  { label: '배송완료', value: MYPAGE_SORT_CODES.SHIPPING_COMPLETE },
  { label: '구매확정', value: MYPAGE_SORT_CODES.FINISH },
  { label: '취소', value: MYPAGE_SORT_CODES.CANCEL },
  { label: '교환', value: MYPAGE_SORT_CODES.EXCHANGE },
  { label: '반품', value: MYPAGE_SORT_CODES.RETURN },
  // { label: '배송지연', value: '1년' },
  // { label: '배송시작', value: '1년' },
];

type Props = {
  searchParam: OrderListQuery;
  onChange: (name: string, value: string) => void;
  handleReset: () => void;
};

const Filter = ({ searchParam, onChange, handleReset }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<FilterOption>({ label: '전체', value: MYPAGE_SORT_CODES.ALL_ORDER });
  const [selectedPeriod, setSelectedPeriod] = useState('3');
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
    onChange('mypageItemStatusEnum', item.value);
  };

  const handleCustomPeriod = () => {
    // startDate와 endDate 모두 있을 때만 검사
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      const oneYearFromStart = start.add(1, 'year');

      if (start.isAfter(end)) {
        showModal.text('종료일은 시작일보다 이전일 수 없습니다.');
        return;
      }

      if (startDate && end.isAfter(oneYearFromStart)) {
        // 시작일 선택 시 종료일이 1년 이상 차이나는 경우
        showModal.text('최대 조회기간은 1년입니다.');
        return;
      }

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
        <S.SearchSection>
          <S.SearchInput
            ref={inputRef}
            name='goodsName'
            value={searchParam.goodsName}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            placeholder='상품명으로 검색하세요.'
            resetValue={() => {
              handleReset();
            }}
          />
        </S.SearchSection>
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
                ? `${dayjs(startDate).format('YYYY.MM.DD')}~${dayjs(endDate).format('YYYY.MM.DD')}`
                : '직접입력'}
              <S.ChipSvgIcon
                name={R.svg.icoChevronDown}
                tintColor={selectedPeriod === 'custom' ? colors.white : colors.icon3}
              />
            </S.Chip>
          </S.ChipBox>
        </S.ChipWrap>
      </S.FilterContainer>{' '}
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
            {SEARCH_ITEM_TYPE.map((item) => {
              return (
                <S.TypeBtn
                  title={item.label}
                  $selected={temporaryType.value === item.value}
                  btnType='tertiary'
                  align='center'
                  onClick={() => setTemporaryType(item)}
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
                width='100%'
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
                      {dayjs(startDate).format('YYYY.MM.DD')}
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
                  formatDay={(_, date) => date.getDate().toString()}
                  locale='ko-KR'
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
                      {dayjs(endDate).format('YYYY.MM.DD')}
                    </T.Body1_NormalM>
                  ) : (
                    <T.Body1_Normal
                      $color={colors.text5}
                      $mr={12}
                    >
                      종료일을 선택해주세요
                    </T.Body1_Normal>
                  )}
                  <SvgIcon name={showEndCalendar ? R.svg.icoChevronUp : R.svg.icoChevronDown} />
                </S.DateBox>
              </S.DateWrap>
              {showEndCalendar && (
                <Calendar
                  onChange={(value) => {
                    setEndDate(value as Date);
                    setShowEndCalendar(false);
                    setShowStartCalendar(false);
                  }}
                  value={endDate}
                  formatDay={(_, date) => date.getDate().toString()}
                  locale='ko-KR'
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
