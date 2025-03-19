import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Modal } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AllOrderStates, ItemStateKey, PAYMENT_STATUS_CODES, paymentMethodCode } from '@type';
import dayjs from 'dayjs';

import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { ClaimType } from '@pages/ClaimRequest/ClaimRequest';

import { PAGE_ROUTES } from '@router/Routes';

import { showPriceText, showShippingPriceText } from '@utils/display';

import { DeliveryAddress } from '@apis/buyersApi';
import messages from '@apis/message';
import orderApi, { ClaimList, OrderHistoryDetailShippingList } from '@apis/orderApi';

import OrderClaimPopup, { Popup } from './OrderClaimPopup';
import * as S from './OrderHistoryDetail.style';
import OrderProductGroup from './OrderProductGroup';
import TooltipBox from './featured/TooTipBox';

const OrderHistoryDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState<Popup>('cancel');

  const {
    state: { key },
  } = useLocation();

  const navigate = useNavigate();

  useHeader('주문상세 조회', { showHeader: true, showRightButton: false });

  const { data, refetch } = useQuery({
    queryKey: ['orderHistoryDetail', key],
    queryFn: () => orderApi.getOrderListDetail(key),
  });

  const { mutate: confirmOrder } = useMutation({
    mutationFn: (orderItemIdEncryptList: string[]) => orderApi.buyConfirmFinish(orderItemIdEncryptList.toString()),
    onSuccess: (resp) => {},
  });

  const { mutate: getTrackingInfo } = useMutation({
    mutationFn: (orderItemIdEncrypt: string) => orderApi.getDeliveryTracking(orderItemIdEncrypt.toString()),
    onSuccess: (resp) => {
      resp.data.url + resp.data.invoiceNumber;
    },
  });

  const moveToClaimOrder = (isCheckboxState: boolean, type: ClaimType, orderItemIdEncrypt?: string[]) => {
    navigate(PAGE_ROUTES.CLAIM_REQUEST.path, {
      state: {
        type,
        ordersIdEncrypt: data?.data.order.ordersIdEncrypt,
        orderShippingPriceIdEncrypt: data?.data.shippingList[0]?.shippingInfo.orderShippingPriceIdEncrypt,
        isCheckboxState,
        orderItemIdEncrypt,
      },
    });
  };

  const moveToDeliveryTrack = (orderItemIdEncrypt: string) => {
    // 추후개발
    // 배송조회
    getTrackingInfo(orderItemIdEncrypt);
  };

  const buyConfirm = (orderItemIdEncryptList: string[]) => {
    showModal.text('해당 상품을 구매확정으로\n변경하시겠습니까?', {
      content: '구매확정 시 교환이나 반품이 불가합니다.',
      buttonType: 'multi',
      rightonClick: () => {
        confirmOrder(orderItemIdEncryptList);
      },
      leftTitle: '취소',
      rightTitle: '확인',
    });
  };

  const moveToReview = () => {
    // 추후개발
    // 후기작성
  };
  const renderPaymentMehtodInfo = () => {
    const paymentMethod = data?.data.payment.paymentMethodEnum.code;
    const paymentStatus = data?.data.payment.paymentStatusEnum.code;

    switch (paymentMethod) {
      case paymentMethodCode.CARD:
        return (
          <>
            <S.PayMethodMInfo>
              카드명: {data?.data.payment.card?.cardName} / 할부개월수: {data?.data.payment.card?.cardQuota}개월
            </S.PayMethodMInfo>
          </>
        );
      case paymentMethodCode.VIRTUAL_ACCOUNT:
        return (
          <>
            <S.PayMethodMInfo>
              {data?.data.payment.virtualBank?.bankName} {data?.data.payment.virtualBank?.bankAccountNumber} <br />
              예금주 : {data?.data.payment.virtualBank?.bankHolder}
            </S.PayMethodMInfo>
            {paymentStatus === PAYMENT_STATUS_CODES.DEPOSIT_READY && (
              <S.DeposiDeadline>
                입금 마감 기한 {dayjs(data?.data.payment.virtualBank?.virtualBankDate).format('YYYY.MM.DD HH:mm:ss')}
              </S.DeposiDeadline>
            )}
          </>
        );
      case paymentMethodCode.TRANSFER_ACCOUNT:
        return (
          <>
            <S.PayMethodMInfo>
              은행명: {data?.data.payment.bank?.bankName} {data?.data.payment.bank?.bankAccountNumber} (예금주 :{' '}
              {data?.data.payment.bank?.bankHolder})
            </S.PayMethodMInfo>
          </>
        );
      default:
        return <div></div>;
    }
  };

  const renderAllCancelStatus = () => {
    const paymentStatus = data?.data.payment.paymentStatusEnum.code;
    const itemStatus = data?.data.shippingList[0].goodsList[0].itemStatusEnum.code;

    switch (paymentStatus) {
      case PAYMENT_STATUS_CODES.PAYMENT_WAIT:
      case PAYMENT_STATUS_CODES.DEPOSIT_READY:
      case PAYMENT_STATUS_CODES.DEPOSIT_COMPLETE:
      case PAYMENT_STATUS_CODES.DEPOSIT_COMPLETE_MANUAL:
        if (
          itemStatus === 'ORDER.ITEM_STATUS.SHIPPING_COMPLETE' ||
          itemStatus === 'ORDER.ITEM_STATUS.SHIPPING_ING' ||
          itemStatus === 'ORDER.ITEM_STATUS.SHIPPING_START' ||
          itemStatus === 'ORDER.ITEM_STATUS.SHIPPING_DELAY' ||
          itemStatus === 'ORDER.ITEM_STATUS.SHIPPING_READY'
        ) {
          return <></>;
        } else {
          return (
            <Button
              title='전체취소'
              btnType='tertiary'
              size='xsm'
              onClick={() => moveToClaimOrder(false, 'Cancel')}
            />
          );
        }

      default:
        return <></>;
    }
  };

  const renderOneCancelStatus = (code: ItemStateKey, orderItemIdEncrypt: string) => {
    switch (code) {
      case AllOrderStates.Order.DC:
      case AllOrderStates.Order.SD:
        return (
          <S.CancelOneBtn
            title='주문취소'
            btnType='tertiary'
            size='sm'
            align='center'
            width='100%'
            onClick={() => moveToClaimOrder(true, 'Cancel', [orderItemIdEncrypt])}
          />
        );
      default:
        return <></>;
    }
  };

  const renderByShippingBtnStatus = (code: ItemStateKey, orderItemIdEncrypt: string) => {
    switch (code) {
      case AllOrderStates.Order.SS:
      case AllOrderStates.Order.SI:
        return (
          <S.CancelOneBtn
            title='배송조회'
            btnType='tertiary'
            size='sm'
            align='center'
            width='100%'
            onClick={() => moveToDeliveryTrack(orderItemIdEncrypt)}
          />
        );
      case AllOrderStates.Order.SC:
        return (
          <>
            <S.CancelOneBtn
              title='배송조회'
              btnType='tertiary'
              size='sm'
              align='center'
              width='100%'
              onClick={() => moveToDeliveryTrack(orderItemIdEncrypt)}
            />
            <S.CancelOneBtn
              title='구매확정'
              btnType='tertiary'
              size='sm'
              align='center'
              width='100%'
              onClick={() => buyConfirm([orderItemIdEncrypt])}
            />
            <S.CancelOneBtn
              title='교환신청'
              btnType='tertiary'
              size='sm'
              align='center'
              width='100%'
              onClick={() => moveToClaimOrder(true, 'Exchange', [orderItemIdEncrypt])}
            />
            <S.CancelOneBtn
              title='반품신청'
              btnType='tertiary'
              size='sm'
              align='center'
              width='100%'
              onClick={() => moveToClaimOrder(true, 'Return', [orderItemIdEncrypt])}
            />
          </>
        );
      case AllOrderStates.Order.BF:
        return (
          <S.CancelOneBtn
            title='후기작성'
            btnType='tertiary'
            size='sm'
            align='center'
            width='100%'
            onClick={moveToReview}
          />
        );
      default:
        return <></>;
    }
  };

  const openModal = (type: Popup) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const deliveryChangeModalOpen = () => {};

  const deliveryChangeModalClose = () => {};

  const onAddressSelect = (selectedAddress: DeliveryAddress) => {};

  const shippingAddrInfoChange = () => {
    const paymentStatus = data?.data.payment.paymentStatusEnum.code;
    const itemStatus = data?.data.shippingList[0].goodsList[0].itemStatusEnum.code;

    switch (paymentStatus) {
      case PAYMENT_STATUS_CODES.DEPOSIT_READY:
      case PAYMENT_STATUS_CODES.DEPOSIT_COMPLETE:
      case PAYMENT_STATUS_CODES.DEPOSIT_COMPLETE_MANUAL:
        if (itemStatus === 'ORDER.ITEM_STATUS.DEPOSIT_READY' || itemStatus === 'ORDER.ITEM_STATUS.DEPOSIT_COMPLETE') {
          return (
            <Button
              title='배송지 정보 변경'
              btnType='tertiary'
              size='xsm'
              onClick={() => deliveryChangeModalOpen}
            />
          );
        } else {
          return <></>;
        }
      default:
        return <></>;
    }
  };

  const renderFreePayText = () => {
    const pgPaymentPrice = data?.data.payment.pgPaymentPrice.number ?? 0;
    const shippingPrice = data?.data.payment.shipping.shippingPaymentPrice.number ?? 0;
    const totalDiscountPrice = data?.data.payment.goods.totalDiscountPrice.number ?? 0;

    if (pgPaymentPrice === 0 || (pgPaymentPrice === 0 && shippingPrice === 0 && totalDiscountPrice > 0)) {
      return '무료결제';
    }

    return data?.data.payment.paymentMethodEnum.codeName;
  };

  return (
    <>
      <S.OrderHiDetailWrapper>
        <S.OhDetailSecSummary>
          <S.OrderDate>
            <div>{dayjs(data?.data?.order.orderDate).format('YYYY.MM.DD')}</div>
            <p>({data?.data?.order.orderNumber})</p>
          </S.OrderDate>
          {renderAllCancelStatus()}
        </S.OhDetailSecSummary>
        <S.OhDetailSecOrder>
          {data?.data.shippingList.map((goods: OrderHistoryDetailShippingList) => {
            return (
              <S.OrderItemPart key={goods.shippingInfo.orderShippingPriceIdEncrypt}>
                {goods.goodsList.map((item) => {
                  return (
                    <OrderProductGroup
                      key={item.goodsId}
                      item={item}
                      renderOneCancelStatus={renderOneCancelStatus}
                      renderByShippingBtnStatus={renderByShippingBtnStatus}
                    />
                  );
                })}
                {/* {renderByShippingBtnStatus(
                    goods.goodsList[0].itemStatusEnum.code,
                    goods.goodsList.flatMap((item) => item.orderItemIdEncrypt),
                  )} */}
                <S.ShipDetail>
                  <S.ShipDetailTit>배송비</S.ShipDetailTit>
                  <S.ShipDetailTxt>{showShippingPriceText(goods.shippingInfo.shippingPaymentPrice)}</S.ShipDetailTxt>
                  <TooltipBox item={goods.shippingInfo} />
                </S.ShipDetail>
              </S.OrderItemPart>
            );
          })}
        </S.OhDetailSecOrder>
        <S.OhDetailSecPay>
          <S.OhDetailTitle>
            <h2>주문결제 내역</h2>
          </S.OhDetailTitle>
          <S.PayMethodPart>
            <S.PayHead>결제수단</S.PayHead>
            <S.PayConts>
              <S.PayMethod>{renderFreePayText()}</S.PayMethod>
              {renderPaymentMehtodInfo()}
            </S.PayConts>
          </S.PayMethodPart>
          <S.TotalPricePart>
            <S.DlType1>
              <dt>총 상품금액</dt>
              <dd>{showPriceText(data?.data.payment.goods.goodsItemPrice)}</dd>
            </S.DlType1>
            <S.DlType1>
              <dt>총 할인금액</dt>
              <dd className='discount-text'>{showPriceText(data?.data.payment.goods.totalDiscountPrice, true)}</dd>
            </S.DlType1>
            <S.DlType2>
              <dt>즉시할인</dt>
              <dd>{showPriceText(data?.data.payment.goods.immediateDiscountPrice, true)}</dd>
            </S.DlType2>
            <S.DlType2>
              <dt>쿠폰할인</dt>
              <dd>{showPriceText(data?.data.payment.goods.couponDiscountPrice, true)}</dd>
            </S.DlType2>
            <S.DlType1>
              <dt>쇼핑지원금 사용</dt>
              <dd>{showPriceText(data?.data.payment.goods.useMileage, true)}</dd>
            </S.DlType1>
            <S.DlType1>
              <dt>010PAY 포인트 사용</dt>
              <dd>{showPriceText(data?.data.payment.goods.usePay010Mileage, true)}</dd>
            </S.DlType1>
          </S.TotalPricePart>
          <S.PayTotalPart>
            <S.DlType3>
              <dt>총 배송비</dt>
              <dd>{showPriceText(data?.data.payment.shipping.shippingPaymentPrice)}</dd>
            </S.DlType3>
            <S.DlType2>
              <dt>기본 배송비</dt>
              <dd>{showPriceText(data?.data.payment.shipping.defaultShippingPaymentPrice)}</dd>
            </S.DlType2>
            <S.DlType2>
              <dt>지역 추가 배송비</dt>
              <dd>{showPriceText(data?.data.payment.shipping.addShippingPaymentPrice)}</dd>
            </S.DlType2>
          </S.PayTotalPart>
          <S.AmountPaidPart>
            <S.AmountPaid>
              <S.AmountTit>총 결제 예정 금액</S.AmountTit>
              <S.AmountPrice>{showPriceText(data?.data.payment.pgPaymentPrice)}</S.AmountPrice>
            </S.AmountPaid>
            <S.PointBox>
              <S.PointTitle>적립예정 010PAY 포인트</S.PointTitle>
              <S.Point>{showPriceText(data?.data.payment.goods.depositMileage)}</S.Point>
            </S.PointBox>
            <S.ExpectedPoints>
              <li>예상 구매 적립금은 총 결제 금액에서 배송비를 제외한 결제 금액을 기준으로 지급됩니다.</li>
              <li>구매확정 이후 적립될 010PAY 포인트는 해당 예상 010PA 포인트 내역과 상이할 수 있습니다.</li>
            </S.ExpectedPoints>
          </S.AmountPaidPart>
        </S.OhDetailSecPay>
        <S.OhDetailSecShip>
          <S.OhDetailTitle>
            <h2>배송지 정보</h2>
            {shippingAddrInfoChange()}
          </S.OhDetailTitle>
          <S.DeliveryInfoPart>
            <S.DeliveryInfoDl>
              <dt>받는 분</dt>
              <dd>{data?.data.address.name}</dd>
            </S.DeliveryInfoDl>
            <S.DeliveryInfoDl>
              <dt>주소</dt>
              <dd>
                [{data?.data.address.zipCode}] {data?.data.address.address} {data?.data.address.addressDetail}
              </dd>
            </S.DeliveryInfoDl>
            <S.DeliveryInfoDl>
              <dt>휴대폰번호</dt>
              <dd>{data?.data.address.contactNumber}</dd>
            </S.DeliveryInfoDl>
            <S.DeliveryInfoDl>
              <dt>배송요청사항</dt>
              <dd>{data?.data.address.shippingMessage}</dd>
            </S.DeliveryInfoDl>
          </S.DeliveryInfoPart>
        </S.OhDetailSecShip>
        <S.OhDetailSecBtn>
          <Button
            title='영수증 조회'
            btnType='tertiary'
            size='sm'
            width='100%'
            align='center'
            onClick={() => console.log('a')}
          />
          {data?.data.claimList &&
            data?.data.claimList.filter((claim: ClaimList) => claim.claimTypeEnum.code === 'cancel').length > 0 && (
              <Button
                title='취소 환불내역'
                btnType='tertiary'
                size='sm'
                width='100%'
                align='center'
                onClick={() => openModal('cancel')}
              />
            )}
          {data?.data.claimList &&
            data?.data.claimList.filter((claim: ClaimList) => claim.claimTypeEnum.code === 'return').length > 0 && (
              <Button
                title='반품 환불내역'
                btnType='tertiary'
                size='sm'
                width='100%'
                align='center'
                onClick={() => openModal('return')}
              />
            )}
          {data?.data.rejectList && data?.data.rejectList.length > 0 && (
            <Button
              title='취소/교환/반품 거부내역'
              btnType='tertiary'
              size='sm'
              width='100%'
              align='center'
              onClick={() => openModal('reject')}
            />
          )}
          {data?.data.shippingDelayList && data?.data.shippingDelayList.length > 0 && (
            <Button
              title='배송지연 내역'
              btnType='tertiary'
              size='sm'
              width='100%'
              align='center'
              onClick={() => openModal('reject')}
            />
          )}
          {data?.data.addPaymentList && data?.data.addPaymentList.length > 0 && (
            <Button
              title='추가결제 완료 내역'
              btnType='tertiary'
              size='sm'
              width='100%'
              align='center'
              onClick={() => openModal('addtionalPay')}
            />
          )}
        </S.OhDetailSecBtn>
      </S.OrderHiDetailWrapper>

      {isModalOpen && (
        <OrderClaimPopup
          type={modalType}
          data={data!}
          onHide={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default OrderHistoryDetail;
