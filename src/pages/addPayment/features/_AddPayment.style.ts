import { T } from '@commons';
import styled from 'styled-components';

export const Container = styled.li``;

export const ItemContainer = styled.div`
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.background1};
`;

export const RowView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Border = styled.div`
  height: 1px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.line3};
`;

export const LeftItemText = styled(T.Body1_Normal)``;
