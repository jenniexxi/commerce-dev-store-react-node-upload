import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Checkbox, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AllOrderStates, CLAIM_CANCEL_REQUEST_REASON } from '@type';
import dayjs from 'dayjs';

import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import ClaimPdItemGroup from '@pages/ClaimRequest/features/ClaimPdItemGroup';

import { Code } from '@apis/apiCommonType';
import claimApi, {
  CancelRefundInfoInquiryRequestBody,
  CancelRefundInfoInquiryResp,
  ClaimCancelRequestBody,
} from '@apis/claimApi';
import messages from '@apis/message';
import { OrderRefundAccountResp } from '@apis/orderApi';

import { CustomShippingList } from '../ClaimRequest';
import * as S from '../ClaimRequest.style';
import ClaimAddPay from '../features/ClaimAddPay';
import ClaimReason from '../features/ClaimReason';
import ClaimRefundInfo from '../features/ClaimRefundInfo';
import {
  createCustomShippingList,
  getAllCheckboxCheckedState,
  getRefundOrderItemList,
  updateAllCheckedState,
  updateShippingListItem,
} from '../utils';

type Props = {
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  isCheckboxState: boolean;
  orderItemIdEncrypt?: string[];
  orderRefundAccountInfo?: OrderRefundAccountResp;
};

