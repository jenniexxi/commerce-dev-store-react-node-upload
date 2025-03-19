import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Modal } from '@components';
import { AllOrderStates, GoodsDisplaySalesStatus } from '@type';

import { showModal } from '@components/modal/ModalManager';

import { PAGE_ROUTES } from '@router/Routes';

import { showPriceText } from '@utils/display';

import GoodsAPI from '@apis/goodsApi';
import { OrderListGoods, OrderListShippingList } from '@apis/orderApi';

import MoreMenuBottomSheet from './MoreMenuBottomSheet';
import * as S from './_OrderHistory.style';

type Props = { shippingList: OrderListShippingList; ordersIdEncrypt: string };
const OrderHistorySectionGoods = ({ shippingList, ordersIdEncrypt }: Props) => {
  const showCancelAll = shippingList.goodsList[0].itemStatusEnum.code === AllOrderStates.Order.DR;

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState<OrderListGoods | null>(null);
  const navigate = useNavigate();

  const moveToProductDetail = (goodsId: number) => {
    GoodsAPI.getGoods(goodsId).then((resp) => {
      if (resp.success) {
        if (resp.data.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.Stop) {
          showModal.text('판매가 중지 되었습니다.');
        } else if (resp.data.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.End) {
          showModal.text('판매하지 않는 상품입니다.');
        } else {
          navigate('/productdetail/' + goodsId);
        }
      } else {
        showModal.text('판매하지 않는 상품입니다.');
      }
    });
  };
  const showBottomModal = (goods: OrderListGoods) => {
    setSelectedGoods(goods);
    setShowBottomSheet(true);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
    setSelectedGoods(null);
  };

  const moveToCancelAll = (orderShippingPriceIdEncrypt: string, orderItemIdEncrypt: string) => {
    navigate(PAGE_ROUTES.CLAIM_REQUEST.path, {
      state: {
        type: 'Cancel',
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
        isCheckboxState: false,
        orderItemIdEncrypt,
      },
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
        return <S.MoreButton onClick={() => showBottomModal(goods)}>:</S.MoreButton>;
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
              showModal.text(`${goods.brandName} ${goods.displayGoodsName}\n${goods.goodsOption}`, {
                content: goods.rejectReason,
              });
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
              showModal.text(`${goods.brandName} ${goods.displayGoodsName}\n${goods.goodsOption}`, {
                content: goods.delayReason,
              });
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

  return (
    <S.OrderHistorySectionGoodsContainer>
      {shippingList.goodsList.map((goods) => (
        <S.OrderHistorySectionGoodsItem key={goods.orderItemIdEncrypt}>
          <S.ProductPart>
            <S.PayState $code={goods.itemStatusEnum.code || goods.claimTypeEnum.code}>
              {goods.itemStatusEnum.codeName || goods.claimTypeEnum.codeName}
            </S.PayState>
            <S.ProductInfo onClick={() => moveToProductDetail(goods.goodsId)}>
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
          {goods.reShippingGoodsList.map((goods) => (
            <S.ExchangeBoxPart>
              <S.PayState $code={goods.itemStatusEnum.code || goods.claimTypeEnum.code}>
                {goods.itemStatusEnum.codeName || goods.claimTypeEnum.codeName}
              </S.PayState>
              <S.ProductInfo onClick={() => moveToProductDetail(goods.goodsId)}>
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
          onClick={() => moveToCancelAll(shippingList.orderShippingPriceIdEncrypt, '')}
          title='전체취소'
          size='xsm'
          btnType='tertiary'
          width={'100%'}
          align='center'
        />
      )}
      {showBottomSheet && selectedGoods && (
        <Modal
          type='bottomSheet'
          onHide={hideBottomSheet}
        >
          <MoreMenuBottomSheet
            goodsInfo={selectedGoods}
            ordersIdEncrypt={ordersIdEncrypt}
            orderShippingPriceIdEncrypt={shippingList.orderShippingPriceIdEncrypt}
            orderItemIdEncrypt={selectedGoods.orderItemIdEncrypt}
          />
        </Modal>
      )}
    </S.OrderHistorySectionGoodsContainer>
  );
};

export default OrderHistorySectionGoods;
