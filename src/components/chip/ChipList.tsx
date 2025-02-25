import { useEffect, useRef, useState } from 'react';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import Chip from './Chip';
import * as S from './ChipList.style';

export type ScrollScreen = {
  isFilter?: boolean;
  onClickFilter?: () => void;
};

export type ChipItem<T> = {
  label: string;
  value: T;
  hasChild?: boolean;
  disabled?: boolean;
};

export type ChipType = 'basic' | 'option';

export type ChipColorType = 'black' | 'gray';

export type TypeProps<T> = {
  chipType: ChipType;
  colorType?: ChipColorType;
  onClickChip: (value: ChipItem<T>) => void;
};

type Props<T> = TypeProps<T> &
  ScrollScreen & {
    item: ChipItem<T>[];
    selectedItem: T[];
    isMultiSelect?: boolean;
  };

const ChipList = <T,>({
  chipType,
  colorType = 'black',
  item,
  selectedItem,
  onClickChip,
  isFilter = false,
  isMultiSelect = false,
  onClickFilter,
}: Props<T>) => {
  const [selectValue, setSelectValue] = useState<T[]>(selectedItem);
  const [filterUI, setFilterUI] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current?.scrollLeft;

      if (scrollLeft > 1) {
        setFilterUI(!filterUI);
      } else {
        setFilterUI(filterUI);
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChipClick = (item: ChipItem<T>) => {
    if (isMultiSelect) {
      // 다중선택
      setSelectValue((prev) => {
        if (prev.includes(item.value)) {
          return prev.filter((i) => i !== item.value);
        } else {
          return [...prev, item.value];
        }
      });
    } else {
      // 단일선택
      setSelectValue([item.value]);
    }

    onClickChip(item);
  };

  return (
    <S.ChipListWrap ref={scrollRef}>
      {isFilter && (
        <S.FilterItemBox $filterUI={filterUI}>
          <S.FilterItem
            $filterUI={filterUI}
            onClick={onClickFilter}
          >
            <SvgIcon
              name={R.svg.icoFilter}
              width={16}
              height={16}
            />
            <span>필터</span>
            {selectValue.length !== 0 && <strong>{selectValue.length}</strong>}
          </S.FilterItem>
        </S.FilterItemBox>
      )}
      {item.map((i) => {
        return (
          <Chip
            key={i.value + ''}
            item={i}
            chipType={chipType}
            colorType={colorType}
            isSelected={selectValue.includes(i.value)}
            onClickChip={handleChipClick}
          />
        );
      })}
    </S.ChipListWrap>
  );
};

export default ChipList;
