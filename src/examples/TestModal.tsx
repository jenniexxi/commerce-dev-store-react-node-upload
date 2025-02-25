import styled from 'styled-components';

import { ModalTypes } from '@components/modal/Modal.type';
import { showModal } from '@components/modal/ModalManager';

const TestModal = () => {
  const handleShowModal = (type: ModalTypes) => {
    showModal.custom(
      <div
        onClick={() => handleShowNestedModal()}
        style={{ padding: '20px', cursor: 'pointer' }}
      >
        button
      </div>,
      {
        type: type,
        isEnableBackDropHide: true,
      },
    );
  };

  const handleShowNestedModal = () => {
    showModal.custom(<div style={{ padding: '20px' }}>Nested Modal Content</div>, {
      type: 'center',
      isEnableBackDropHide: true,
    });
  };

  const handleShowTextModal = (title: string) => {
    showModal.text(title, { showCloseBtn: false });
  };

  return (
    <TestContainer>
      <Button onClick={() => handleShowModal('center')}>Center Modal</Button>
      <Button onClick={() => handleShowModal('topSheet')}>TopSheet</Button>
      <Button onClick={() => handleShowModal('bottomSheet')}>BottomSheet</Button>
      <Button onClick={() => handleShowModal('full')}>full</Button>
      <Button onClick={() => handleShowTextModal('title 입니다,')}>TextModal</Button>
    </TestContainer>
  );
};

const TestContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled.button`
  width: 300px;
  height: 80px;
  border: 1px solid red;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ffeeee;
  }
`;

export default TestModal;
