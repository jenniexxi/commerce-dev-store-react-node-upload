import { useState } from 'react';

import { Checkbox, Togglebox, TwoButton } from '@components';

// Togglebox 불러오기

type CheckboxItem = {
  id: string;
  value: string;
  checkboxGroup?: string;
};

const TestCheckbox = () => {
  const checkboxItems: CheckboxItem[] = [
    { id: 'checkbox1', value: '그룹1 - 아이템 1', checkboxGroup: 'group1' },
    { id: 'checkbox2', value: '그룹1 - 아이템 2', checkboxGroup: 'group1' },
    { id: 'checkbox3', value: '개별 아이템' }, // 개별 아이템
    { id: 'toggle', value: '토글 아이템' }, // 토글 아이템
  ];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(checkboxItems.length).fill(false));

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (index: number, checked: boolean) => {
    setCheckedItems((prevState) => {
      const updatedItems = [...prevState];
      updatedItems[index] = checked;
      return updatedItems;
    });
  };

  // 그룹 전체 선택 또는 해제 핸들러
  const handleSelectAll = (group: string, checked: boolean) => {
    setCheckedItems((prevState) => {
      const updatedItems = [...prevState];
      checkboxItems.forEach((item, index) => {
        if (item.checkboxGroup === group) {
          updatedItems[index] = checked;
        }
      });
      return updatedItems;
    });
  };

  return (
    <div>
      <TwoButton
        leftTitle={'그룹 셀렉트 전체 선택'}
        rightTitle={'그룹 셀렉트 전체 해지'}
        leftSize={5}
        rightSize={5}
        btnGap={20}
        leftType='secondary'
        rightType='tertiary'
        size='lg'
        leftonClick={() => handleSelectAll('group1', true)}
        rightonClick={() => handleSelectAll('group1', false)}
      />
      <div style={{ height: 10 }} />
      {checkboxItems.map((item, index) => {
        if (item.id === 'toggle') {
          return (
            <Togglebox
              key={item.id}
              id={item.id}
              value={item.value}
              name={item.id}
              checked={checkedItems[index]}
              onChange={(checked) => handleCheckboxChange(index, checked)}
            />
          );
        }
        return (
          <Checkbox
            key={item.id}
            id={item.id}
            value={item.value}
            name={item.checkboxGroup || item.id}
            checked={checkedItems[index]}
            onChange={(checked) => handleCheckboxChange(index, checked)}
          />
        );
      })}
    </div>
  );
};

export default TestCheckbox;
