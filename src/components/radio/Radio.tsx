import { T } from '@commons';

import { fonts } from '@styles/theme';

import * as S from './Radio.style';

export type RadioItem<T> = {
  id: string;
  label: string;
  value: T;
  radioGroup: string;
};

type RadioProps<T> = {
  id: string;
  label: string;
  value: T;
  name: string;
  selectedValue: T;
  fontType?: keyof typeof fonts;
  onChange: (value: T) => void;
};

const Radio = <T,>({
  id,
  label,
  value,
  name,
  selectedValue,
  onChange,
  fontType = 'caption1_normal',
}: RadioProps<T>) => {
  const checked = selectedValue === value;
  return (
    <S.RadioContainer>
      <S.RadioInput
        type='radio'
        id={id}
        name={name}
        value={String(value)}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onChange(value);
        }}
      />
      <S.RadioLabel
        $selected={checked}
        htmlFor={id}
        $fontType={fontType}
      >
        {label}
      </S.RadioLabel>
    </S.RadioContainer>
  );
};

export default Radio;
