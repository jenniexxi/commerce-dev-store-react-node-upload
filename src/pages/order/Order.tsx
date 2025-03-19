import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { T } from '@commons';
import { Accordion } from '@components';
import { useQuery } from '@tanstack/react-query';
import { GoodsDisplaySalesStatus, HFMatchingTable, HFPaymentTableCode } from '@type';

import { useOrderStore } from '@stores/useOrderStore';

import { useHeader } from '@hooks/useHeader';
import { useRRound } from '@hooks/useRRoundPay';

import { CustomCartItem, CustomGoods } from '@pages/shoppingCart/ShoppingCart';

import { colors } from '@styles/theme';

import orderApi from '@apis/orderApi';
import { CartsList, Goods } from '@apis/shoppingCartApi';
import SystemAPI from '@apis/systemApi';

import Separator from '@commons/Separator';

import * as S from './Order.style';
import {
  CashReceiptInfo,
  CouponInfoView,
  DelivieryInfo,
  Mileage,
  OrderList,
  OrderSummary,
  RefundInfo,
} from './features';
import PaymentButton from './features/PaymentButton';

export type UsedMileageInfo = {
  shopping: string;
  pay: string;
};
const Order = () => {
  useHeader('주문결제', { showHeader: true });
  const [usedMileage, setUsedMileage] = useState<UsedMileageInfo>({ shopping: '', pay: '' });
  // 배송지 관련 상태
  const [orderItems, setOrderItems] = useState<CustomCartItem[]>([]);

  // pay관련 state
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<HFPaymentTableCode | null>(null);

  const location = useLocation();

  const { error, initialize, initializePayment, renderPaymentUI, updatePaymentUI } = useRRound();

  const { setBuyer, setDelCartIdList, setCartIdList, payment, setPayment } = useOrderStore();

  const hfPaymentInstance = useRef(null);

  // 쿠폰 관련

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
    if (buyerInfo?.success) {
      setBuyer({
        name: buyerInfo.data.buyer.buyerName,
        email: buyerInfo.data.buyer.buyerEmail,
        cellPhone: buyerInfo.data.buyer.buyerCellPhone,
      });
    }
  }, [buyerInfo]);

  //
  useEffect(() => {
    if (selectedMethod) {
      //@ts-ignore
      setPayment({ ...payment, paymentMethodEnum: HFMatchingTable[selectedMethod] });
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (location.state?.selectedCartId) {
      setCartIdList(location.state?.selectedCartId);
      setDelCartIdList([]);
    }
  }, [location.state?.selectedCartId]);

  useEffect(() => {
    if (paymentReqInfo?.success) {
      const initSDK = async () => {
        try {
          // API에서 shopId 가져오기

          // SDK 초기화
          await initialize({
            shopId: paymentReqInfo.data.hectoPg.shopId,
            mode: 'development',
          });

          setIsInitialized(true);
        } catch (err) {
          console.error('SDK 초기화 실패:', err);
        }
      };

      initSDK();
    }
  }, [paymentReqInfo, initialize]);

  useEffect(() => {
    if (!orderSummary?.success || !paymentReqInfo?.success) return;

    if (!isInitialized) return;

    const setupPayment = async () => {
      try {
        const paymentsInstance = await initializePayment({
          payToken: paymentReqInfo.data.hectoPg.payToken,
          payPrice: orderSummary.data.pgPaymentPrice.number,
          deliveryFee: orderSummary.data.shippingPrice.number,
          method: ['ALL'],
        });
        hfPaymentInstance.current = paymentsInstance;
        // 결제 UI 렌더링
        const paymentMethod = await renderPaymentUI(paymentsInstance, '#payment-container');

        // 결제수단 선택 이벤트 리스닝
        paymentMethod.event('SELECT_PAYMENTS_METHOD', (method: string) => {
          setSelectedMethod(method);
        });
      } catch (err) {
        console.error('결제 초기화 실패:', err);
      }
    };

    setupPayment();
  }, [paymentReqInfo, orderSummary, isInitialized, initializePayment, renderPaymentUI]);

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

  const accordionItems = [
    {
      title: '배송 정보',
      content: <DelivieryInfo />,
    },
    {
      title: (
        <S.OrderAccTitle>
          <T.Headline2B>주문상품</T.Headline2B>

          <S.OrderDescText>
            <T.Body2_Normal $color={colors.text5}>
              {orderInfo?.data.cartList[0].shippingList[0].goodsList[0].displayGoodsName}
            </T.Body2_Normal>
            {orderInfo?.data.cartList.length && (
              <T.Body2_Normal $color={colors.text5}>
                {orderInfo?.data.cartList.length !== 1 && `외 ${orderInfo?.data.cartList.length - 1}건`}
              </T.Body2_Normal>
            )}
          </S.OrderDescText>
        </S.OrderAccTitle>
      ),

      content: <OrderList orderData={orderItems} />,
    },
  ];

  const accordionBottomItems = [
    ...(buyerInfo?.data?.buyer.pay010UseYn
      ? [
          {
            title: '010PAY 포인트',
            content: (
              <Mileage
                payMileageInfo={orderInfo?.data.pay010Mileage}
                mileage={usedMileage}
                setMileage={setUsedMileage}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <S.OrderContainer>
      <Accordion
        items={accordionItems}
        isGroup={false}
        defaultOpenIndex={[0]}
      />

      <CouponInfoView
        coupon={orderInfo?.data?.coupon}
        doubleCoupon={orderInfo?.data?.dupCoupon}
        storeCoupon={orderInfo?.data?.storeCoupon}
        orderData={orderItems}
      />
      <Separator $height={8} />
      <Accordion
        items={accordionBottomItems}
        isGroup={false}
        defaultOpenIndex={[0]}
      />
      <S.PaymentMethod id={'payment-container'} />
      <Separator $height={8} />

      {selectedMethod === 'VACT' && (
        <RefundInfo
          bank={orderInfo?.data.bank}
          bankListEnum={paymentReqInfo?.data.bankEnumList}
        />
      )}
      {(selectedMethod === 'MONYNORM' || selectedMethod === 'BANKACCT' || selectedMethod === 'VACT') && (
        <CashReceiptInfo cashReceipt={orderInfo?.data.cashReceipt} />
      )}

      <OrderSummary summaryData={orderSummary?.data} />
      <Separator $height={8} />
      <PaymentButton
        paymentPrice={orderSummary?.data.pgPaymentPrice}
        hfInstance={hfPaymentInstance}
      />
    </S.OrderContainer>
  );
};

export default Order;
