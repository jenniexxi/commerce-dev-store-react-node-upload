import { Button, TwoButton } from '@components';

const TestButton = () => {
  return (
    <div style={{ padding: 10 }}>
      <Button title='test' />
      <div style={{ height: 10 }} />
      <Button
        title={<span>hello</span>}
        btnType='tertiary'
        size='md'
      />

      <div style={{ height: 10 }} />
      <TwoButton
        leftTitle={'111'}
        rightTitle={'222'}
        leftSize={3}
        rightSize={7}
        btnGap={20}
        leftType='secondary'
        rightType='tertiary'
        size='xsm'
      />
    </div>
  );
};
export default TestButton;
