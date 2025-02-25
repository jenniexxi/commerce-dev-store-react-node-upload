import styled from 'styled-components';

export type Size = 'small' | 'medium' | 'large';

export type SizeConfig = {
  width: number;
  height: number;
  sliderSize: number;
  sliderOffset: number;
  sliderMove: number;
};

export type SizesConfig = {
  [key in Size]: SizeConfig;
};

export type StyledProps = {
  $checked: boolean;
  $size: Size;
  disabled?: boolean;
};

export const SIZES: SizesConfig = {
  small: {
    width: 32,
    height: 18,
    sliderSize: 12,
    sliderOffset: 3,
    sliderMove: 14,
  },
  medium: {
    width: 44,
    height: 24,
    sliderSize: 16,
    sliderOffset: 4,
    sliderMove: 20,
  },
  large: {
    width: 56,
    height: 30,
    sliderSize: 22,
    sliderOffset: 4,
    sliderMove: 26,
  },
};

export const SwitchWrapper = styled.button<StyledProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${(props) => SIZES[props.$size].width}px;
  height: ${(props) => SIZES[props.$size].height}px;
  padding: 0;
  border: none;
  border-radius: ${(props) => SIZES[props.$size].height / 2}px;
  background-color: ${(props) => (props.$checked ? '#3B82F6' : '#E5E7EB')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    /* box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); */
  }
`;

export const Slider = styled.span<StyledProps>`
  position: absolute;
  left: ${(props) => SIZES[props.$size].sliderOffset}px;
  width: ${(props) => SIZES[props.$size].sliderSize}px;
  height: ${(props) => SIZES[props.$size].sliderSize}px;
  background-color: white;
  border-radius: 50%;
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); */
  transform: translateX(${(props) => (props.$checked ? `${SIZES[props.$size].sliderMove}px` : '0')});
  transition: transform 0.3s ease-in-out;
`;
