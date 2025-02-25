import styled from 'styled-components';

import { pxToRem } from '@utils/display';

const Separator = styled.div<{ $height: number }>`
  height: ${({ $height }) => pxToRem($height)};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.line2};
`;

export default Separator;
