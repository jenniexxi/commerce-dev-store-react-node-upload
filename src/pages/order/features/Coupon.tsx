import { T } from '@commons';
import { Button } from '@components';

import { Option } from '@components/selector/Selector';

import { colors } from '@styles/theme';

import { numberWithCommas, showPriceText } from '@utils/display';

import { Price } from '@apis/apiCommonType';
import { AvailableCouponList, CouponList, OrderItem } from '@apis/orderApi';
import { CartsList } from '@apis/shoppingCartApi';

import * as S from './_Order.style';

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
};

const Coupon = ({ coupon, doubleCoupon, storeCoupon }: Props) => {
  const canUseCoupon =
    coupon?.availableCouponCnt !== 0 || doubleCoupon?.availableCouponCnt !== 0 || storeCoupon?.availableCouponCnt !== 0;

  const renderMaxDiscount = () => {};
  return (
    <S.CouponContainer>
      <S.Title>
        <T.Headline2B>쿠폰 할인</T.Headline2B>
        <Button
          title='변경'
          size='xsm'
          btnType='tertiary'
        />
      </S.Title>
      {canUseCoupon && (
        <S.ApplyCouponInfo>
          <T.Body2_NormalM>할인 금액</T.Body2_NormalM>
          <S.CouponInfoRightItem>
            <T.Body1_NormalB $color={colors.secondary1}>
              -{showPriceText(coupon?.maxCouponDiscountPrice)}
            </T.Body1_NormalB>
          </S.CouponInfoRightItem>
        </S.ApplyCouponInfo>
      )}

      {/* {shippingItem.goodsList.map((goods) => {
      const options = getCouponOptions(goods.cartId);
      const maxDiscountCoupon = getMaxDiscountCoupon(goods.cartId);
                  return (
                                              
                        {options.length > 0 && (
                          // 할인 영역
                          <S.DiscountSection>
                            // 상품할인
                            {hasAvailableCoupons(coupon, goods.cartId) && (
                              <div className='discount-row'>
                                <div className='label'>상품할인</div>
                                <Selector
                                  options={options.filter((option) => option.value.startsWith('regular_'))}
                                  defaultValue={
                                    selectedCoupons[goods.cartId]?.type === 'regular'
                                      ? `regular_${selectedCoupons[goods.cartId].couponCode}`
                                      : maxDiscountCoupon
                                        ? `regular_${maxDiscountCoupon.couponCode}`
                                        : ''
                                  }
                                  onChange={(value) => onSelectCoupon(goods.cartId, value)}
                                  placeholder='상품 쿠폰 선택'
                                  width={240}
                                />
                                {selectedCoupons[goods.cartId]?.type === 'regular' && (
                                  <span className='discount-amount'>
                                    -{numberWithCommas(selectedCoupons[goods.cartId].couponDiscountPrice.number)}원
                                  </span>
                                )}
                              </div>
                            )}
                            // 중복 할인 
                            {hasAvailableCoupons(dupCoupon, goods.cartId) &&
                              selectedCoupons[goods.cartId]?.type === 'regular' && (
                                <div className='discount-row'>
                                  <span className='label'>중복할인</span>
                                  <Selector
                                    options={options.filter((option) => option.value.startsWith('dup_'))}
                                    defaultValue={
                                      selectedCoupons[goods.cartId]?.type === 'dup'
                                        ? `dup_${selectedCoupons[goods.cartId].couponCode}`
                                        : ''
                                    }
                                    onChange={(value) => onSelectCoupon(goods.cartId, value)}
                                    placeholder='중복 쿠폰 선택'
                                    width={240}
                                  />
                                  {selectedCoupons[goods.cartId]?.type === 'dup' && (
                                    <span className='discount-amount'>
                                      -{numberWithCommas(selectedCoupons[goods.cartId].couponDiscountPrice.number)}원
                                    </span>
                                  )}
                                </div>
                              )}
                          </S.DiscountSection>
                        )}
                        

                  );
                })} */}
    </S.CouponContainer>
  );
};

export default Coupon;
