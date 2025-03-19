import styled, { css } from 'styled-components';

import { fonts } from '@styles/theme';

import R from '@utils/resourceMapper';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input<{ $chkType: 'fill' | 'outline' }>`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 1.7rem;
  height: 1.7rem;
  background-image: url(${R.svg.icoCheckCircleFillOff});
  background-size: 100% 100%;
  &:checked {
    background-image: url(${R.svg.icoCheckCircleFillOn});
  }
  & + label {
    margin-left: 0.6rem;
  }
  &:disabled,
  &[disabled] {
    background-image: url(${R.svg.icoCheckCircleDisabled});
  }
  ${({ $chkType }) =>
    $chkType === 'outline' &&
    css`
      width: 2.4rem;
      height: 2.4rem;
      background-image: url(${R.svg.icoCheckOff});
      background-size: 100% 100%;
      &:checked {
        background-image: url(${R.svg.icoCheckOn});
      }
      &:disabled,
      &[disabled] {
        background-image: url(${R.svg.icoCheckOff});
      }
    `}
`;

export const CheckboxLabel = styled.label<{ $fontType: keyof typeof fonts }>`
  ${({ $fontType }) => fonts[$fontType]};
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${(props) => props.theme.colors.text4};
`;
