import React, { useCallback, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import Modal from './Modal';
import { ModalData } from './Modal.type';
import { hideModal, setModals } from './ModalManager';
import TextModal from './TextModal';

export const ModalContainer: React.FC = () => {
  const [modalList, setModalList] = useState<ModalData[]>([]);

  useEffect(() => {
    setModals(setModalList);
    return () => {
      setModals(null);
    };
  }, []);

  const handleHide = useCallback((id: string) => {
    hideModal(id);
  }, []);

  return createPortal(
    <>
      {modalList.map((modalData) => {
        const modalProps = {
          //   key: modalData.id,
          type: modalData.type,
          isAnimation: modalData.isAnimation,
          showCloseBtn: modalData.showCloseBtn,
          isEnableBackDropHide: modalData.isEnableBackDropHide,
          backDropAnimation: modalData.backDropAnimation,
          closeBtnPosition: modalData.closeBtnPosition,
          radius: modalData.radius,
          backDropColor: modalData.backDropColor,
          onClickBackDrop: modalData.onClickBackDrop,
          onHide: () => handleHide(modalData.id),
        };

        if (modalData.modalType === 'text') {
          return (
            <TextModal
              key={modalData.id}
              {...modalProps}
              title={modalData.title}
              content={modalData.content}
              buttonType={modalData.buttonType}
              rightTitle={modalData.rightTitle}
              rightType={modalData.rightType}
              leftTitle={modalData.leftTitle}
              leftType={modalData.leftType}
              rightonClick={() => {
                modalData.rightonClick && modalData.rightonClick();
                handleHide(modalData.id);
              }}
              leftonClick={() => {
                modalData.leftonClick && modalData.leftonClick();
                handleHide(modalData.id);
              }}
              size={modalData.size}
            />
          );
        }

        if (modalData.modalType === 'custom') {
          return (
            <Modal
              key={modalData.id}
              {...modalProps}
            >
              {modalData.component}
            </Modal>
          );
        }

        return null;
      })}
    </>,
    document.body,
  );
};
