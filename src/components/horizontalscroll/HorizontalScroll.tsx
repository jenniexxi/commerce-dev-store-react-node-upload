import { useRef, useState } from 'react';

import * as S from './HorizontalScroll.style';

type Props<T> = {
  itemList: T[];
  width?: number;
  height?: number;
  marginRight?: number;
  smoothScroll?: boolean;
  renderLabelString: (item: T) => string;
};

const HorizontalScroll = <T,>({ itemList, width, height, marginRight, smoothScroll, renderLabelString }: Props<T>) => {
  const [selectedCurrent, setSelectedCurrent] = useState(0);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const clickActive = (index: number) => {
    setSelectedCurrent(index);
    scrollToItem(index);
  };

  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const item = scrollRef.current.children[index];
      const container = scrollRef.current;
      const containerLeft = container.getBoundingClientRect().left;
      const itemLeft = item.getBoundingClientRect().left;

      container.scrollBy({
        left: itemLeft - containerLeft - 25,
        behavior: smoothScroll ? 'smooth' : 'auto',
      });
    }
  };

  return (
    <S.HorScrollWrap>
      <S.ScrollList ref={scrollRef}>
        {itemList.map((item, index) => {
          return (
            <S.ScrollItem
              key={index}
              $isActive={index === selectedCurrent}
              $width={width}
              $height={height}
              $marginRight={marginRight}
              onClick={() => {
                clickActive(index);
              }}
            >
              <span>{renderLabelString(item)}</span>
            </S.ScrollItem>
          );
        })}
      </S.ScrollList>
    </S.HorScrollWrap>
  );
};

export default HorizontalScroll;
