import R from '@utils/resourceMapper';

import SvgIcon from './SvgIcon';

export type GradeName = 'S' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
type Props = {
  gradeName: GradeName;
};

const GradeBadge = ({ gradeName }: Props) => {
  switch (gradeName) {
    case 'R1':
      return (
        <SvgIcon
          name={R.svg.icoBadgeR1}
          width={16}
          height={16}
        />
      );
    case 'R2':
      return (
        <SvgIcon
          name={R.svg.icoBadgeR2}
          width={16}
          height={16}
        />
      );
    case 'R3':
      return (
        <SvgIcon
          name={R.svg.icoBadgeR3}
          width={16}
          height={16}
        />
      );
    case 'R4':
      return (
        <SvgIcon
          name={R.svg.icoBadgeR4}
          width={16}
          height={16}
        />
      );
    case 'R5':
      return (
        <SvgIcon
          name={R.svg.icoBadgeR5}
          width={16}
          height={16}
        />
      );
    default:
      return (
        <SvgIcon
          name={R.svg.icoBadgeS}
          width={16}
          height={16}
        />
      );
  }
};

export default GradeBadge;
