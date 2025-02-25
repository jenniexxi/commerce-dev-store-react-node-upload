import { useEffect, useState } from 'react';

import { Selector } from '@components';

import Input from './Input';
import * as S from './Input.style';

export type MobileNumber = {
  first: string;
  second: string;
  third: string;
};
type Props = {
  onChangeValue: (value: MobileNumber) => void;
};
const MOBILE_PREFIX = [
  {
    label: '010',
    value: '010',
  },
  {
    label: '011',
    value: '011',
  },
  {
    label: '016',
    value: '016',
  },
  {
    label: '017',
    value: '017',
  },
  {
    label: '018',
    value: '018',
  },
  {
    label: '019',
    value: '019',
  },
];
const MobileInput = ({ onChangeValue }: Props) => {
  const [first, setFirst] = useState('010');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');

  useEffect(() => {
    onChangeValue({ first, second, third });
  }, [first, second, third]);
  return (
    <S.MobileInput>
      <Selector
        options={MOBILE_PREFIX}
        defaultValue={'010'}
        onChange={(value) => setFirst(value)}
      />
      <span>-</span>
      <Input
        value={second}
        name='second'
        maxLength={4}
        onChange={(e) => setSecond(e.target.value)}
        height='md'
      />
      <span>-</span>
      <Input
        value={third}
        name='third'
        maxLength={4}
        onChange={(e) => setThird(e.target.value)}
        height='md'
      />
    </S.MobileInput>
  );
};

export default MobileInput;
