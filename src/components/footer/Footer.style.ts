import styled from 'styled-components';

import SvgIcon from '@commons/SvgIcon';

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 3.2rem 1.6rem 3rem;
  margin-top: auto;
  p {
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text4};
    margin-top: 0.8rem;
  }
`;

export const FooterTitle = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text4};
`;

export const SvgIconArrow = styled(SvgIcon)`
  margin-left: 0.4rem;
`;

export const FooterWrap = styled.div`
  &:first-child {
    margin-bottom: 3.2rem;
  }
`;

export const FooterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  &:nth-child(2) {
    margin: 3.2rem auto 1.2rem;
  }
  li {
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};
    margin-right: 1.5rem;
    a {
      ${({ theme }) => theme.fonts.caption1_normal};
      color: ${({ theme }) => theme.colors.text4};
    }
  }
`;
