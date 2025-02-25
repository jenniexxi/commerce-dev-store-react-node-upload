import { useState } from 'react';

import IconButton from '@components/button/IconButton';

type Props = {
  onImg: string;
  offImg: string;
  btnSize?: number;
  imgSize?: number;
  onTintColor?: string;
  offTintColor?: string;
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  className?: string;
};

const ToggleIconButton = ({ onImg, offImg, onTintColor, offTintColor, isToggled, onToggle, className }: Props) => {
  const [internalToggled, setInternalToggled] = useState(false);

  const toggledState = isToggled ?? internalToggled;

  const handleClick = () => {
    const newState = !toggledState;
    if (isToggled === undefined) {
      setInternalToggled(newState);
    }
    onToggle?.(newState);
  };

  return (
    <IconButton
      img={toggledState ? onImg : offImg}
      tintColor={toggledState ? onTintColor : offTintColor}
      onClick={handleClick}
      className={className}
    />
  );
};

export default ToggleIconButton;
