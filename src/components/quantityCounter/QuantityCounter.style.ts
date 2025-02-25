import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const QuntitiyBtn = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const QuntityInput = styled.input`
  margin: 0 0.4rem;
  height: 3.2rem;
  width: auto;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
  width: 3.2rem;

  ${({ theme }) => theme.fonts.body2_normalb}
`;
