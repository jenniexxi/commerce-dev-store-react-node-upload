import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const ContsNoWrap = styled.div`
  padding: 13rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoDataText = styled.p`
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 0.8rem;
`;
