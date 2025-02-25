import styled from 'styled-components';

import theme from '@styles/theme';

export const FormContainer = styled.form`
  margin: 0 auto;
  padding: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 3.2rem;

  &:last-of-type {
    margin-bottom: 4rem;
  }

  input {
    margin-bottom: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #191919;
`;

export const Required = styled.span`
  color: #fa5252;
  margin-left: 0.4rem;
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 1.2rem;

  > *:first-child {
    width: 200px;
  }

  > button {
    flex-shrink: 0;
    height: 48px;
    width: 100px;
  }
`;

export const CheckboxWrapper = styled.div`
  margin: 2.4rem 0;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  button {
    min-width: 160px;
    height: 52px;
  }
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    text-align: center;
  }
`;

//#region AddressItem

export const AddressItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.6rem;
  display: flex;
  padding: 2rem 1.6rem;
  overflow: hidden;
  margin-bottom: 0.8rem;
`;

export const AddressInfo = styled.div`
  width: 100%;
  margin-left: 0.8rem;
`;

export const AddressName = styled.div`
  display: flex;
  div {
    width: 5.5rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: ${({ theme }) => theme.colors.background2};
  }
`;

export const ControlBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    width: 0.1rem;
    height: 1rem;
    background-color: ${({ theme }) => theme.colors.line3};
    display: block;
    margin: 0 0.8rem;
  }
`;

export const ControlBtn = styled.button``;
//#endregion
