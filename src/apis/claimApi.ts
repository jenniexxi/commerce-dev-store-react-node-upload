import {
  AddPaymentMethodCode,
  BankCode,
  ClaimReasonCode,
  ClaimTypeKey,
  GoodsCustomMadeType,
  ItemStateKey,
  MypageClaimSortKey,
  PaymentMethodCode,
  PaymentStatusCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { ClaimUrl } from './urls';

export type collectAddress = {
  name: string;
  contactNumber: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  shippingMessage: string;
};

export type reShippingAddress = {
  name: string;
  contactNumber: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  shippingMessage: string;
};
export type ClaimOrderDetail = {
  order: {
    ordersIdEncrypt: string;
    claimRequestDate: string;
    orderNumber: string;
    mileageUseYn: boolean;
  };
  goodsList: ClaimGoodInfo[];
  claim: {
    orderClaimIdEncrypt: string;
    claimCompleteDate: string;
    claimTypeEnum: Code<ClaimTypeKey>;
    claimReasonEnum: Code<ClaimReasonCode>;
    claimReasonDetail: string;
    applicationRefundPrice: Price;
    refundGoodsPaymentPrice: Price;
    useMileage: Price;
    usePay010Mileage: Price;
    pgPaymentPrice: Price;
    refundUseMileage: Price;
    refundUsePay010Mileage: Price;
    changeShippingPrice: Price;
    beforeShippingPrice: Price;
    afterShippingPrice: Price;
    refundPrice: Price;
    addPaymentYn: boolean;
    sumAddPaymentClaimShippingPrice: Price;
    addPaymentClaimShippingPrice: Price;
    addPaymentClaimAddShippingPrice: Price;
    addPaymentShippingPrice: Price;
    addFirstShippingPrice: Price;
    addPaymentPrice: Price;
    addShippingPrice: Price;
    addChangeShippingPrice: Price;
    changePaymentShippingPrice: Price;
  };
  collectAddress: collectAddress;
  reShippingAddress: reShippingAddress;
  payment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
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
      virtualBankDate: string;
      bankAccountHolder: string;
    };
    refundBank: {
      bankEnum: Code<BankCode>;
      bankAccountNumber: string;
      bankAccountHolder: string;
    };
  };
  addPayment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
    card: {
      cardName: string;
      cardQuota: number;
    };
    bank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
    };
  };
};
export type ClaimOrderDetailResp = APIResponse & {
  data: ClaimOrderDetail;
};

export type ClaimCancelRequestBody = {
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  claimReason: string;
  list: {
    orderItemIdEncrypt: string;
    claimCnt: number;
  }[];
  bankEnum?: Code<BankCode>;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  claimItemStatusEnum: string;
  claimReasonEnum: string;
};

export type ClaimProcessRespCommon = APIResponse & {
  data: {
    addPaymentYn: boolean;
    paymentGatewayIdEncrypt: string;
  };
};

export type ClaimCancelRequestResp = ClaimProcessRespCommon & {
  type: any;
};

export type ShippingList = {
  orderShippingPriceIdEncrypt: string;
  goodsList: GoodsList[];
};

export type GoodsList = {
  orderItemIdEncrypt: string;
  storeName?: string;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  itemPaymentPrice: Price;
  pgPaymentPrice: Price;
  minBuyCnt: number;
  availableClaimCnt: number;
  goodsId: number;
  adultYn: boolean;
  saleStock: number;
  sumShippingCnt: number;
  addList: GoodsList[];
  goodsTypeEnum: Code<GoodsCustomMadeType>;
};

export type ClaimInfoViewRespCommon = {
  order: {
    orderDate: string;
    ordersIdEncrypt: string;
    orderNumber: string;
    mileageUseYn: boolean;
  };
  shippingList: ShippingList[];
  payment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
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
    escrowYn: boolean;
  };
  claimItemStatusEnumList: {
    code: string;
    codeName: string;
  }[];
  claimReasonEnumList: {
    code: string;
    codeName: string;
  }[];
};

export type ClaimCancelInfoViewResp = APIResponse & {
  data: ClaimInfoViewRespCommon & {
    bankEnumList: Code<BankCode>;
  };
};

export type CancelRefundInfoInquiryRequestBody = {
  ordersIdEncrypt?: string;
  orderShippingPriceIdEncrypt?: string;
  orderItemList: {
    orderItemIdEncrypt: string;
    claimCnt: number;
  }[];
};

export type RefundInfoInquiryRespCommon = {
  applicationRefundPrice: Price;
  refundGoodsPaymentPrice: Price;
  useMileage: Price;
  usePay010Mileage: Price;
  pgPaymentPrice: Price;
  refundUseMileage: Price;
  refundUsePay010Mileage: Price;
  changeShippingPrice: Price;
  beforeShippingPrice: Price;
  afterShippingPrice: Price;
  refundPrice: Price;
  addPaymentYn?: boolean;
  sumAddPaymentClaimShippingPrice: Price;
  addPaymentClaimShippingPrice: Price;
  addPaymentClaimAddShippingPrice: Price;
  addShippingPrice: Price;
  addFirstShippingPrice: Price;
  addPaymentPrice: Price;
};

export type CancelRefundInfoInquiryResp = APIResponse & {
  data: RefundInfoInquiryRespCommon & {
    addGoodsForceSelectOrderItemList: string[];
  };
};

export type ClaimExchangeInfoViewResp = APIResponse & {
  data: ClaimInfoViewRespCommon & {
    shippingAddress: {
      name: string;
      contactNumber: string;
      zipCode: string;
      address: string;
      addressDetail: string;
      shippingMessage: string;
      shippingOrderAddressIdEncrypt: string;
    };
  };
};

