import { lazy } from 'react';

import { Accordion } from '@components';

const AccordionContent1 = lazy(() => import('./accordion/Content1'));
const AccordionContent2 = lazy(() => import('./accordion/Content2'));
const AccordionContent3 = lazy(() => import('./accordion/Content3'));

const TestAccordion = () => {
  const accordionItems = [
    {
      title: '첫 번째 아코디언',
      content: AccordionContent1,
    },
    {
      title: '두 번째 아코디언',
      content: AccordionContent2,
    },
    {
      title: '세 번째 아코디언',
      content: AccordionContent3,
    },
  ];

  return (
    <div>
      <h2>Accordion Group</h2>
      <Accordion
        items={accordionItems}
        isGroup={true}
        defaultOpenIndex={0}
      />

      <h2>Accordion 전체 열기</h2>
      <Accordion
        items={accordionItems}
        isGroup={false}
        isOpenAll={true}
      />

      <h2>Accordion</h2>
      <Accordion
        items={accordionItems}
        isGroup={false}
      />
    </div>
  );
};

export default TestAccordion;
