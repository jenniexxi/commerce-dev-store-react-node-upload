import {
  BankCode,
  CashReceiptTypeCode,
  ClaimTypeKey,
  DeliveryTrackingType,
  GoodsCustomMadeType,
  GoodsDisplaySalesStatusKey,
  IdentityTypeCode,
  ItemStateKey,
  MaximumMileageType,
  MileageUnitCode,
  MypageSortKey,
  PaymentMethodCode,
  PaymentStatusCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { CartsList, ShippingInfo } from './shoppingCartApi';
import { OrderUrl } from './urls';

export type CouponType = {
  availableCouponCnt: number;
  maxCouponDiscountPrice: Price;
  availableCouponList: AvailableCouponList[] | null;
  usedCouponList: UsedCouponList[];
};

export type MileageInfo = {
  useYn: boolean;
  name: string;
  unit: string;
  useUnitEnum: Code<MileageUnitCode>;
  minimumPriceYn: boolean;
  minimumPrice?: Price;
  maximumTypeEnum: Code<MaximumMileageType>;
  maximumMileage?: Price;
  maximumRate?: number;
  availableMileage: Price;
  totalDepositExpectedMileage: Price;
};

export type RefundBankInfo = {
  bankEnum: Code<BankCode>;
  bankAccountNumber: string;
  bankAccountHolder: string;
};

export type CashReceipt = {
  purposeEnum: Code<CashReceiptTypeCode>;
  identityTypeEnum: Code<IdentityTypeCode>;
  identity: string;
};

export type OrderItem = {
  cartList: CartsList[];
  buyerAddress: {
    defaultYn: boolean;
    name: string;
    receiverName: string;
    receiverCellPhone: string;
    receiverZipCode: string;
    receiverAddress: string;
    receiverAddressDetail: string;
  };
  clauseList: {
    clauseId: number;
    typeEnum: {
      code: string;
      codeName: string;
    };
    detailTypeEnum: {
      code: string;
      codeName: string;
    };
    necessaryYn: boolean;
    name: string;
    clauseHtml: string;
    desc: string | null;
  }[];
  mileage: MileageInfo;
  pay010Mileage: MileageInfo;
  coupon: CouponType;
  dupCoupon: CouponType;
  storeCoupon: CouponType;
  shippingRequestEnumList: {
    code: string;
    codeName: string;
  }[];
  recentPaymentMethodEnum: {
    code: string;
    codeName: string;
  };
  firstOrderPaymentYn: boolean;
  bank: RefundBankInfo;
  cashReceipt: CashReceipt;
};

export type AvailableCouponList = {
  cartId: number;
  goodsId: number;
  goodsOptionId: number | null;
  couponList: CouponList[];
};

export type CouponList = {
  couponId: number;
  couponIssueId: number;
  displayName: string;
  couponDiscountPrice: Price;
  couponSalePrice: Price;
  availableYn: boolean;
  couponCode: string;
  availableCouponCnt: number;
};

export type OrderSummaryData = {
  goodsPaymentPrice: Price;
  discountPrice: Price;
  immediateDiscountPrice: Price;
  planDiscountPrice: Price;
  buyerGroupDiscountPrice: Price;
  couponDiscountPrice: Price;
  shippingPaymentPrice: Price;
  shippingPrice: Price;
  addShippingPrice: Price;
  useMileage: Price;
  usePay010Mileage: Price;
  paymentPrice: Price;
  pgPaymentPrice: Price;
  totalDepositExpectedMileage: Price;
  maximumUsableMileage: Price;
  mileageUseYn: boolean;
  totalDepositExpectedPay010Mileage: Price;
  maximumUsablePay010Mileage: Price;
  pay010MileageUseYn: boolean;
};

export type OrderSummaryBody = {
  cartIdList: number[];
  zipCode: string;
  useCouponDiscountPrice?: Price;
  useMileage?: Price;
  usePay010Mileage?: Price;
  usedCouponList?: {
    cartId: number;
    couponId: number;
    couponIssueId: number;
    goodsId: number;
    goodsOptionId: number;
    couponDiscountPrice: Price;
  }[];
  usedDupCouponList?: {
    cartId: number;
    couponId: number;
    couponIssueId: number;
    goodsId: number;
    goodsOptionId: number;
    couponDiscountPrice: Price;
  }[];
  usedStoreCouponList?: {
    cartId: number;
    couponId: number;
    couponIssueId: number;
    goodsId: number;
    goodsOptionId: number;
    couponDiscountPrice: Price;
  }[];
};

export type OrderPageResp = APIResponse & {
  data: OrderItem;
};

export type OrderSummaryResp = APIResponse & {
  data: OrderSummaryData;
};

type UsedCouponList = {
  cartId: number;
  couponId: number;
  couponIssueId: number;
  couponDiscountPrice: Price;
  goodsId: number;
  goodsOptionId: number;
  couponSalePrice: Price;
  couponCode: string;
  displayName: string;
};

export type OrderListQuery = {
  page?: string;
  size: string;
  mypageItemStatusEnum: PaymentStatusCode;
  startDate: string;
  endDate: string;
  goodsName?: string;
};

type OrderListItem = {
  storeName: string;
  orderItemIdEncrypt: string;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  itemPaymentPrice: Price;
  itemStatusEnum: Code<ItemStateKey>;
  claimTypeEnum: Code<ClaimTypeKey>;
  rejectReason: string;
  delayReason: string;
  feedbackExistYn: boolean;
  goodsId: number;
  goodsTypeEnum: Code<GoodsCustomMadeType>;
  adultYn: boolean;
};

export type OrderListGoods = OrderListItem & {
  addList: OrderListGoods[];
  reShippingGoodsList: OrderListGoods[];
};

export type OrderListShippingList = {
  orderShippingPriceIdEncrypt: string;
  goodsList: OrderListGoods[];
};

export type OrderHistoryContent = {
  ordersIdEncrypt: string;
  orderDate: string;
  orderNumber: string;
  shippingList: OrderListShippingList[];
};

type OrderListRespData = {
  content: OrderHistoryContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
export type OrderListResp = APIResponse & {
  data: OrderListRespData;
};
export type OrderListPageInfoResp = APIResponse & {
  data: {
    mypageItemStatusEnumList: Code<MypageSortKey>[];
  };
};

export type OrderInfo = {
  ordersIdEncrypt: string;
  orderDate: string;
  orderNumber: string;
  mileageUseYn: boolean;
  couponUseYn: boolean;
};

export type OrderCheckResponse = OrderListItem & {
  goodsItemPrice: Price;
  shippingPolicyConditionText: string;
  shippingPolicyId: number;
  immediateDiscountPrice: Price;
  planDiscountPrice: Price;
  buyerGroupDiscountPrice: Price;
  couponDiscountPrice: Price;
  totalDiscountPrice: Price;
  addList: OrderCheckResponse[];
  reShippingGoodsList: OrderCheckResponse[];
};

export type ClaimList = {
  claimTypeEnum: Code<ClaimTypeKey>;
  goodsNameList: string[];
  pgPaymentPrice: Price;
  paymentDate: string;
  escrowYn: boolean;
  refundUseMileage: Price;
};

export type GoodsList = {
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  addGoodsYn: boolean;
};

export type RejectGoodsList = GoodsList & {
  rejectReason: string;
};

export type RejectList = {
  claimTypeEnum: {
    code: string;
    codeName: string;
  };
  goodsList: RejectGoodsList[];
};

export type ShippingDelayList = {
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  addGoodsYn: boolean;
  delayReason: string;
};

export type AddPaymentList = {
  claimTypeEnum: {
    code: string;
    codeName: string;
  };
  pgPaymentPrice: Price;
  paymentDate: string;
  paymentMethodEnum: {
    code: string;
    codeName: string;
  };
  receiptUrl: string;
  escrowYn: boolean;
  card: {
    cardName: string;
    cardQuota: number;
  };
  bank: {
    bankName: string;
    bankAccountNumber: string;
    bankHolder: string;
  };
  goodsList: GoodsList[];
};

export type OrderHistoryDetailShippingList = {
  shippingInfo: ShippingInfo & { orderShippingPriceIdEncrypt: string };
  goodsList: OrderCheckResponse[];
};
export type OrderHisoryDetailData = {
  order: OrderInfo;
  shippingList: OrderHistoryDetailShippingList[];
  payment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
    pgPaymentPrice: Price;
    receiptUrl: string;
    escrowYn: boolean;
    card: {
      cardName: string;
      cardQuota: number;
    };
    bank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
    };
    virtualBank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
      virtualBankDate: string;
    };
    goods: {
      goodsItemPrice: Price;
      totalDiscountPrice: Price;
      immediateDiscountPrice: Price;
      planDiscountPrice: Price;
      buyerGroupDiscountPrice: Price;
      couponDiscountPrice: Price;
      useMileage: Price;
      usePay010Mileage: Price;
      depositMileage: Price;
    };
    shipping: {
      shippingPaymentPrice: Price;
      defaultShippingPaymentPrice: Price;
      addShippingPaymentPrice: Price;
    };
  };
  address: {
    orderAddressIdEncrypt: string;
    name: string;
    zipCode: string;
    address: string;
    addressDetail: string;
    contactNumber: string;
    shippingMessage: string;
  };
  claimList: ClaimList[];
  rejectList: RejectList[];
  addPaymentList: AddPaymentList[];
  shippingDelayList: ShippingDelayList[];
};
export type OrderHistoryDetail = APIResponse & {
  data: OrderHisoryDetailData;
};

