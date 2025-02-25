import { Link } from 'react-router-dom';

import styled from 'styled-components';

//#region  filter
export const FilterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;
//#endregion
export const ClaimHistorySectionContainer = styled.div`
  margin-bottom: 2rem;
`;
export const ClaimHistorySectionHeader = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.6rem;
  background-color: ${({ theme }) => theme.colors.grey80};
  font-size: 1.4rem;
  padding: 0 1rem;
  div > span {
    display: block;
  }
  svg {
    transform: rotate(90deg);
  }
`;

export const ClaimHistorySectionGoodsContainer = styled.div``;
export const ClaimHistorySectionGoodsItem = styled.div`
  margin-bottom: 1rem;
`;

export const ProductPart = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;

  img {
    width: 7.2rem;
    height: 7.2rem;
    border: 1px solid ${(props) => props.theme.colors.grey400};
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`;

export const TextBox = styled.div`
  flex: 1;
  margin-right: 2rem;
  div {
    font-size: 1.4rem;
    & + div {
      margin-top: 0.6rem;
    }
  }
`;

export const BrandName = styled.div`
  font-weight: bold;
`;

export const TextPrice = styled.div``;

export const Price = styled.span`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const AddGoodsContainer = styled.div`
  position: relative;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.grey50};
`;
export const AddBedge = styled.div`
  width: 6rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey500};
  text-align: center;
  background: ${(props) => props.theme.colors.white};
  margin-bottom: 1rem;
`;
