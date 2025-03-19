import styled, { css } from 'styled-components';

import { fonts } from '@styles/theme';

import R from '@utils/resourceMapper';

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${R.svg.icoRadioFillOff});
  background-size: 100% 100%;
  background-position: center center;
  &:checked {
    background-image: url(${R.svg.icoRadioFillOn});
  }
  & + label {
    margin-left: 4px;
  }
`;

export const RadioLabel = styled.label<{ $fontType: keyof typeof fonts; $selected: boolean }>`
  ${({ $fontType }) => fonts[$fontType]};

  vertical-align: middle;
  ${({ $selected, theme }) =>
    $selected
      ? css`
          color: ${theme.colors.text3};
        `
      : css`
          color: ${theme.colors.text4};
        `}
`;
