import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const ProdListContainer = styled.ul`
  overflow: hidden;
  /* display: flex; */
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  position: relative;
`;
export const ProdListItem = styled.li`
  position: relative;
  width: 50%;

  margin-bottom: 3rem;
  border: 0 !important;
  padding-bottom: 0;
  &:nth-child(odd) {
    width: calc(50% - 5px);
    margin-right: 5px;
  }
  &:nth-child(even) {
    width: calc(50% - 5px);
    margin-left: 5px;
  }
`;
export const ProdListItemLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;
export const ProdListThumbBox = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e7e7f0;
  width: 100%;
  height: auto;
  min-width: auto;
  min-height: auto;
  padding-top: calc(100% - 2px);
`;
export const ProdListThumb = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;
export const ProdListInfoName = styled.div`
  margin-top: 1rem;
`;
export const ProdListBradnName = styled.p`
  display: block;
  font-size: 1.2rem;
  color: #8d94a0;
  font-weight: 500;
`;
export const ProdListDisplayName = styled.p`
  display: block;
  margin-top: 0.5rem;
  color: #505866;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.3;
  word-break: break-all;
`;
export const ProdListInfoPrice = styled.div`
  margin-top: 1rem;
`;
export const ProdListSaleRate = styled.span`
  margin-right: 0.4rem;
  color: #ff34a2;
  font-size: 1.6rem;
  font-weight: 700;
`;
export const ProdListPaymentPrice = styled.span`
  margin-right: 4px;
  color: #000;
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: -0.33px;
`;
export const ProdListRecommendPrice = styled.span`
  color: var(--grey600);
  font-weight: 400;
  font-size: 13px;
  line-height: 16.9px;
  text-decoration: line-through;
  letter-spacing: -0.33px;
`;
