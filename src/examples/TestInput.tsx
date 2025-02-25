import { ChangeEvent, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '@components';
import { MobileInput } from '@components';
import styled from 'styled-components';

const TestInput = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    setValue: setFromValue,
    formState: { errors },
    watch,
  } = useForm<{ name: string }>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    if (newValue.length < 3) {
      setError('3글자 이상 입력해주세요.');
    } else {
      setError('');
    }
  };

  const onSubmit = (data: any) => {
    console.log('data', data);
  };

  return (
    <TestContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          useForm={true}
          register={register}
          watch={watch}
          errors={errors}
          resetValue={() => setFromValue('name', '')}
          rules={{ required: '이메일은 필수입니다' }}
          placeholder='이메일을 입력하세요'
        />
        <button
          type='submit'
          style={{ width: 100, height: 30 }}
        >
          test
        </button>
      </form>
      <Input
        name='name'
        value={value}
        onChange={handleChange}
        resetValue={() => setValue('')}
        error={error}
        placeholder='이름을 입력하세요'
      />
      <div style={{ height: 200 }} />
      <MobileInput onChangeValue={(value) => console.log(value)} />
    </TestContainer>
  );
};

const TestContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default TestInput;
