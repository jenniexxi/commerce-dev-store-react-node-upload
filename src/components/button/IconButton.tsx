import SvgIcon from '@commons/SvgIcon';

import * as S from './Button.style';

type Props = {
  img: string;
  btnSize?: number;
  imgSize?: number;
  tintColor?: string;
  onClick?: () => void;
  className?: string;
};
const IconButton = ({ img, btnSize = 24, imgSize = 24, tintColor, onClick, className }: Props) => {
  return (
    <S.IconButton
      $size={btnSize}
      onClick={onClick}
      className={className}
    >
      <SvgIcon
        name={img}
        tintColor={tintColor}
        width={imgSize}
        height={imgSize}
      />
    </S.IconButton>
  );
};

export default IconButton;
