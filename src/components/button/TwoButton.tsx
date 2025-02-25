import { BtnSize, BtnType } from './Button';
import * as S from './Button.style';

type Props = {
  leftType?: BtnType;
  leftonClick?: () => void;
  leftTitle?: string | JSX.Element;
  rightType?: BtnType;
  rightonClick?: () => void;
  rightTitle?: string | JSX.Element;
  size?: BtnSize;
  leftSize?: number;
  rightSize?: number;
  btnGap?: number;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  alignButton?: 'column' | 'row';
};

export type TwoButtonProps = Props;

const TwoButton = ({
  leftType = 'tertiary',
  leftonClick,
  leftTitle = '아니요',
  rightType = 'primary',
  rightonClick,
  rightTitle = '예',
  size = 'lg',
  leftSize = 1,
  rightSize = 1,
  btnGap = 8,
  leftDisabled = false,
  rightDisabled = false,
  alignButton = 'row',
}: Props) => {
  let leftStyle;
  if (alignButton === 'column') {
    leftSize = 1;
    rightSize = 1;
    leftStyle = { flex: leftSize, marginBottom: btnGap };
  } else {
    leftStyle = { flex: leftSize, marginRight: btnGap };
  }
  return (
    <S.TwoButtonContainer $direction={alignButton}>
      <div style={leftStyle}>
        <S.Button
          disabled={leftDisabled}
          $btnType={leftType}
          $size={size}
          $width='100%'
          $align='center'
          onClick={leftonClick}
        >
          {leftTitle}
        </S.Button>
      </div>
      <div style={{ flex: rightSize }}>
        <S.Button
          disabled={rightDisabled}
          $btnType={rightType}
          $size={size}
          $width='100%'
          $align='center'
          onClick={rightonClick}
        >
          {rightTitle}
        </S.Button>
      </div>
    </S.TwoButtonContainer>
  );
};

export default TwoButton;
