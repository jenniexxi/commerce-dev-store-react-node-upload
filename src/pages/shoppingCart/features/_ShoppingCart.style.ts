import styled from 'styled-components';

import SvgIcon from '@commons/SvgIcon';

export const BrandPayTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const PayTitle = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${(props) => props.theme.colors.text3};
  width: 9.2rem;
  margin-right: 0.8rem;
`;

export const PayAmount = styled.span`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${(props) => props.theme.colors.text3};
`;

export const ProductList = styled.div`
  margin: 2rem 1.6rem;
  background-color: ${(props) => props.theme.colors.background1};
  border-radius: 1.6rem;
`;

export const BrandPerTotal = styled.div`
  padding: 2rem 1.6rem;
`;

export const BrandPayList = styled.ul`
  padding: 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.line2};
  border-top: 1px solid ${(props) => props.theme.colors.line2};
`;

export const BrandPayLi = styled.li`
  display: flex;
  justify-content: space-between;
  & + li {
    margin-top: 0.8rem;
  }
`;

export const BrandPayTitle = styled.span`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${(props) => props.theme.colors.text4};
  width: 9.2rem;
  margin-right: 0.8rem;
`;

export const BrandPayText = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${(props) => props.theme.colors.text3};
`;

export const BrandPayTextWarn = styled(BrandPayText)`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${(props) => props.theme.colors.secondary1};
`;

export const BrandBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  height: 5.6rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.line3};
  label {
    ${({ theme }) => theme.mixins.ellipsis(1)};
  }
  svg {
    transform: rotate(90deg);
  }
`;

export const BoxPie = styled.div`
  display: flex;
`;

export const CustomSvgIcon = styled(SvgIcon)`
  transform: rotate(180deg);
`;

export const CouponModalView = styled.div`
  padding: 1.6rem;

  max-height: calc(80vh - 64px - 96px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const BottomButtonView = styled.div`
  padding: 2rem 1.6rem;
  height: 9.6rem;
  width: 100%;
`;