export type OrderRefundAccountResp = APIResponse & {
  data: {
    bankEnum: Code<BankCode>;
    bankAccountNumber: string;
    bankAccountHolder: string;
  };
};

export type DeliveryTrackingResp = APIResponse & {
  data: {
    url: string;
    methodEnum: Code<DeliveryTrackingType>;
    param: string;
    invoiceNumber: string;
  };
};

export type BuyConfirmFinishResp = APIResponse & {
  data: {
    totalCnt: number;
    successCnt: number;
    failCnt: number;
  };
};

export type CreateOrderAddress = {
  name: string;
  contactNumber: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  shippingMessage?: string;
  shippingName?: string;
  basicYn?: boolean;
};

export type CreateOrderCoupon = {
  cartId: number;
  couponId: number;
  couponIssueId: number;
  goodsId: number;
  goodsOptionId: number;
  couponDiscountPrice: Price;
  couponCode: string;
  displayName: string;
};

export type CreateOrderPayment = {
  paymentMethodEnum: string;
  paymentMethodSelectYn: boolean;
  bankUseAgainYn: boolean;
  cashReceiptUseAgainYn: boolean;
};

export type CreateOrderBuyer = {
  name: string;
  email: string;
  cellPhone: string;
  nonBuyerPassword?: string;
};
export type CreateOrderReq = {
  cartIdList: number[];
  delCartIdList: number[];
  buyer: CreateOrderBuyer;
  address: CreateOrderAddress;
  useTotalCouponDiscountPrice?: Price;
  useCouponDiscountPrice?: Price;
  useDupCouponDiscountPrice?: Price;
  useStoreCouponDiscountPrice?: Price;
  usedCouponList?: CreateOrderCoupon[];
  usedDupCouponList?: CreateOrderCoupon[];
  usedStoreCoupon?: CreateOrderCoupon[];
  useMileage?: Price;
  usePay010Mileage?: Price;
  payment?: CreateOrderPayment;
};
export type CreateOrderData = {
  paymentGatewayIdEncrypt: string;
  pgPaymentPrice: Price;
  failList: {
    cartId: number;
    saleStock: number;
    buyerMaxBuyCnt: number;
    displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
    maxBuyCnt: number;
    minBuyCnt: number;
    buyerAvailableEnum: {
      code: string;
      success: boolean;
      fail: boolean;
      message: string;
    };
  }[];
  messageEnum: {
    code: string;
    success: boolean;
    fail: boolean;
    message: string;
  };
};

