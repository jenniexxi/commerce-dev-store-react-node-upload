import { fonts } from '@styles/theme';

import * as S from './Checkbox.style';

/* value 값이 없을 수 있으니 옵셔널 처리 */

type CheckboxProps = {
  id: string;
  value?: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  fontType?: keyof typeof fonts;
  chkType?: 'fill' | 'outline';
  className?: string;
};

const Checkbox = ({
  id,
  value = '',
  name,
  checked,
  onChange,
  disabled = false,
  fontType = 'body1_normal',
  chkType = 'fill',
  className,
}: CheckboxProps) => {
  return (
    <S.CheckboxContainer className={className}>
      <S.CheckboxInput
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.checked);
        }}
        disabled={disabled}
        $chkType={chkType}
      />
      <S.CheckboxLabel
        htmlFor={id}
        $fontType={fontType}
      >
        {value}
      </S.CheckboxLabel>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
