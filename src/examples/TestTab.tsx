import { lazy } from 'react';

import { Tab } from '@components';
import styled from 'styled-components';

// 일반
// import Content1 from './tab/Content1';
// import Content2 from './tab/Content2';
// import Content3 from './tab/Content3';

//lazy
const Tab1Content = lazy(() => import('./tab/Content1'));
const Tab2Content = lazy(() => import('./tab/Content2'));
const Tab3Content = lazy(() => import('./tab/Content3'));

const TestTab = () => {
  //일반
  // const tabsData = [
  //   {
  //     title: "탭 1",
  //     content: Content1,
  //   },
  //   { title: "탭 2", content: Content2 },
  //   { title: "탭 3", content: Content3 },
  // ];
  //lazy
  const tabsData = [
    {
      title: '탭 1',
      content: Tab1Content,
    },
    { title: '탭 2', content: Tab2Content },
    { title: '탭 3', content: Tab3Content },
  ];

  return (
    <TestContainer>
      <Tab
        tabs={tabsData}
        isStickyTab={true}
        height={50}
      />
    </TestContainer>
  );
};

const TestContainer = styled.div``;

export default TestTab;