type CreateOrderResp = APIResponse & {
  data: CreateOrderData;
};
/**
 * getOrderPage: 주문서 작성 화면 정보 조회
 * orderRefundAccount: (orders) 기존 주문 환불 계좌 조회
 * getDeliveryTracking: 배송추적 조회
 * buyConfirmFinish: 구매확정 변경
 */

const orderApi = {
  getOrderPage: (cartIdList: number[]): Promise<OrderPageResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });
    return axiosInstance
      .get(OrderUrl.getOrderPage + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderSummary: (body: OrderSummaryBody): Promise<OrderSummaryResp> => {
    return axiosInstance
      .post(OrderUrl.getOrderSummary, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderList: (queryParam: OrderListQuery): Promise<OrderListResp> => {
    const query = new URLSearchParams(queryParam);
    return axiosInstance
      .get(OrderUrl.getOrderList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderListPageInfo: (): Promise<OrderListPageInfoResp> => {
    return axiosInstance
      .get(OrderUrl.getOrderListPageInfo)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderListDetail: (ordersIdEncrypt: string): Promise<OrderHistoryDetail> => {
    return axiosInstance
      .get(OrderUrl.getOrderListDetail(ordersIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  orderRefundAccount: (ordersIdEncrypt: string): Promise<OrderRefundAccountResp> => {
    return axiosInstance
      .get(OrderUrl.orderRefundAccount(ordersIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getDeliveryTracking: (orderItemIdEncrypt: string): Promise<DeliveryTrackingResp> => {
    return axiosInstance
      .get(OrderUrl.getDeliveryTracking, { params: { orderItemIdEncrypt } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  buyConfirmFinish: (orderItemIdEncryptList: string): Promise<BuyConfirmFinishResp> => {
    return axiosInstance
      .patch(OrderUrl.buyConfirmFinish, null, { params: { orderItemIdEncryptList: orderItemIdEncryptList } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  createOrder: (body: CreateOrderReq): Promise<CreateOrderResp> => {
    return axiosInstance
      .post(OrderUrl.createOrder, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default orderApi;
