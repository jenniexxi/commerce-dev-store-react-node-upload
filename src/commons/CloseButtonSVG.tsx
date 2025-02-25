import { SVGProps } from 'react';

type CloseButtonProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
  color?: string;
};

const CloseButtonSVG = ({ size = 32, strokeWidth = 2, color = '#000000', ...props }: CloseButtonProps) => {
  const center = size / 2;
  const padding = 4;
  const diagonalLength = Math.sqrt(2) * (center - 2 * padding);
  const halfDiagonal = diagonalLength / 2;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='Closed'
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      <g
        stroke={color}
        strokeLinecap='round'
        strokeWidth={strokeWidth}
        fill='none'
      >
        <line
          x1={center - halfDiagonal}
          y1={center - halfDiagonal}
          x2={center + halfDiagonal}
          y2={center + halfDiagonal}
        />
        <line
          x1={center - halfDiagonal}
          y1={center + halfDiagonal}
          x2={center + halfDiagonal}
          y2={center - halfDiagonal}
        />
      </g>
    </svg>
  );
};
export default CloseButtonSVG;