const CancelOrder = ({
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  isCheckboxState,
  orderItemIdEncrypt,
  orderRefundAccountInfo,
}: Props) => {
  useHeader('상품 취소신청', { showHeader: true, showRightButton: false });
  const navigate = useNavigate();

  const [claimReasonEnum, setClaimReasonEnum] = useState<Code<string>>();
  const [cancelReason, setCancelReason] = useState('');
  const [shippingList, setShippingList] = useState<CustomShippingList[]>([]);
  const [refundInfo, setRefundInfo] = useState<CancelRefundInfoInquiryResp>();
  const [isAllCheckedBox, setIsAllCheckedBox] = useState(false);
  const [errorMessageClaimReason, setErrorMessageClaimReason] = useState('');
  const [errorMessageReason, setErrorMessageReason] = useState('');

  const { data: cancelOrderInfo } = useQuery({
    queryKey: ['CancelOrderInfo', ordersIdEncrypt, orderShippingPriceIdEncrypt],
    queryFn: () =>
      claimApi.claimCancelInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
  });

  const { mutate: cancelRefundInfoInquiry } = useMutation({
    mutationFn: (body: CancelRefundInfoInquiryRequestBody) => claimApi.cancelRefundInfoInquiry(body),
    onSuccess: (response) => {
      console.log('취소 환불 정보 조회 성공:', response);
      setRefundInfo(response);
    },
    onError: (error) => {
      console.error('취소 환불 정보 조회 실패:', error);
    },
  });

  const { mutate: claimCancelRequest } = useMutation({
    mutationFn: (body: ClaimCancelRequestBody) => claimApi.claimCancelRequest(body),
    onSuccess: (response) => {
      console.log('클레임 취소 처리 성공:', response);
    },
    onError: (error) => {
      console.error('클레임 취소 처리 실패:', error);
    },
  });

  useEffect(() => {
    if (cancelOrderInfo?.success && cancelOrderInfo.data.shippingList) {
      setShippingList(
        createCustomShippingList(cancelOrderInfo.data.shippingList, isCheckboxState, orderItemIdEncrypt || []),
      );
    }
  }, [cancelOrderInfo]);

  useEffect(() => {
    const allChecked = getAllCheckboxCheckedState(shippingList);
    setIsAllCheckedBox(allChecked);

    const body: CancelRefundInfoInquiryRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      orderItemList: getRefundOrderItemList(shippingList),
    };
    cancelRefundInfoInquiry(body);
  }, [shippingList]);

  useEffect(() => {
    if (claimReasonEnum) {
      setErrorMessageClaimReason('');
    }
  }, [claimReasonEnum]);

  useEffect(() => {
    if (cancelReason) {
      setErrorMessageReason('');
    }
  }, [cancelReason]);

  const shippingListItemChange = (orderItemIdEncrypt: string, checked?: boolean, value?: number) => {
    setShippingList((prev) => updateShippingListItem(prev, orderItemIdEncrypt, checked, value));
  };

  const allCheckedItem = (checked: boolean) => {
    setIsAllCheckedBox(checked);
    setShippingList((prev) => updateAllCheckedState(checked, prev));
  };

  const onChangeCancelReason = (value: Code<string>) => {
    setClaimReasonEnum(value);
  };

  const handleCancelApply = () => {
    if (!claimReasonEnum || cancelReason === '') {
      return;
    }
    // if (!claimReasonEnum) {
    //   showModal.text(messages.Alert322);
    //   return;
    // }

    // if (cancelReason === '') {
    //   showModal.text(messages.Alert322);
    //   return;
    // }

    const body: ClaimCancelRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      claimReason: cancelReason,
      list: getRefundOrderItemList(shippingList),
      bankEnum: orderRefundAccountInfo?.data.bankEnum,
      bankAccountNumber: orderRefundAccountInfo?.data.bankAccountNumber,
      bankAccountHolder: orderRefundAccountInfo?.data.bankAccountHolder,
      claimItemStatusEnum: AllOrderStates.Claim.CC,
      claimReasonEnum: claimReasonEnum.code,
    };
    claimCancelRequest(body);
  };

  const handleReasonApply = () => {
    if (!claimReasonEnum) {
      setErrorMessageClaimReason('취소 사유를 선택해 주세요.');
      return;
    }

    switch (claimReasonEnum.code) {
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION:
        break;
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD:
      default:
        if (cancelReason === '') {
          setErrorMessageReason('취소 사유를 선택해 주세요.');
          return;
        }
    }

    showModal.text(messages.Confirm37, {
      buttonType: 'multi',
      leftType: 'tertiary',
      rightTitle: '예',
      leftTitle: '아니오',
      rightonClick: handleCancelApply,
    });
  };

  const placeholderText = () => {
    switch (claimReasonEnum?.code) {
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION:
        return '취소사유를 입력해 주세요. (선택)';
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD:
      default:
        return '취소사유를 입력해 주세요. (필수)';
    }
  };
  const reasonList = [
    {
      label: '단순 변심',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND.toString(), codeName: '단순 변심' },
    },
    {
      label: '주문 실수',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE.toString(), codeName: '주문 실수' },
    },
    {
      label: '옵션 변경',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION.toString(), codeName: '옵션 변경' },
    },
    {
      label: '배송 지연',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY.toString(), codeName: '배송 지연' },
    },
    {
      label: '상품 품절',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD.toString(), codeName: '상품 품절' },
    },
  ];

  if (cancelOrderInfo?.success === false) return <></>;

  const handleReason = () => {
    if (!claimReasonEnum) {
      setErrorMessageClaimReason('취소 사유를 선택해 주세요.');
      return;
    }
    setErrorMessageClaimReason('');
  };

  return (
    <S.CancelOrderWrap>
      <S.OhDetailSecGoods>
        <S.SummaryPart>
          <S.OrderDate>
            <S.Date>{dayjs(cancelOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
            <S.OrderNumber>{cancelOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
          </S.OrderDate>
        </S.SummaryPart>
        <S.GoodsListPart>
          {isCheckboxState ? (
            <S.AllCheckBoxBar>
              <Checkbox
                checked={isAllCheckedBox}
                value={'전체 선택'}
                id={'allCheckedBox'}
                name={'allCheckedBox'}
                onChange={allCheckedItem}
              />
            </S.AllCheckBoxBar>
          ) : (
            <></>
          )}
          {shippingList.map((goods) => {
            return (
              <S.OrderItemPart key={goods.orderShippingPriceIdEncrypt}>
                {goods.goodsList.map((item) => {
                  return (
                    <>
                      <ClaimPdItemGroup
                        key={item.goodsId}
                        item={item}
                        shippingListItemChange={shippingListItemChange}
                        withCheckbox={isCheckboxState}
                        title='취소'
                      />
                    </>
                  );
                })}
              </S.OrderItemPart>
            );
          })}
        </S.GoodsListPart>
      </S.OhDetailSecGoods>
      <S.OhDetailSecReason>
        <ClaimReason
          claimReasonEnum={claimReasonEnum}
          reasonList={reasonList}
          onChangeClaimReason={onChangeCancelReason}
          claimReason={cancelReason}
          setClaimReason={setCancelReason}
          title='취소'
          placeholder={placeholderText()}
          errorMessageClaimReason={errorMessageClaimReason}
          errorMessageReason={errorMessageReason}
        />
      </S.OhDetailSecReason>
      <S.OhDetailSecWrap>
        <ClaimRefundInfo
          refundInfo={refundInfo}
          paymentMethodEnum={cancelOrderInfo?.data?.payment.paymentMethodEnum}
          orderRefundAccountInfo={orderRefundAccountInfo}
          title='취소'
        />
      </S.OhDetailSecWrap>
      {refundInfo?.data.addPaymentYn ? (
        <ClaimAddPay
          refundInfo={refundInfo.data}
          title='취소'
        />
      ) : (
        <></>
      )}
      <S.BtnPart>
        <TwoButton
          leftTitle={'취소'}
          rightTitle={'취소신청'}
          leftonClick={() => {
            showModal.text(messages.Alert321, {
              buttonType: 'multi',
              leftType: 'tertiary',
              rightTitle: '예',
              leftTitle: '아니오',
              rightonClick: () => navigate(-1),
            });
          }}
          rightonClick={() => {
            handleReasonApply();
          }}
          leftSize={4}
          rightSize={6}
        />
      </S.BtnPart>
    </S.CancelOrderWrap>
  );
};

export default CancelOrder;
//
