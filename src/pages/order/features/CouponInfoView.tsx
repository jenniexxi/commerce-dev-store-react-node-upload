import React, { useState } from 'react';

import { T } from '@commons';
import { Button, Checkbox, Modal } from '@components';
import { useQuery } from '@tanstack/react-query';
import { CouponTypeCodes } from '@type';

import Coupon from '@components/coupon/Coupon';
import Selector, { Option } from '@components/selector/Selector';

import { CustomCartItem } from '@pages/shoppingCart/ShoppingCart';

import { colors } from '@styles/theme';

import { numberWithCommas, showPriceText, showShippingPriceText } from '@utils/display';

import { Price } from '@apis/apiCommonType';
import { AvailableCouponList, CouponList, CouponType, OrderItem } from '@apis/orderApi';
import promotionApi from '@apis/promotionApi';
import { CartsList } from '@apis/shoppingCartApi';

import * as S from './_Order.style';

type CouponInfo = {
  couponId: number;
  couponIssueId: number;
  displayName: string;
  couponDiscountPrice: Price;
  couponSalePrice: Price;
  availableYn: boolean;
  couponCode: string;
  availableCouponCnt: number;
  discountRate?: number;
  maxDiscountPrice?: Price;
};

type CouponSelect = {
  [cartId: number]: {
    type: 'regular' | 'dup' | 'store';
    couponCode: string;
    couponDiscountPrice: {
      number: number;
      currencyCode: string;
    };
  };
};
type Props = {
  coupon?: OrderItem['coupon'];
  doubleCoupon?: OrderItem['dupCoupon'];
  storeCoupon?: OrderItem['storeCoupon'];
  orderData?: CustomCartItem[];
};

