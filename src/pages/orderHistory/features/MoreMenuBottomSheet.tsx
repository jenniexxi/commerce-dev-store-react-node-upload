import { useNavigate } from 'react-router-dom';

import { Button } from '@components';
import { AllOrderStates } from '@type';

import { ClaimType } from '@pages/ClaimRequest/ClaimRequest';

import { PAGE_ROUTES } from '@router/Routes';

import { OrderListGoods } from '@apis/orderApi';

import * as S from './_OrderHistory.style';

type Props = {
  goodsInfo: OrderListGoods;
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  orderItemIdEncrypt: string;
};

const MoreMenuBottomSheet = ({
  goodsInfo,
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  orderItemIdEncrypt,
}: Props) => {
  const navigate = useNavigate();
  let modalInfo: JSX.Element[] = [];

  const moveToClaimOrder = (type: ClaimType) => {
    navigate(PAGE_ROUTES.CLAIM_REQUEST.path, {
      state: {
        type,
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
        isCheckboxState: true,
        orderItemIdEncrypt,
      },
    });
  };

  const renderGoodsInfo = () => {
    return (
      <>
        <img
          src={goodsInfo.imageFilesUrl}
          alt={goodsInfo.displayGoodsName}
        />
        <div>{goodsInfo.displayGoodsName}</div>
        <div>{goodsInfo.goodsOption}</div>
      </>
    );
  };
  const gotoTrackingInfo = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='배송조회'
      />
    );
  };
  const gotoExchangeApply = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='교환신청'
        onClick={() => moveToClaimOrder('Exchange')}
      />
    );
  };
  const gotoReturnApply = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='반품신청'
        onClick={() => moveToClaimOrder('Return')}
      />
    );
  };
  const gotoConfrimItem = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='구매확정'
      />
    );
  };
  const gotoCustomerCenter = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='1:1 문의'
      />
    );
  };
  const gotoWriteReview = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='후기 작성'
      />
    );
  };
  const gotoCancelOrder = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        onClick={() => {
          navigate('/', { state: {} });
        }}
        title='주문취소'
      />
    );
  };

  switch (goodsInfo.itemStatusEnum.code) {
    // 결제완료
    case AllOrderStates.Order.DC:
    case AllOrderStates.Order.SD:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoCancelOrder());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송시작
    case AllOrderStates.Order.SS:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송중
    case AllOrderStates.Order.SI:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송완료
    case AllOrderStates.Order.SC:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoExchangeApply());
      modalInfo.push(gotoReturnApply());
      modalInfo.push(gotoConfrimItem());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 구매확정
    case AllOrderStates.Order.BF:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoWriteReview());
      modalInfo.push(gotoCustomerCenter());
      break;

    default:
      break;
  }

  return <S.ModalGoodsInfo>{modalInfo}</S.ModalGoodsInfo>;
};

export default MoreMenuBottomSheet;
