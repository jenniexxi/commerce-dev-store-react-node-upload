import styled, { css } from 'styled-components';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  name: string;
  tintColor?: string;
  width?: number;
  height?: number;
};

const SvgIcon = ({ name, tintColor, width, height }: Props) => {
  return (
    <SvgIconStyle
      $name={name}
      $tintColor={tintColor}
      width={width}
      height={height}
    />
  );
};
const SvgIconStyle = styled.i<{ $tintColor?: string; $name: string; width?: number; height?: number }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? `${width}px` : '16px')};
  height: ${({ height }) => (height ? `${height}px` : '16px')};
  background-size: ${({ width, height }) => `${width || 16}px ${height || 16}px`};
  background-repeat: no-repeat;
  flex-shrink: 0;

  ${({ $tintColor, $name }) =>
    $tintColor
      ? css`
          background-color: ${$tintColor};
          -webkit-mask-image: url(${$name});
          mask-image: url(${$name});
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          mask-size: 100% 100%;
        `
      : css`
          background-image: url(${$name});
        `}
`;

export default SvgIcon;
// type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
//   name: string;
//   tintColor?: string;
//   customStyle?: React.CSSProperties;
// };

// const SvgIcon = ({ name, tintColor, customStyle, ...props }: Props) => {
//   return (
//     <img
//       src={name}
//       style={{
//         filter: tintColor ? convertHexToFilter(tintColor) : 'none',
//         ...customStyle,
//       }}
//       {...props}
//       alt=''
//     />
//   );
// };

// // hex 색상값을 CSS filter로 변환하는 함수
// const convertHexToFilter = (hexColor: string) => {
//   // #을 제거하고 RGB 값 추출
//   const hex = hexColor.replace('#', '');
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   // 기준 RGB 값 (CSS 필터는 흰색(255,255,255)을 기준으로 계산)
//   const rBase = 255;
//   const gBase = 255;
//   const bBase = 255;

//   // 필터 값 계산
//   const invert = ((rBase - r) / rBase) * 100; // 색 반전
//   const sepia = (g / gBase) * 100; // 세피아 적용
//   const saturate = (b / bBase) * 100; // 채도
//   const brightness = (r / rBase) * 100; // 밝기
//   const contrast = 100; // 기본 대비값

//   return `
//     invert(${invert.toFixed(1)}%)
//     sepia(${sepia.toFixed(1)}%)
//     saturate(${saturate.toFixed(1)}%)
//     brightness(${brightness.toFixed(1)}%)
//     contrast(${contrast}%)
//   `.trim();
// };

// export default SvgIcon;
