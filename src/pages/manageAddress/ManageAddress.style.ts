import styled from 'styled-components';

export const Container = styled.div``;

export const DeliveryRequestWrap = styled.section`
  padding: 0 1.6rem 2rem;
`;
export const DeliveryRequestTitleWrap = styled.div`
  padding: 2rem 1.6rem 0.4rem;
`;
export const DeliveryInputWrap = styled.div`
  width: 100%;
  height: 16rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.2rem;
  margin-top: 0.8rem;
  padding: 1.6rem 1.6rem 3rem;
  overflow: hidden;
  p {
    text-align: right;
    span {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.line3};
    }
  }
`;
export const DeliveryRequestInput = styled.textarea`
  width: 100%;
  height: 11.4rem;
  border: none;
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.fonts.body1_normal};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.text6};
  }
`;
export const AddAddrWrap = styled.section`
  padding: 0 1.6rem 2rem;
`;
export const AddrListWrap = styled.div`
  padding: 2rem 1.6rem;
`;

export const NonContsWrapper = styled.main``;

export const TopContsSec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30.8rem;
  background-color: ${(props) => props.theme.colors.background1};
  padding: 4.75rem 1.6rem 0.8rem;
  position: relative;
`;
