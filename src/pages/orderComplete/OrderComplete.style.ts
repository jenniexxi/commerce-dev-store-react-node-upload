import styled from 'styled-components';

export const Container = styled.div``;

export const ContentView = styled.div`
  overflow-y: auto;
  padding-bottom: 9.6rem;

  width: 100%;
`;
export const BottomButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 9.6rem;
  padding: 2rem 1.6rem;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.background1} 50%, rgba(255, 255, 255, 0) 100%);
`;