const CouponInfoView = ({ coupon, doubleCoupon, storeCoupon, orderData }: Props) => {
  const [applyMaxium, setApplyMaxium] = useState(true);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponListModal, setShowCouponListModal] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<{
    [cartId: number]: {
      type: 'regular' | 'dup' | 'store';
      couponCode: string;
      couponDiscountPrice: Price;
    };
  }>({});

  // const { data: orderCouponList, refetch: refetchCoupon } = useQuery({
  //   queryKey: ['shoppingOrderCoupon'],
  //   queryFn: () => promotionApi.getOrderCouponList(cartId),
  //   enabled: showCouponListModal,
  // });
  const canUseCoupon =
    coupon?.availableCouponCnt !== 0 || doubleCoupon?.availableCouponCnt !== 0 || storeCoupon?.availableCouponCnt !== 0;

  const renderMaxDiscount = () => {
    const maxDiscount =
      (coupon?.maxCouponDiscountPrice.number || 0) +
      (doubleCoupon?.maxCouponDiscountPrice.number || 0) +
      (storeCoupon?.maxCouponDiscountPrice.number || 0);

    return (
      <S.CouponInfoRightItem>
        <T.Body1_NormalB $color={colors.secondary1}>디자인 + 기획에 문의 후 개발 후 노티</T.Body1_NormalB>
        {/* <S.Badge>{true ? '적용 가능한 쿠폰이 있어요!' : '최대 할인 적용중'}</S.Badge> */}
        {/* <T.Body1_NormalB $color={colors.secondary1}>-{showPriceText(coupon?.maxCouponDiscountPrice)}</T.Body1_NormalB> */}
      </S.CouponInfoRightItem>
    );
  };

  // 쿠폰 옵션 생성
  const getCouponOptions = (cartId: number) => {
    // 1. 사용 가능한 쿠폰만 필터링
    const getAvailableCoupons = (coupons: CouponType | undefined): CouponInfo[] => {
      if (!coupons?.availableCouponList) return [];

      const foundCoupon = coupons.availableCouponList.find((c) => c.cartId === cartId);

      if (!foundCoupon?.couponList) return [];

      return foundCoupon.couponList.filter((c) => c.availableYn);
    };

    const regularCoupons = getAvailableCoupons(coupon);
    const dupCoupons = getAvailableCoupons(doubleCoupon);
    const storeCoupons = getAvailableCoupons(storeCoupon);

    // 2. 쿠폰 라벨 포맷팅
    const formatDiscountLabel = (coupon: CouponInfo): string => {
      const discountAmount = numberWithCommas(coupon.couponDiscountPrice.number);
      // 정률 할인인 경우
      if (coupon.discountRate) {
        return `${coupon.displayName} (-${discountAmount}원)`;
      }
      // 정액 할인
      return `${coupon.displayName} (-${discountAmount}원)`;
    };

    // 3. 쿠폰 정렬
    const sortCoupons = (coupons: CouponInfo[]): CouponInfo[] => {
      return [...coupons].sort((a, b) => {
        // 발급일 비교 로직 (추후 추가)
        return a.displayName.localeCompare(b.displayName, 'ko', {
          sensitivity: 'base',
          numeric: true,
        });
      });
    };

    const options: Option<string>[] = [
      { label: '쿠폰 선택', value: '' },
      ...sortCoupons(regularCoupons).map((coupon) => ({
        label: formatDiscountLabel(coupon),
        value: `regular_${coupon.couponCode}`,
      })),
      ...(dupCoupons.length > 0 && selectedCoupons[cartId]?.type === 'regular'
        ? sortCoupons(dupCoupons).map((coupon) => ({
            label: `[중복] ${formatDiscountLabel(coupon)}`,
            value: `dup_${coupon.couponCode}`,
          }))
        : []),
      ...sortCoupons(storeCoupons).map((coupon) => ({
        label: `[스토어] ${formatDiscountLabel(coupon)}`,
        value: `store_${coupon.couponCode}`,
      })),
    ];

    return options.length > 1 ? options : [];
  };

  const hasAvailableCoupons = (coupons: CouponType | undefined, cartId: number): boolean => {
    if (!coupons?.availableCouponList) return false;

    const foundCoupon = coupons.availableCouponList.find((c) => c.cartId === cartId);
    if (!foundCoupon?.couponList) return false;

    return foundCoupon.couponList.some((coupon: CouponList) => coupon.availableYn);
  };

  const hasAvailableSellerCoupons = (
    coupons: OrderItem['storeCoupon'] | undefined,
    goodsList: CartsList['shippingList'][0]['goodsList'],
  ): boolean => {
    if (!coupons?.availableCouponList) return false;

    return coupons.availableCouponList.some((coupon) => goodsList.some((goods) => goods.cartId === coupon.cartId));
  };

  // 최대 할인 쿠폰 찾기
  const getMaxDiscountCoupon = (cartId: number) => {
    const allCoupons = [
      ...(coupon?.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)?.couponList || []),
      ...(doubleCoupon?.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)?.couponList || []),
      ...(storeCoupon?.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)?.couponList || []),
    ].filter((c) => c.availableYn);

    return allCoupons.reduce((max, current) => {
      return current.couponDiscountPrice.number > max.couponDiscountPrice.number ? current : max;
    }, allCoupons[0]);
  };

  // 쿠폰 선택 핸들러
  const handleCouponSelect = (cartId: number, value: string) => {
    if (!value) {
      setSelectedCoupons((prev) => {
        const next = { ...prev };
        delete next[cartId];
        return next;
      });
      return;
    }

    const [type, code] = value.split('_') as ['regular' | 'dup' | 'store', string];

    // 선택된 쿠폰 찾기
    const selectedCouponList =
      type === 'regular'
        ? coupon?.availableCouponList
        : type === 'dup'
          ? doubleCoupon?.availableCouponList
          : storeCoupon?.availableCouponList;

    const selectedCoupon = selectedCouponList
      ?.find((c: AvailableCouponList) => c.cartId === cartId)
      ?.couponList.find((c: CouponList) => c.couponCode === code && c.availableYn);

    if (selectedCoupon) {
      setSelectedCoupons((prev) => {
        const next = { ...prev };

        // 같은 쿠폰이 다른 상품에 적용된 경우 해제
        Object.entries(prev).forEach(([prevCartId, prevCoupon]) => {
          if (prevCoupon.couponCode === code && Number(prevCartId) !== cartId) {
            delete next[Number(prevCartId)];
          }
        });

        // 최대 할인 쿠폰이었다면 다른 상품들의 쿠폰도 재검사
        const maxDiscountCoupon = getMaxDiscountCoupon(cartId);
        if (maxDiscountCoupon?.couponCode === prev[cartId]?.couponCode) {
          Object.keys(prev).forEach((prevCartId) => {
            const cartMaxDiscount = getMaxDiscountCoupon(Number(prevCartId));
            if (cartMaxDiscount) {
              next[Number(prevCartId)] = {
                type: 'regular',
                couponCode: cartMaxDiscount.couponCode,
                couponDiscountPrice: cartMaxDiscount.couponDiscountPrice,
              };
            }
          });
        }

        next[cartId] = {
          type,
          couponCode: code,
          couponDiscountPrice: selectedCoupon.couponDiscountPrice,
        };
        return next;
      });
    }
  };

  const applySingleCopuon = () => {};

  return (
    <S.CouponContainer>
      <S.Title>
        <T.Headline2B>쿠폰 할인</T.Headline2B>
        <Button
          title='변경'
          size='xsm'
          btnType='tertiary'
          onClick={() => setShowCouponModal(true)}
        />
      </S.Title>
      {canUseCoupon ? (
        <S.ApplyCouponInfo>
          <T.Body2_NormalM>할인 금액</T.Body2_NormalM>
          {renderMaxDiscount()}
        </S.ApplyCouponInfo>
      ) : (
        <>적용 가능한 쿠폰이 없습니다.</>
      )}

      {showCouponModal && (
        <Modal
          type='full'
          title='쿠폰적용'
          onHide={() => setShowCouponModal(false)}
        >
          <S.HeaderInfo>
            <Checkbox
              id='applyMaxium'
              name='applyMaxium'
              value='최대 할인 적용'
              fontType='body1_normal'
              checked={applyMaxium}
              onChange={setApplyMaxium}
            />
            <Button
              btnType='tertiary'
              size='xsm'
              title='쿠폰 사용 안내'
              onClick={() => setShowCouponListModal(true)}
            />
          </S.HeaderInfo>
          <S.OrderItemView>
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
                            {goods.optionList.map((goods) => {
                              const options = getCouponOptions(goods.cartId);
                              const maxDiscountCoupon = getMaxDiscountCoupon(goods.cartId);
                              return (
                                <S.OrderInfo key={'apply_coupon' + goods.cartId}>
                                  {/* 옵션 정보 */}
                                  {goods.goodsOption === '' ? (
                                    <S.OrderWithoutOptions>
                                      <div>
                                        <T.Body3_Normal $color={colors.text3}>
                                          상품수량 : {goods.buyCnt}개
                                        </T.Body3_Normal>
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
                                  {/* {options.length > 0 && (
                                    // 할인 영역
                                    <S.DiscountSection>
                                      
                                      {hasAvailableCoupons(coupon, goods.cartId) && (
                                        <div className='discount-row'>
                                          <div className='label'>상품 쿠폰</div>
                                          <Selector
                                            options={options.filter((option) => option.value.startsWith('regular_'))}
                                            defaultValue={
                                              selectedCoupons[goods.cartId]?.type === 'regular'
                                                ? `regular_${selectedCoupons[goods.cartId].couponCode}`
                                                : maxDiscountCoupon
                                                  ? `regular_${maxDiscountCoupon.couponCode}`
                                                  : ''
                                            }
                                            onChange={(value) => handleCouponSelect(goods.cartId, value)}
                                            placeholder='상품 쿠폰 선택'
                                            width={240}
                                          />
                                          {selectedCoupons[goods.cartId]?.type === 'regular' && (
                                            <span className='discount-amount'>
                                              -
                                              {numberWithCommas(
                                                selectedCoupons[goods.cartId].couponDiscountPrice.number,
                                              )}
                                              원
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {hasAvailableCoupons(doubleCoupon, goods.cartId) &&
                                        selectedCoupons[goods.cartId]?.type === 'regular' && (
                                          <div className='discount-row'>
                                            <span className='label'>더블 쿠폰</span>
                                            <Selector
                                              options={options.filter((option) => option.value.startsWith('dup_'))}
                                              defaultValue={
                                                selectedCoupons[goods.cartId]?.type === 'dup'
                                                  ? `dup_${selectedCoupons[goods.cartId].couponCode}`
                                                  : ''
                                              }
                                              onChange={(value) => handleCouponSelect(goods.cartId, value)}
                                              placeholder='중복 쿠폰 선택'
                                              width={240}
                                            />
                                            {selectedCoupons[goods.cartId]?.type === 'dup' && (
                                              <span className='discount-amount'>
                                                -
                                                {numberWithCommas(
                                                  selectedCoupons[goods.cartId].couponDiscountPrice.number,
                                                )}
                                                원
                                              </span>
                                            )}
                                          </div>
                                        )}
                                    </S.DiscountSection>
                                  )} */}
                                </S.OrderInfo>
                              );
                            })}

                            {/* 추가 상품 목록 */}
                            {goods.addGoodsList.length > 0 &&
                              goods.addGoodsList.map((addGoods, addIndex) => {
                                return (
                                  <S.OrderAddList key={'apply_coupon_additem' + addGoods.cartId + addIndex}>
                                    <div className='add-badge'>
                                      <T.Caption2_NormalM $color={colors.text5}>추가상품</T.Caption2_NormalM>
                                    </div>
                                    <T.Body3_Normal $color={colors.text4}>
                                      {addGoods.optionName} / {addGoods.buyCnt}개
                                    </T.Body3_Normal>
                                    <span className='price'>{showPriceText(addGoods.paymentPrice)}</span>
                                  </S.OrderAddList>
                                );
                              })}
                          </S.OrderItem>
                        );
                      })}
                    </S.OrderItemList>
                  </S.OrderItemWrap>
                ))}
              </React.Fragment>
            ))}
          </S.OrderItemView>
          <S.FixBottomButton>
            <Button
              title={`-${10000}원 할인 적용`}
              width='100%'
              align='center'
            />
          </S.FixBottomButton>
        </Modal>
      )}
      {showCouponListModal && (
        <Modal
          type='bottomSheet'
          onHide={() => setShowCouponListModal(false)}
          bottomTitle='사용 가능한 쿠폰'
        >
          <>
            {/* <S.CouponModalView>
              {orderCouponList?.data.map((couponList) =>
                couponList.couponList.map((coupon, index) => (
                  <Coupon
                    key={coupon.couponCode + index}
                    info={coupon}
                    type={CouponTypeCodes.Store}
                    goodsId={1}
                    refetch={refetchCoupon}
                  />
                )),
              )}
            </S.CouponModalView> */}

            <S.BottomButtonView>
              <Button
                width='100%'
                align='center'
                title={`${0}원 적용하기`}
                onClick={applySingleCopuon}
              />
            </S.BottomButtonView>
          </>
        </Modal>
      )}
    </S.CouponContainer>
  );
};

export default CouponInfoView;
