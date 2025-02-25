import React, { Suspense, useEffect, useState } from 'react';

import { T } from '@commons';

import R from '@utils/resourceMapper';

import Separator from '@commons/Separator';
import SvgIcon from '@commons/SvgIcon';

import * as S from './Accordion.style';

type AccordionItem = {
  title: string | JSX.Element;
  content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIndex?: number | number[];
  isGroup?: boolean;
  isOpenAll?: boolean;
};

const Accordion = ({ items, defaultOpenIndex = -1, isGroup = true, isOpenAll = false }: AccordionProps) => {
  const initialIndexes = Array.isArray(defaultOpenIndex)
    ? isGroup
      ? [defaultOpenIndex[0]]
      : defaultOpenIndex
    : [defaultOpenIndex];

  const [activeIndexes, setActiveIndexes] = useState<number[]>(initialIndexes);

  useEffect(() => {
    if (isOpenAll) {
      setActiveIndexes(items.map((_, index) => index));
    }
  }, [isOpenAll, items]);

  const handleClick = (index: number) => {
    if (isGroup) {
      setActiveIndexes([activeIndexes.includes(index) ? -1 : index]);
    } else {
      if (activeIndexes.includes(index)) {
        setActiveIndexes(activeIndexes.filter((i) => i !== index));
      } else {
        setActiveIndexes([...activeIndexes, index]);
      }
    }
  };

  const renderContent = (content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element) => {
    if (typeof content === 'object' && 'type' in content) {
      return content;
    } else {
      return <Suspense fallback={<div>Loading...</div>}>{React.createElement(content)}</Suspense>;
    }
  };

  return (
    <>
      {items.map((item, index) => (
        <>
          <S.Accordion
            key={item.title.toString() + index}
            $active={activeIndexes.includes(index)}
          >
            <S.AccordionTrigger onClick={() => handleClick(index)}>
              {typeof item.title === 'string' ? <T.Headline2B>{item.title}</T.Headline2B> : item.title}

              {activeIndexes.includes(index) ? (
                <SvgIcon
                  name={R.svg.icoChevronUp}
                  width={20}
                  height={20}
                />
              ) : (
                <SvgIcon
                  name={R.svg.icoChevronDown}
                  width={20}
                  height={20}
                />
              )}
            </S.AccordionTrigger>
            {activeIndexes.includes(index) && (
              <S.AccordionTarget>
                <S.AccordionTargetInner>{renderContent(item.content)}</S.AccordionTargetInner>
              </S.AccordionTarget>
            )}
          </S.Accordion>
          <Separator $height={8} />
        </>
      ))}
    </>
  );
};

export default Accordion;