export type ExchangeRefundInfoInquiryRequestBody = CancelRefundInfoInquiryRequestBody & {
  claimReasonEnum: string;
  collectAddressZipCode: string;
  reShippingAddressZipCode?: string;
  processIngCheckYn?: boolean;
};

export type ExchangeRefundInfoInquiryResp = APIResponse & {
  data: RefundInfoInquiryRespCommon;
};

export type ClaimExchangeRequestBody = ClaimCancelRequestBody & {
  collectAddress: collectAddress;
  reShippingAddress?: reShippingAddress;
};

export type ConfirmIsExchangeRequestBody = {
  ordersIdEncrypt: string;
  list: {
    orderItemIdEncrypt: string;
    claimCnt?: number;
  }[];
};

export type ConfirmIsExchangeResp = APIResponse & {
  list: {
    orderItemIdEncrypt: string;
    availableClaimCnt: number;
    addGoodsYn: boolean;
  }[];
};

export type ClaimListQuery = {
  page: number;
  size: number;
  mypageItemStatusEnum: MypageClaimSortKey;
  startDate: string;
  endDate: string;
  goodsName?: string;
};

export type ClaimGoodInfo = {
  orderItemIdEncrypt: string;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  itemPaymentPrice: Price;
  itemStatusEnum: Code<ItemStateKey>;
  claimTypeEnum: Code<MypageClaimSortKey>;
  rejectReason: string;
  feedbackExistYn: boolean;
  goodsId: number;
  adultYn: boolean;
  addList: ClaimGoodInfo[];
  reShippingGoodsList: ClaimGoodInfo[];
};
export type ClaimListContent = {
  orderClaimIdEncrypt: string;
  claimRequestDate: string;
  ordersIdEncrypt: string;
  orderNumber: string;
  goodsList: ClaimGoodInfo[];
};
export type ClaimListResp = APIResponse & {
  data: {
    content: ClaimListContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type AddPaymentItem = {
  claimRequestDate: string; // '2019-08-24T14:15:22Z';
  ordersIdEncrypt: string;
  orderNumber: string;
  orderClaimIdEncrypt: string;
  claimTypeEnum: Code<ClaimTypeKey>;
  paymentPrice: Price;
  paymentMethodEnum: Code<AddPaymentMethodCode>;
  paymentStatusEnum: Code<PaymentStatusCode>;
  paymentGatewayIdEncrypt: string;
  virtualBank: {
    bankName: string;
    bankAccountNumber: string;
    virtualBankDate: string;
    bankAccountHolder: string;
  };
};

export type AddPaymentListResp = APIResponse & {
  data: {
    content: AddPaymentItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

const claimApi = {
  /**
   * getClaimOrderDetail: 클레임 조회
   * claimCancelInfoView: 클레임 취소 요청 화면 정보 조회
   * cancelRefundInfoInquiry: 취소 환불정보 조회
   * claimCancelRequest: 클레임 취소 처리
   *
   * claimExchangeInfoView: 클레임 교환 요청 화면 정보 조회
   * exchangeRefundInfoInquiry: 교환 환불정보 조회
   * claimExchangeRequest: 클레임 교환 처리
   * confirmIsExchangeOrder: 주문 교환 가능 확인
   *
   * claimReturnInfoView: 클레임 반품 요청 화면 정보 조회
   * returnRefundInfoInquiry: 반품 환불정보 조회
   * claimReturnRequest: 클레임 반품 처리
   */
  getClaimOrderDetail: (orderClaimIdEncrypt: string): Promise<ClaimOrderDetailResp> => {
    const url = ClaimUrl.getClaimOrderDetail(orderClaimIdEncrypt);
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimCancelInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimCancelInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimCancelInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  cancelRefundInfoInquiry: (body: CancelRefundInfoInquiryRequestBody): Promise<CancelRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.cancelRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimCancelRequest: (body: ClaimCancelRequestBody): Promise<ClaimCancelRequestResp> => {
    return axiosInstance
      .post(ClaimUrl.claimCancelRefundRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimExchangeInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimExchangeInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimExchangeInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  exchangeRefundInfoInquiry: (body: ExchangeRefundInfoInquiryRequestBody): Promise<ExchangeRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.exchangeRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimExchangeRequest: (body: ClaimExchangeRequestBody): Promise<ClaimProcessRespCommon> => {
    return axiosInstance
      .post(ClaimUrl.claimExchangeRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  confirmIsExchangeOrder: (body: ConfirmIsExchangeRequestBody): Promise<ConfirmIsExchangeResp> => {
    return axiosInstance
      .post(ClaimUrl.confirmIsExchangeOrder, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimReturnInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimExchangeInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimReturnInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  returnRefundInfoInquiry: (body: ExchangeRefundInfoInquiryRequestBody): Promise<CancelRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.returnRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimReturnRequest: (body: ClaimExchangeRequestBody): Promise<ClaimProcessRespCommon> => {
    return axiosInstance
      .post(ClaimUrl.claimReturnRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getClaimList: (query: ClaimListQuery): Promise<ClaimListResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
      mypageItemStatusEnum: query.mypageItemStatusEnum.toString(),
      startDate: query.startDate,
      endDate: query.endDate,
      ...(query.goodsName && { goodsName: query.goodsName }),
    });
    return axiosInstance
      .get(ClaimUrl.getClaimList + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  cancelClaim: (type: 'cancel' | 'return' | 'exchange', orderClaimIdEncrypt: string): Promise<APIResponse> => {
    if (type === 'cancel') {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimCancel(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    } else if (type === 'return') {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimReturn(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    } else {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimExchange(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    }
  },
  getAddPaymentList: (query: { page: number; size: number }): Promise<AddPaymentListResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(ClaimUrl.getAddPaymentList + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
};

export default claimApi;
