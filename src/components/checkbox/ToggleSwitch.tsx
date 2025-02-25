import { useCallback } from 'react';

import * as S from './ToggleSwitch.style';

export type Props = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: S.Size;
};

const ToggleSwitch = ({ checked = false, onChange, disabled = false, size = 'medium' }: Props) => {
  const handleChange = useCallback(() => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  }, [checked, disabled, onChange]);

  return (
    <S.SwitchWrapper
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      $checked={checked}
      $size={size}
      onClick={handleChange}
    >
      <S.Slider
        $checked={checked}
        $size={size}
      />
    </S.SwitchWrapper>
  );
};

export default ToggleSwitch;
