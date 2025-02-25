import * as S from './Tab.style';

type Props = {
  onSelect: () => void;
  isSelected: boolean;
  label: string;
  isNew?: boolean;
  height: number;
  itemWidth?: number;
  isFixedWidth: boolean;
  isBottomLineStretch: boolean;
};

const TabItem = ({
  onSelect,
  isSelected,
  label,
  isNew,
  height,
  itemWidth,
  isFixedWidth,
  isBottomLineStretch,
}: Props) => {
  return (
    <S.TabItem
      onClick={onSelect}
      $isFixedWidth={isFixedWidth}
      $width={itemWidth}
      $height={height}
    >
      <S.TabItemLabel
        $isSelected={isSelected}
        $isBottomLineStretch={isBottomLineStretch}
        className={isSelected ? 'isSelected' : ''}
      >
        <span>
          {label}
          {isNew !== undefined && isNew ? <S.NewIcon /> : <></>}
        </span>
        <S.SelectBorder
          $isSelected={isSelected}
          className='line'
        />
      </S.TabItemLabel>
    </S.TabItem>
  );
};

export default TabItem;
