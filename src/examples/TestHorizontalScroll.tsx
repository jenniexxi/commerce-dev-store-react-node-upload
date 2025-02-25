import { HorizontalScroll } from '@components';

import { useHeader } from '@hooks/useHeader';

const TestHorizontalScroll = () => {
  useHeader('', { showHeader: false });
  const itemList = [
    { label: '아이템1' },
    { label: '아이템2' },
    { label: '아이템3' },
    { label: '아이템4' },
    { label: '아이템5' },
    { label: '아이템6' },
    { label: '아이템7' },
  ];

  return (
    <div>
      <HorizontalScroll<{ label: string }>
        itemList={itemList}
        width={84}
        height={58}
        marginRight={10}
        smoothScroll={true}
        renderLabelString={(item) => item.label}
      />
    </div>
  );
};

export default TestHorizontalScroll;
