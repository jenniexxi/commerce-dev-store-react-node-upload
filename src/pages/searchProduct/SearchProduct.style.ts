import styled from 'styled-components';

export const SearchContainer = styled.div``;

export const SearchSection = styled.section`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  position: relative;
`;

export const SearchKeywordView = styled.div`
  position: absolute;
  left: 0;
  top: 5rem;
  width: 100%;
  max-height: 30rem;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;
