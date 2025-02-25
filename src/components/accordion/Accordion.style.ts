import styled, { css } from 'styled-components';

export const Accordion = styled.div<{ $active: boolean }>`
  transition: all 0.3s ease;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #ffffff;
    `}
`;

export const AccordionTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.4rem;

  cursor: pointer;
  background-color: #ffffff;
  padding: 0 1.6rem;
`;

export const AccordionTarget = styled.div`
  padding: 0 1.6rem;
`;

export const AccordionTargetInner = styled.div`
  font-size: 14px;
  line-height: 1.3;
`;
