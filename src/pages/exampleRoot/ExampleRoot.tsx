import { VirtualScroll } from '@components';

import { addToast } from '@components/toast/Toast';

import { useHeader } from '@hooks/useHeader';

import * as S from './ExampleRoot.style';

type ExampleLink = {
  title: string;
  url: string;
};

const ExampleRoot = () => {
  useHeader('예제 모음');

  const links: ExampleLink[] = [
    {
      title: '가상 스크롤 예제',
      url: '/examples/VirtualScrollEX',
    },
    {
      title: 'Horizontal Scroll 예제',
      url: '/examples/testHorizontalScroll',
    },
    {
      title: 'selector 예제',
      url: '/examples/testSelector',
    },
    {
      title: 'swiper 예제',
      url: '/examples/testSwiper',
    },
    {
      title: 'counter 예제',
      url: '/examples/testCounter',
    },
    {
      title: 'Modal 예제',
      url: '/examples/testmodal',
    },
    {
      title: 'Tab 예제',
      url: '/examples/testtab',
    },
    {
      title: 'Input 예제',
      url: '/examples/testinput',
    },
    {
      title: 'Accordion 예제',
      url: '/examples/testAccordion',
    },
    {
      title: 'Radio 예제',
      url: '/examples/testRadio',
    },
    {
      title: 'Checkbox 예제',
      url: '/examples/testCheckbox',
    },
    {
      title: 'Tooltip 예제',
      url: '/examples/testTooltip',
    },
    {
      title: 'Button 예제',
      url: '/examples/testButton',
    },
    // {
    // 여기에 다른 예제들을 추가할 수 있습니다.
    // },
  ];

  const renderItem = (data: ExampleLink) => {
    return (
      <S.StyledLink to={data.url}>
        {data.title} ({data.url})
      </S.StyledLink>
    );
  };

  const showToast = () => {
    addToast(
      'This is a toast message!This is a toast message!This is a toast message!This is a toast message!This is a toast message!',
    );
  };

  return (
    <S.MainContainer>
      <S.Title onClick={showToast}>예제 모음</S.Title>
      <VirtualScroll
        data={links}
        renderItem={renderItem}
        overscan={3}
      />
    </S.MainContainer>
  );
};

export default ExampleRoot;
