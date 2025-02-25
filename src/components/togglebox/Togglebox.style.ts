import styled from 'styled-components';

export const ToggleboxContainer = styled.div`
  display: flex;
`;

export const ToggleboxInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 4.8rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.colors.status_disabled};
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0.3rem;
    right: auto;
    top: 50%;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.background1};
    transform: translate(0, -50%);
    transition: 0.25s;
  }
  &:checked {
    background-color: ${(props) => props.theme.colors.icon2};
    &:before {
      transform: translate(24px, -50%);
    }
  }
`;

export const ToggleboxLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
