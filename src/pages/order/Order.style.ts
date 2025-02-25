import styled from 'styled-components';

export const OrderContainer = styled.div``;

export const OrderAccTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p:first-child {
    flex: 1;
    flex-shrink: 0;
  }
`;
export const OrderDescText = styled.div`
  display: flex;

  align-items: center;
  margin-right: 0.8rem;
  width: 40%;
  p:first-child {
    overflow: hidden;
    ${({ theme }) => theme.mixins.ellipsis(1)}
  }
`;
