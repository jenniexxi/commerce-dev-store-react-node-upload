import styled from 'styled-components';

import { HEADER_HEIGHT } from '@components/header/Header.style';

import { pxToRem } from '@utils/display';

export const Container = styled.div`
  position: relative;
`;
export const Header = styled.header`
  height: ${pxToRem(HEADER_HEIGHT)};
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
`;

export const ListView = styled.ul``;
