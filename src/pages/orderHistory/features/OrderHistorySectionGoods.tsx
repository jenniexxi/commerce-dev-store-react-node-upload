import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Modal } from '@components';
import { AllOrderStates } from '@type';

import { showModal } from '@components/modal/ModalManager';

import { showPriceText } from '@utils/display';

import { OrderListGoods, OrderListShippingList } from '@apis/orderApi';

import MoreMenuBottomSheet from './MoreMenuBottomSheet';
import * as S from './_OrderHistory.style';

type Props = { shippingList: OrderListShippingList };
const OrderHistorySectionGoods = ({ shippingList }: Props) => {
  const showCancelAll = shippingList.goodsList[0].itemStatusEnum.code === AllOrderStates.Order.DR;

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const navigate = useNavigate();
  // if (!goods.orderItemIdEncrypt) {
  //   showModal.text('제품 정보가 잘못되었습니다.', {
  //     buttonType: 'single',
  //     rightonClick: () => {
  //       navigate(-1);
  //       hideAllModals();
  //     },
  //   });
  //   return;
  // }

  const moveToProductDetail = () => {
    // GoodsAPI.getDetails(goods.goodsId).then((resp) => {
    //   if (resp.success) {
    //     if (resp.data.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.Stop) {
    //       showModal.text('판매가 중지 되었습니다.');
    //     } else if (resp.data.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.End) {
    //       showModal.text('판매하지 않는 상품입니다.');
    //     } else {
    //       navigate('/productdetail/' + goods.goodsId);
    //     }
    //   } else {
    //     showModal.text('판매하지 않는 상품입니다.');
    //   }
    // });
  };
  const showBottomModal = () => {
    setShowBottomSheet(true);
  };

  const showReasonModal = (title: string | JSX.Element, content: string) => {
    showModal.text(title, {
      content,
    });
  };

  const showMoreButton = (goods: OrderListGoods) => {
    switch (goods.itemStatusEnum?.code) {
      case AllOrderStates.Order.DR:
      case AllOrderStates.Order.SR:
      case AllOrderStates.Claim.CC:
      case AllOrderStates.Claim.RC:
      case AllOrderStates.Claim.EC:
      case AllOrderStates.Claim.CA:
        return null;

      default:
        return <S.MoreButton onClick={showBottomModal}>:</S.MoreButton>;
    }
  };

  const showRejectButton = (goods: OrderListGoods) => {
    switch (goods.claimTypeEnum?.code) {
      case AllOrderStates.Claim.CR:
      case AllOrderStates.Claim.RR:
      case AllOrderStates.Claim.ER:
        return (
          <S.ReasonText
            onClick={(e) => {
              e.stopPropagation();
              showReasonModal(
                <>
                  <div>
                    {goods.brandName} {goods.displayGoodsName}
                  </div>
                  <div>{goods.goodsOption}</div>
                </>,
                goods.rejectReason,
              );
            }}
          >
            거부사유 확인 &gt;
          </S.ReasonText>
        );

      default:
        return <></>;
    }
  };

  const showDelayButton = (goods: OrderListGoods) => {
    switch (goods.itemStatusEnum?.code) {
      case AllOrderStates.Order.SD:
        return (
          <S.ReasonText
            onClick={(e) => {
              e.stopPropagation();
              showReasonModal(
                <>
                  <div>
                    {goods.brandName} {goods.displayGoodsName}
                  </div>
                  <div>{goods.goodsOption}</div>
                </>,
                goods.delayReason,
              );
            }}
          >
            배송지연 사유 확인
          </S.ReasonText>
        );
      default:
        return <></>;
    }
  };

  const renderReasonButton = (goods: OrderListGoods) => {
    const list = [];
    list.push(showDelayButton(goods));
    list.push(showRejectButton(goods));
    return list;
  };

  const a = () => {};

  return (
    <S.OrderHistorySectionGoodsContainer>
      {shippingList.goodsList.map((goods) => (
        <S.OrderHistorySectionGoodsItem key={goods.orderItemIdEncrypt}>
          <S.ProductPart>
            <S.PayState $code={goods.itemStatusEnum.code || goods.claimTypeEnum.code}>
              {goods.itemStatusEnum.codeName || goods.claimTypeEnum.codeName}
            </S.PayState>
            <S.ProductInfo onClick={moveToProductDetail}>
              <img
                src={goods.imageFilesUrl}
                alt={goods.displayGoodsName}
              />
              <S.TextBox>
                <S.BrandName>{goods.brandName}</S.BrandName>
                <S.GoodsName>{goods.displayGoodsName}</S.GoodsName>
                {goods.goodsOption ? (
                  <S.DetailOption>
                    <span>{goods.goodsOption}</span>
                    <em>{goods.buyCnt}개</em>
                  </S.DetailOption>
                ) : (
                  <S.DetailOption>
                    <span>옵션 없음</span>
                  </S.DetailOption>
                )}
                <S.Price>{showPriceText(goods.itemPaymentPrice)}</S.Price>
                {renderReasonButton(goods)}
              </S.TextBox>
            </S.ProductInfo>
            {showMoreButton(goods)}
          </S.ProductPart>
          {goods.addList.map((item) => (
            <S.AddGoodsContainer key={'OrderHistorySectionGoodsItem' + item.orderItemIdEncrypt}>
              <S.AddBedge>추가상품</S.AddBedge>
              <S.BrandName>
                {item.displayGoodsName} | <span>{item.buyCnt}개</span>
              </S.BrandName>
              <S.Price>{showPriceText(item.itemPaymentPrice)}</S.Price>
              <span>{item.itemStatusEnum.codeName}</span>
              {renderReasonButton(goods)}
              {showMoreButton(goods)}
            </S.AddGoodsContainer>
          ))}
          {showBottomSheet && (
            <Modal
              type='bottomSheet'
              onHide={() => {
                setShowBottomSheet(false);
              }}
            >
              <MoreMenuBottomSheet goodsInfo={goods} />
            </Modal>
          )}
          {goods.reShippingGoodsList.map((goods) => (
            <S.ExchangeBoxPart>
              <S.PayState $code={goods.itemStatusEnum.code || goods.claimTypeEnum.code}>
                {goods.itemStatusEnum.codeName || goods.claimTypeEnum.codeName}
              </S.PayState>
              <S.ProductInfo onClick={moveToProductDetail}>
                <img
                  src={goods.imageFilesUrl}
                  alt={goods.displayGoodsName}
                />
                <S.TextBox>
                  <S.BrandName>{goods.brandName}</S.BrandName>
                  <S.GoodsName>{goods.displayGoodsName}</S.GoodsName>
                  {goods.goodsOption ? (
                    <S.DetailOption>
                      <span>{goods.goodsOption}</span>
                      <em>{goods.buyCnt}개</em>
                    </S.DetailOption>
                  ) : (
                    <S.DetailOption>
                      <span>옵션 없음</span>
                    </S.DetailOption>
                  )}
                  <S.Price>{showPriceText(goods.itemPaymentPrice)}</S.Price>
                  {renderReasonButton(goods)}
                </S.TextBox>
              </S.ProductInfo>
              <S.ExchangeBedge>교환상품</S.ExchangeBedge>
            </S.ExchangeBoxPart>
          ))}
        </S.OrderHistorySectionGoodsItem>
      ))}
      {showCancelAll && (
        <Button
          title='전체취소'
          size='xsm'
          btnType='tertiary'
          width={'100%'}
          align='center'
        />
      )}
    </S.OrderHistorySectionGoodsContainer>
  );
};

export default OrderHistorySectionGoods;
