import * as S from './Togglebox.style';

type CheckboxProps = {
  id: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Togglebox = ({ id, value, name, checked, onChange }: CheckboxProps) => {
  return (
    <S.ToggleboxContainer>
      <S.ToggleboxInput
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <S.ToggleboxLabel htmlFor={id}>{value}</S.ToggleboxLabel>
    </S.ToggleboxContainer>
  );
};

export default Togglebox;
