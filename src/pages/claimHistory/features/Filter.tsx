import { Selector } from '@components';
import { MYPAGE_CLAIM_SORT_CODES } from '@type';
import dayjs from 'dayjs';

import { ClaimListQuery } from '@apis/claimApi';

import * as S from './_ClaimHistory.style';

const PERIOD_TYPE = [
  { label: '3개월', value: '3개월' },
  { label: '6개월', value: '6개월' },
  { label: '1년', value: '1년' },
];

const SEARCH_ITEM_TYPE = [
  { label: '전체', value: MYPAGE_CLAIM_SORT_CODES.ALL_CLAIM },
  { label: '취소', value: MYPAGE_CLAIM_SORT_CODES.CANCEL },
  { label: '교환', value: MYPAGE_CLAIM_SORT_CODES.EXCHANGE },
  { label: '반품', value: MYPAGE_CLAIM_SORT_CODES.RETURN },
];
type Props = {
  searchParam: ClaimListQuery;
  onChange: (name: string, value: string) => void;
};
const Filter = ({ searchParam, onChange }: Props) => {
  const onChangeType = (value: string) => {
    onChange('mypageItemStatusEnum', value);
  };

  const onChangePeriod = (value: string) => {
    onChange('endDate', dayjs().format('YYYY-MM-DD'));
    switch (value) {
      case '3개월':
        onChange('startDate', dayjs(searchParam.endDate).add(-3, 'months').format('YYYY-MM-DD'));
        break;
      case '6개월':
        onChange('startDate', dayjs(searchParam.endDate).add(-6, 'months').format('YYYY-MM-DD'));
        break;
      case '1년':
      default:
        onChange('startDate', dayjs(searchParam.endDate).add(-12, 'months').format('YYYY-MM-DD'));
        break;
    }
  };

  return (
    <S.FilterContainer>
      <Selector
        defaultValue={MYPAGE_CLAIM_SORT_CODES.ALL_CLAIM}
        options={SEARCH_ITEM_TYPE}
        onChange={onChangeType}
      />
      <div style={{ width: 10 }} />
      <Selector
        defaultValue='1년'
        options={PERIOD_TYPE}
        onChange={onChangePeriod}
      />
    </S.FilterContainer>
  );
};

export default Filter;
