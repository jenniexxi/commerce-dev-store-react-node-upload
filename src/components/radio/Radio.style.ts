import styled from 'styled-components';

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
    margin-left: 8px;
  }
`;

export const RadioLabel = styled.label`
  ${({ theme }) => theme.fonts.caption1_normal}
  line-height: 1;
  vertical-align: middle;
`;
