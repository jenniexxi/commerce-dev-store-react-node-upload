import { useState } from 'react';

import { Selector } from '@components';

const TestSelector = () => {
  const [selectedUser, setSelectedUser] = useState<number>();

  const onChangeUser = (value: number) => {
    setSelectedUser(value);
  };

  const data = [
    { label: 'User 1', value: 1, disabled: true },
    { label: 'User 2', value: 2 },
    { label: 'User 3', value: 3 },
  ];

  return (
    <Selector<number>
      placeholder='사용자 선택'
      defaultValue={selectedUser}
      options={data || []}
      onChange={onChangeUser}
    />
  );
};

export default TestSelector;
