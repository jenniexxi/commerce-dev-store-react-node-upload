import { Modal } from '@components';
import { CLAIM_TYPE_CODES } from '@type';

import { ClaimList, OrderHistoryDetail } from '@apis/orderApi';

import PopupAdditionalPay from './featured/PopupAdditionalPay';
import PopupDelay from './featured/PopupDelay';
import PopupRefund from './featured/PopupRefund';
import PopupReject from './featured/PopupReject';

export type Popup = 'cancel' | 'return' | 'reject' | 'delay' | 'addtionalPay';

type Props = {
  type: Popup;
  data: OrderHistoryDetail;
  onHide: () => void;
};

const OrderClaimPopup = ({ type, data, onHide }: Props) => {
  const getPopupContent = () => {
    switch (type) {
      case 'cancel':
      case 'return': {
        const claimTypeCode = type === 'cancel' ? CLAIM_TYPE_CODES.Cancel : CLAIM_TYPE_CODES.Return;

        const filteredList = data.data.claimList.filter((item: ClaimList) => {
          return item.claimTypeEnum.code === claimTypeCode;
        });

        return (
          <PopupRefund
            claimDetails={filteredList}
            claimType={type}
          />
        );
      }
      case 'reject': {
        const rejectList = data.data.rejectList;
        return <PopupReject rejectDetails={rejectList} />;
      }
      case 'delay': {
        const delayList = data.data.shippingDelayList;
        return <PopupDelay delayDetails={delayList} />;
      }
      case 'addtionalPay': {
        const addtionalPayList = data.data.addPaymentList;
        return <PopupAdditionalPay addtionalPayDetails={addtionalPayList} />;
      }
    }
  };

  return (
    <Modal
      type='full'
      onHide={onHide}
    >
      {getPopupContent()}
    </Modal>
  );
};

export default OrderClaimPopup;
