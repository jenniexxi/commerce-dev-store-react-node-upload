import styled from 'styled-components';

export const OrderContainer = styled.div``;

export const OrderAccTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-right: 0.8rem;
  p:first-child {
    flex: 1;
    flex-shrink: 0;
  }
`;
export const OrderDescText = styled.div`
  display: flex;
  align-items: center;

  p:first-child {
    overflow: hidden;
    ${({ theme }) => theme.mixins.ellipsis(1)}
  }
  p:last-child {
    margin-left: 0.8rem;
  }
`;

export const PaymentMethod = styled.div`
  padding: 0 1.6rem;

  .__hectofinancial_payment_wrapper:not(:first-child) {
    height: 0 !important;
  }
`;
