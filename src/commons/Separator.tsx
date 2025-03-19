import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

const Separator = styled.div<{ $height: number; $mv?: number }>`
  height: ${({ $height }) => pxToRem($height)};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.line2};
  ${({ $mv }) =>
    $mv &&
    css`
      margin: ${pxToRem($mv)} 0;
    `}
`;

export default Separator;
