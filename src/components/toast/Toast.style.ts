import styled, { keyframes } from 'styled-components';

import { pxToRem } from '@utils/display';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

export const ToastWrapper = styled.div<{ $isClosing: boolean; $bottom: number }>`
  background-color: #151515e6;
  width: 100%;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ $bottom }) => pxToRem($bottom)};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
  border-radius: 2.4rem;
`;

export const ToastContainerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 300;
`;
