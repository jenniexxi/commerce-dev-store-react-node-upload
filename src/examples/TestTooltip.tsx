import { Tooltip } from '@components';

const TestToolTip = () => {
  const toolItems = [{ title: '툴팁 CLICK', content: '툴팁 상세 내용 + 닫기 버튼 있음' }];
  const toolItems02 = [{ title: '툴팁 CLICK', content: '툴팁 상세 내용 + 닫기 버튼 없음' }];
  const toolItems03 = [{ title: '툴팁 CLICK', content: '항시 노출 툴팁' }];

  return (
    <div>
      <Tooltip
        items={toolItems}
        shouldClose={true}
        showCloseButton={true}
        defaultShown={false}
        customStyles={{
          width: '200px',
          arrowStyle: { borderColor: '#e7e7f0' }, // 화살표 style
        }}
      />

      <div style={{ height: 100 }} />

      <Tooltip
        items={toolItems02}
        shouldClose={true}
        showCloseButton={false}
        defaultShown={false}
        customStyles={{
          width: '200px',
          backgroundColor: 'red',
          arrowStyle: { borderColor: 'red', backgroundColor: 'red' }, // 화살표 style
        }}
      />

      <div style={{ height: 100 }} />

      <Tooltip
        items={toolItems03}
        position='top'
        shouldClose={false}
        showCloseButton={false}
        defaultShown={true}
      />
    </div>
  );
};

export default TestToolTip;
