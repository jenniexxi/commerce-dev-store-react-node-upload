import styled from 'styled-components';

import { fonts } from '@styles/theme';

import R from '@utils/resourceMapper';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 2rem;
  height: 2rem;

  background-image: url(${R.svg.icoCheckCircleFillOff});
  background-size: 100% 100%;
  &:checked {
    background-image: url(${R.svg.icoCheckCircleFillOn});
  }
  & + label {
    margin-left: 8px;
  }
  &:disabled,
  &[disabled] {
    background-image: url(${R.svg.icoCheckCircleDisabled});
  }
`;

export const CheckboxLabel = styled.label<{ $fontType: keyof typeof fonts }>`
  ${({ $fontType, theme }) => fonts[$fontType] || theme.fonts.body1_normal};
  color: ${(props) => props.theme.colors.text3};
`;
