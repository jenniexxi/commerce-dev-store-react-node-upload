import styled, { css } from 'styled-components';

import { BtnSize } from '@components/button/Button';

import { pxToRem } from '@utils/display';

type InputWrapperProps = {
  error?: string;
};

export const InputWrapper = styled.div<{ $width?: number }>`
  position: relative;
  width: ${({ $width }) => ($width ? pxToRem($width) : '100%')};
  height: auto;
`;

type StyledInputProps = InputWrapperProps & {
  error?: string;
};

export const Input = styled.input<StyledInputProps & { $height: BtnSize; $showResetBtn: boolean }>`
  width: 100%;
  padding: 0 1rem;
  ${({ $showResetBtn }) =>
    $showResetBtn &&
    css`
      padding-right: 3rem;
    `}

  border: 1px solid ${(props) => (props.error ? props.theme.colors.status_danger : props.theme.colors.line3)};
  border-radius: 1.2rem;
  ${({ theme }) => theme.fonts.body1_normal};
  transition: all 0.3s ease;

  ${({ $height }) => {
    switch ($height) {
      case 'md':
        return css`
          height: 4.8rem;
        `;
      case 'sm':
        return css`
          height: 4rem;
        `;
      case 'xsm':
        return css`
          height: 3.2rem;
        `;
      case 'lg':
      default:
        return css`
          height: 5.6rem;
        `;
    }
  }}
  &::placeholder {
    color: ${({ theme }) => theme.colors.text6};
  }
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? props.theme.colors.status_danger : props.theme.colors.text3)};
  }
`;

export const IconBtn = styled.button`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.status_danger};
  font-size: 1.4rem;
  margin-top: 0.5rem;
`;

export const MobileInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    margin: 0 1rem;
  }
`;
