import styled, { css } from 'styled-components';

export const AddrModalContainer = styled.div`
  padding: 0 1.6rem;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
`;

export const ChangeAddrView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  p span {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;
export const DeliveryPlaceName = styled.div`
  margin-top: 2.4rem;
`;

export const PlaceNameBtnContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-right: 0.8rem;
  }
`;

export const PlaceNameBtn = styled.button<{ $isSelected: boolean }>`
  height: 3.4rem;
  padding: 0 1.2rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $isSelected, theme }) =>
    $isSelected
      ? css`
          background-color: ${theme.colors.text3};
          border: 1px solid ${theme.colors.text3};
          p {
            color: ${theme.colors.text1};
          }
        `
      : css`
          border: 1px solid ${theme.colors.line3};
          background-color: ${theme.colors.background1};
          p {
            color: ${theme.colors.text3};
          }
        `}
  i {
    margin-right: 0.4rem;
  }
`;
export const ButtonWrapper = styled.div`
  padding: 2rem 1.6rem;
  margin-top: auto;
`;

export const Step3ReceiverName = styled.div`
  margin-bottom: 2.4rem;
  p span {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;
