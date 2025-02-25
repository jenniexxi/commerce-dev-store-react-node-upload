import styled, { css } from 'styled-components';

import R from '@utils/resourceMapper';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  iconImage?: string;
}

export const TooltipIcon = styled.i<Props>`
  display: flex;
  align-items: center;
  background-color: ${({ color }) => color || '#000'};
  width: ${({ width }) => (width ? `${width}px` : '16px')};
  height: ${({ height }) => (height ? `${height}px` : '16px')};
  -webkit-mask-image: ${({ iconImage }) => css`url('${iconImage || R.svg.icoTooltip}')`};
  mask-image: ${({ iconImage }) => css`url('${iconImage || R.svg.icoTooltip}')`};
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: ${({ width, height }) => `${width || 16}px ${height || 16}px`};
`;

export default TooltipIcon;
