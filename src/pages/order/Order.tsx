import { useEffect, useState } from 'react';

import DaumPostcode from 'react-daum-postcode';
import { useLocation } from 'react-router-dom';

import { T } from '@commons';
import { Accordion } from '@components';
import { Modal } from '@components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GoodsDisplaySalesStatus } from '@type';

import { Option } from '@components/selector/Selector';

import { useHeader } from '@hooks/useHeader';

import { CustomCartItem, CustomGoods } from '@pages/shoppingCart/ShoppingCart';

import { numberWithCommas } from '@utils/display';

import { Price } from '@apis/apiCommonType';
import BuyersApi, { CreateBuyersBody } from '@apis/buyersApi';
import orderApi, { CouponList, CouponType, OrderItem } from '@apis/orderApi';
import { AvailableCouponList } from '@apis/orderApi';
import { CartsList, Goods } from '@apis/shoppingCartApi';
import SystemAPI from '@apis/systemApi';

import Separator from '@commons/Separator';

import * as S from './Order.style';
import { DelivieryInfo, OrderList, OrderSummary } from './features';
import Coupon from './features/Coupon';

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

const Order = () => {
  useHeader('주문결제', { showHeader: true });
  const location = useLocation();

  // 배송지 관련 상태
  const [orderItems, setOrderItems] = useState<CustomCartItem[]>([]);

  // 쿠폰 관련
  const [selectedCoupons, setSelectedCoupons] = useState<{
    [cartId: number]: {
      type: 'regular' | 'dup' | 'store';
      couponCode: string;
      couponDiscountPrice: {
        number: number;
        currencyCode: string;
      };
    };
  }>({});

  const { data: buyerInfo } = useQuery({ queryKey: ['buyerInfo'], queryFn: () => SystemAPI.getBuyerInfo() });

  const { data: paymentReqInfo } = useQuery({
    queryKey: ['paymentReqInfo'],
    queryFn: () => SystemAPI.getPaymentRequireInfo(),
  });

  const { data: orderInfo } = useQuery({
    queryKey: ['getOrderItem', location.state?.selectedCartId],
    queryFn: () => orderApi.getOrderPage(location.state?.selectedCartId),
    enabled: !!location.state?.selectedCartId,
  });

  const { data: orderSummary } = useQuery({
    queryKey: ['getOrderSummary', location.state?.selectedCartId],
    queryFn: () =>
      orderApi.getOrderSummary({
        cartIdList: location.state?.selectedCartId,
        zipCode: '16582',
      }),
    enabled: !!location.state?.selectedCartId,
  });

  useEffect(() => {
    if (orderInfo?.success) {
      setOrderItems((prev) => transformCartList(orderInfo.data.cartList, prev));
    }
  }, [orderInfo]);

  const transformCartList = (cartsList: CartsList[], prevData: CustomCartItem[]): CustomCartItem[] => {
    return cartsList.map((cart) => {
      const prevCompany = prevData?.find((prev) => prev.companyId === cart.company.companyId);
      const disableStates: boolean[] = [];

      const transformedShippingList = cart.shippingList.map((shippingGroup) => {
        // goodsId를 기준으로 상품들을 그룹화
        const groupedGoods = shippingGroup.goodsList.reduce(
          (acc, goods) => {
            const key = goods.goodsId;
            if (!acc[key]) {
              acc[key] = {
                goods: [],
                baseInfo: {
                  displaySaleStatusEnum: goods.displaySaleStatusEnum,
                  goodsId: goods.goodsId,
                  imageFilesUrl: goods.imageFilesUrl,
                  brandName: goods.brandName,
                  displayGoodsName: goods.displayGoodsName,
                  shippingPaymentPrice: goods.shippingPaymentPrice,
                  adultYn: goods.adultYn,
                  shippingPolicyConditionText: goods.shippingPolicyConditionText,
                  cartId: goods.cartId,
                },
              };
            }
            acc[key].goods.push(goods);
            return acc;
          },
          {} as Record<number, { goods: Goods[]; baseInfo: Partial<CustomGoods> }>,
        );

        // 그룹화된 상품들을 CustomGoods 형태로 변환
        const transformedGoodsList = Object.entries(groupedGoods).map(([goodsId, group]) => {
          const allCartIds = group.goods.map((g) => g.cartId);

          // 전체 결제 금액 계산 (옵션 + 추가상품)
          const optionsTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.paymentPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          const optionsRecommendTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.recommendPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          // 그룹 내 상품들의 disabled 상태 확인
          const isAnyDisabled = group.goods.some(
            (goods) => goods.displaySaleStatusEnum.code !== GoodsDisplaySalesStatus.OnSale,
          );
          disableStates.push(isAnyDisabled);

          // 그룹의 체크 상태 계산
          const prevCheckedState =
            prevCompany?.shippingList
              .flatMap((s) => s.goodsList)
              .find((g) => g.cartIdList.includes(group.goods[0].cartId))?.isChecked ?? true;

          // CustomGoods 형태로 변환
          return {
            cartIdList: allCartIds,
            ...group.baseInfo,
            totalPaymentPrice: {
              number: optionsTotalPrice,
              currencyCode: group.goods[0].paymentPrice.currencyCode,
            },
            totalRecommendPrice: {
              number: optionsRecommendTotalPrice,
              currencyCode: group.goods[0].recommendPrice.currencyCode,
            },
            optionList: group.goods,
            isChecked: isAnyDisabled ? false : prevCheckedState,
            disabled: isAnyDisabled,
            addGoodsList: group.goods.flatMap((goods) => goods.addGoodsList || []),
          } as CustomGoods;
        });

        return {
          shipping: shippingGroup.shipping,
          goodsList: transformedGoodsList,
        };
      });

      const isAllDisabled = disableStates.length > 0 && disableStates.every((state) => state);

      return {
        companyId: cart.company.companyId,
        storeName: cart.company.storeName,
        isChecked: prevCompany?.isChecked ?? true,
        disabled: isAllDisabled,
        shippingList: transformedShippingList,
      };
    });
  };

  // 최대 할인 쿠폰 찾기
  const getMaxDiscountCoupon = (cartId: number) => {
    const allCoupons = [
      ...(orderInfo?.data.coupon.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)
        ?.couponList || []),
      ...(orderInfo?.data.dupCoupon.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)
        ?.couponList || []),
      ...(orderInfo?.data.storeCoupon.availableCouponList?.find((c: AvailableCouponList) => c.cartId === cartId)
        ?.couponList || []),
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
        ? orderInfo?.data.coupon.availableCouponList
        : type === 'dup'
          ? orderInfo?.data.dupCoupon.availableCouponList
          : orderInfo?.data.storeCoupon.availableCouponList;

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
  // 쿠폰 옵션 생성
  const getCouponOptions = (cartId: number) => {
    // 1. 사용 가능한 쿠폰만 필터링
    const getAvailableCoupons = (coupons: CouponType | undefined): CouponInfo[] => {
      if (!coupons?.availableCouponList) return [];

      const foundCoupon = coupons.availableCouponList.find((c) => c.cartId === cartId);

      if (!foundCoupon?.couponList) return [];

      return foundCoupon.couponList.filter((c) => c.availableYn);
    };

    const regularCoupons = getAvailableCoupons(orderInfo?.data.coupon);
    const dupCoupons = getAvailableCoupons(orderInfo?.data.dupCoupon);
    const storeCoupons = getAvailableCoupons(orderInfo?.data.storeCoupon);

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

  const accordionItems = [
    {
      title: '배송 정보',
      content: <DelivieryInfo />,
    },
    {
      title: (
        <S.OrderAccTitle>
          <T.Headline2B>주문상품</T.Headline2B>

          {/* <S.OrderDescText>
            <T.Body2_Normal $color={colors.text5}>
              {orderItems?.data.cartList[0].shippingList[0].goodsList[0].displayGoodsName}
            </T.Body2_Normal>
            {orderItems?.data.cartList.length && (
              <T.Body2_Normal $color={colors.text5}>외 {orderItems?.data.cartList.length - 1}건</T.Body2_Normal>
            )}
          </S.OrderDescText> */}
        </S.OrderAccTitle>
      ),

      content: <OrderList orderData={orderItems} />,
    },
  ];

  const accordionBottomItems = [
    {
      title: '쇼핑지원금 / 010PAY 포인트',
      content: <></>,
    },
    {
      title: '결제 수단',
      content: <></>,
    },
    {
      title: '현금영수증',
      content: <></>,
    },
  ];

  return (
    <S.OrderContainer>
      <Accordion
        items={accordionItems}
        isGroup={false}
        defaultOpenIndex={[0]}
      />
      <Coupon
        coupon={orderInfo?.data?.coupon}
        doubleCoupon={orderInfo?.data?.dupCoupon}
        storeCoupon={orderInfo?.data?.storeCoupon}
      />
      <Separator $height={8} />
      <Accordion
        items={accordionBottomItems}
        isGroup={false}
        defaultOpenIndex={[0, 1, 2]}
      />
      <OrderSummary summaryData={orderSummary?.data} />
    </S.OrderContainer>
  );
};

export default Order;
