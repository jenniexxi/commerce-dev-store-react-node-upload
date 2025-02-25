import React from 'react';

import { T } from '@commons';
import { Selector } from '@components';

import { type Option } from '@components/selector/Selector';

import { CustomCartItem } from '@pages/shoppingCart/ShoppingCart';

import { colors } from '@styles/theme';

import { currencyCodeToCurrency, numberWithCommas, showPriceText, showShippingPriceText } from '@utils/display';

import { Price } from '@apis/apiCommonType';
import { CartsList } from '@apis/shoppingCartApi';

import * as S from './_Order.style';

type Props = {
  orderData?: CustomCartItem[];
};

const OrderList = ({ orderData }: Props) => {
  return (
    <S.OrderItemContainer>
      {orderData?.map((cart) => (
        <React.Fragment key={cart.companyId}>
          {cart.shippingList?.map((shippingItem, index) => (
            <S.OrderItemWrap key={`${cart.companyId}-${index}`}>
              <S.OrderItemList>
                <S.ShippingPolicy>
                  <span className='store-name'>{cart.storeName}</span>

                  <span className='shipping-text'>
                    <span className='shipping-title'>배송비</span>
                    {showShippingPriceText(shippingItem.shipping.shippingPaymentPrice)}
                  </span>
                </S.ShippingPolicy>

                {/* 상품 목록 */}
                {shippingItem.goodsList.map((goods, index) => {
                  return (
                    <S.OrderItem key={goods.goodsId}>
                      <S.OrderInfoBox>
                        <S.OrderItemImgBox>
                          <S.OrderItemImg
                            src={goods.imageFilesUrl}
                            alt={goods.displayGoodsName}
                          />
                        </S.OrderItemImgBox>
                        <S.OrderInfoRightItem>
                          <T.Caption1_NormalM
                            color={colors.text5}
                            $mb={2}
                          >
                            {cart.storeName}
                          </T.Caption1_NormalM>
                          <S.OrderInfoName>{goods.displayGoodsName}</S.OrderInfoName>
                        </S.OrderInfoRightItem>
                      </S.OrderInfoBox>
                      {goods.optionList.map((goods) => (
                        <S.OrderInfo key={goods.cartId}>
                          {/* 옵션 정보 */}
                          {goods.goodsOption === '' ? (
                            <S.OrderWithoutOptions>
                              <div>
                                <T.Body3_Normal $color={colors.text3}>상품수량 : {goods.buyCnt}개</T.Body3_Normal>
                                <T.Body3_NormalB>{showPriceText(goods.paymentPrice)}</T.Body3_NormalB>
                              </div>
                              {/* <T.Caption1_Normal $color={colors.secondary1}>1111</T.Caption1_Normal> */}
                            </S.OrderWithoutOptions>
                          ) : (
                            <S.OrderOption>
                              <T.Body3_Normal>
                                {goods.goodsOption} / {goods.buyCnt}개
                              </T.Body3_Normal>
                              <T.Body3_NormalB>{showPriceText(goods.paymentPrice)}</T.Body3_NormalB>
                              {/* <T.Caption1_Normal $color={colors.secondary1}>1111</T.Caption1_Normal> */}
                            </S.OrderOption>
                          )}
                        </S.OrderInfo>
                      ))}

                      {/* 추가 상품 목록 */}
                      {goods.addGoodsList.length > 0 &&
                        goods.addGoodsList.map((addGoods, addIndex) => (
                          <S.OrderAddList key={addGoods.cartId + addIndex}>
                            <div className='add-badge'>
                              <T.Caption2_NormalM $color={colors.text5}>추가상품</T.Caption2_NormalM>
                            </div>
                            <T.Body3_Normal $color={colors.text4}>
                              {addGoods.optionName} / {addGoods.buyCnt}개
                            </T.Body3_Normal>
                            <span className='price'>{showPriceText(addGoods.paymentPrice)}</span>
                          </S.OrderAddList>
                        ))}
                    </S.OrderItem>
                  );
                })}
              </S.OrderItemList>
            </S.OrderItemWrap>
          ))}
        </React.Fragment>
      ))}
    </S.OrderItemContainer>
  );
};

export default OrderList;
