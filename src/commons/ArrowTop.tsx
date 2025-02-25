import { SVGProps } from 'react';

type ArrowTopProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

const ArrowTop = ({ size = 20, strokeWidth = 1.2, ...props }: ArrowTopProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='ArrowTop'
      width={size}
      height={size}
      fill='none'
      {...props}
    >
      <path
        stroke='#666'
        strokeWidth={strokeWidth}
        d='m4 13 6-6 6 6'
      ></path>
    </svg>
  );
};
export default ArrowTop;
