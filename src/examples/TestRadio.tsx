import { useState } from 'react';

import { Radio } from '@components';

import { RadioItem } from '@components/radio/Radio';

const TestRadio = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const radioItems: RadioItem<string>[] = [
    { id: 'radio1', label: 'Option 1', value: 'Option 1', radioGroup: 'group1' },
    { id: 'radio2', label: 'Option 2', value: 'Option 2', radioGroup: 'group1' },
    { id: 'radio3', label: 'Option 3', value: 'Option 3', radioGroup: 'group1' },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      {radioItems.map((item) => (
        <Radio
          key={item.id}
          id={item.id}
          value={item.value}
          label={item.label}
          name={item.radioGroup}
          selectedValue={selectedValue}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default TestRadio;
