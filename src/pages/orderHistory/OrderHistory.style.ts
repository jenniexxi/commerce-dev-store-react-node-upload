import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background2};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OrderHistorySectionContainer = styled.div`
  margin: 2rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.background1};
  border-radius: 1.6rem;
  & + div {
    margin-bottom: 0;
  }
`;

export const OrderHistorySectionHeader = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
  svg {
    transform: rotate(90deg);
  }
`;

export const OrderDate = styled.div`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 0.2rem;
`;

export const OrderNumber = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text5};
`;

export const EmptyDataWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 4rem;
  flex: 1;
  p {
    ${({ theme }) => theme.fonts.body1_normal};
    color: ${({ theme }) => theme.colors.text3};
    margin-top: 0.8rem;
  }
`;


// const showMoreButton = (goods: OrderListGoods) => {
//     switch (goods.itemStatusEnum?.code) {
//       case AllOrderStates.Order.DR:
//       case AllOrderStates.Order.SR:
//       case AllOrderStates.Claim.CC:
//       case AllOrderStates.Claim.RC:
//       case AllOrderStates.Claim.EC:
//       case AllOrderStates.Claim.CA:
//         return null;

//       default:
//         return <S.MoreButton onClick={showBottomModal}>:</S.MoreButton>;
//     }
//   };