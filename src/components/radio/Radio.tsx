import * as S from './Radio.style';

export type RadioItem = {
  id: string;
  label: string;
  value: string;
  radioGroup: string;
};

type RadioProps = {
  id: string;
  label: string;
  value: string;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

const Radio = ({ id, label, value, name, selectedValue, onChange }: RadioProps) => {
  return (
    <S.RadioContainer>
      <S.RadioInput
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
      <S.RadioLabel htmlFor={id}>{label}</S.RadioLabel>
    </S.RadioContainer>
  );
};

export default Radio;
