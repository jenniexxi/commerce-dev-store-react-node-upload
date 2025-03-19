import { ButtonHTMLAttributes } from 'react';

import { colors, fonts } from '@styles/theme';

import * as S from './Button.style';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 버튼에 표시될 텍스트 또는 엘리먼트 */
  title: string | JSX.Element;
  /** 버튼의 너비 (px) */
  width?: number | '100%';
  /** 우측 아이콘 */
  rightIcon?: JSX.Element;
  fontType?: keyof typeof fonts;
  color?: string;
};

/**
 * 공통으로 사용되는 버튼 컴포넌트
 * @param {() => void} onClick - 클릭 이벤트 핸들러
 * @param {string | JSX.Element} title - 버튼에 표시될 텍스트 또는 엘리먼트
 * @param {number} width - 버튼의 너비 (px)
 * @param {JSX.Element} rightIcon - 우측 아이콘()
 * @returns {JSX.Element} 스타일이 적용된 버튼 엘리먼트
 */
const TextButton = ({
  title,
  width,
  rightIcon,
  className,
  fontType = 'body3_normalm',
  color = colors.text6,
  ...props
}: Props) => {
  return (
    <S.TextButton
      className={className}
      $color={color}
      $fontType={fontType}
      {...props}
    >
      {title}
      {rightIcon && (
        <>
          <S.IconDivider />
          {rightIcon}
        </>
      )}
    </S.TextButton>
  );
};

export default TextButton;
