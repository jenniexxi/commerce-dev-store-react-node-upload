import { CustomModalData, CustomModalShowOptions, ModalData, TextModalData, TextModalShowOptions } from './Modal.type';

let modals: ModalData[] = [];
let setModalsFunction: React.Dispatch<React.SetStateAction<ModalData[]>> | null = null;

const updateModals = (newModals: ModalData[]) => {
  modals = newModals;
  if (setModalsFunction) {
    setModalsFunction(newModals);
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const showModal = {
  text: (title: string | JSX.Element, options?: TextModalShowOptions) => {
    const id = generateId();
    const newModal: TextModalData = {
      id,
      modalType: 'text',
      title,
      type: 'center',
      isAnimation: true,
      showCloseBtn: false,
      isEnableBackDropHide: true,
      backDropAnimation: false,
      radius: 20,
      buttonType: 'single',
      leftonClick: () => hideModal(id),
      rightonClick: () => hideModal(id),
      ...options,
    };

    updateModals([...modals, newModal]);
    return id;
  },

  custom: (component: React.ReactNode, options?: CustomModalShowOptions) => {
    const id = generateId();
    const newModal: CustomModalData = {
      id,
      modalType: 'custom',
      component,
      type: 'center',
      isAnimation: true,
      showCloseBtn: true,
      isEnableBackDropHide: true,
      backDropAnimation: false,
      radius: 20,
      ...options,
    };

    updateModals([...modals, newModal]);
    return id;
  },
};

export const hideModal = (id: string) => {
  updateModals(modals.filter((modal) => modal.id !== id));
};

export const hideAllModals = () => {
  updateModals([]);
};

// For use in ModalContainer
export const setModals = (setter: React.Dispatch<React.SetStateAction<ModalData[]>> | null) => {
  setModalsFunction = setter;
};

// const handleShowTextModal = () => {
//   showModal.text('확인해주세요', {
//     type: 'bottomSheet',
//     buttonType: 'multi',
//     rightTitle: '확인',
//     leftTitle: '취소',
//     rightonClick: () => {
//       // 처리 로직
//     }
//   });
// };

// const handleShowCustomModal = () => {
//   showModal.custom(
//     <YourCustomContent />,
//     {
//       type: 'full',
//       showCloseBtn: false
//     }
//   );
// };
