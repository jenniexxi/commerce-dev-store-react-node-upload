import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const MyPageSection = styled.section`
  margin-top: 1.6rem;
  padding: 0 1.6rem;
`;

export const SectionTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
  padding: 1rem 0;
  font-size: 1.4rem;
`;

export const SectionButton = styled(Link)`
  display: flex;
  font-size: 1.4rem;
  position: relative;
  padding: 1.4rem 2rem 1.4rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey100};
  width: 100%;
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.9rem;
  text-align: left;
`;
export const OrderSeqList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  li:firsnt-child {
    margin-left: 0;
  }
`;

export const DeliveryItem = styled.li`
  font-size: 2rem;
  text-align: center;
  span {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.grey400};
  }
`;

export const OrderClaimList = styled.ul`
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.grey50};
  padding: 1.25rem 0;
  border-radius: 0.2rem;

  li {
    display: flex;
    align-items: center;
    font-size: 1.2rem;

    span {
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
  }
`;

export const MyPageMenuSection = styled.section``;
