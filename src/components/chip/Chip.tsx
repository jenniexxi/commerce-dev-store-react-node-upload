import { ChipColorType, ChipItem, TypeProps } from './ChipList';
import * as S from './ChipList.style';

type ChildItemProps<T> = TypeProps<T> & {
  item: ChipItem<T>;
  colorType?: ChipColorType;
  isSelected?: boolean;
};

const Chip = <T,>({ chipType, colorType = 'black', item, isSelected = false, onClickChip }: ChildItemProps<T>) => {
  return (
    <S.Chip
      $chipType={chipType}
      $colorType={colorType}
      $isSelected={isSelected}
      $disabled={item.disabled || false}
      $hasChild={item.hasChild || false}
      onClick={() => {
        if (item.disabled) return;
        onClickChip(item);
      }}
    >
      {item.label}
    </S.Chip>
  );
};

export default Chip;
