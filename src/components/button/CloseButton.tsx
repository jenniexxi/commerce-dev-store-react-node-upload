import IconButton from '@components/button/IconButton';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import * as S from './Button.style';

type Props = {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  closeBtnPosition?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  tintColor?: string;
};

const CloseButton = ({ onClick, size = 20, closeBtnPosition, className, tintColor = colors.icon3 }: Props) => {
  return (
    <S.CloseButton
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      $closeBtnPosition={closeBtnPosition}
      className={className}
    >
      {/* <CloseButtonSVG
        size={size}
        strokeWidth={strokeWidth}
      /> */}
      <SvgIcon
        name={R.svg.icoClose}
        tintColor={tintColor}
        width={size}
        height={size}
      />
    </S.CloseButton>
  );
};

export default CloseButton;
