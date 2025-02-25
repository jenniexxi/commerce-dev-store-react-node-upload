import {
  AddPaymentMethodCode,
  BankCode,
  BasicPaymentMethodCode,
  EasyPaymentMethodCode,
  PaymentMethodCode,
  PaymentTypeCode,
  PgServiceTypeCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { SystemUrl } from './urls';

export type PaymentBuyerInfo = {
  buyer: {
    loginId: string;
    buyerName: string;
    nickname: string;
    buyerGroupName: string;
    buyerEmail: string;
    buyerCellPhone: string;
    loginYn: boolean;
    pay010UseYn: boolean;
    needPasswordResetYn: boolean;
    requestAdultCertificationYn: boolean;
  };
  nonBuyer: {
    loginYn: boolean;
    requestUseServiceCertificationYn: boolean;
  };
  cart: {
    total: number;
  };
  sns: {
    isSnsProcess: boolean;
    loginId: string;
    type: string;
    buyerName: string;
    linkedDatetime: string;
  };
};
type PaymentBuyerInfoResp = APIResponse & {
  data: PaymentBuyerInfo;
};

type PaymentList<T> = {
  paymentMethodEnum: Code<T>;
  info: string;
};
export type PaymentRequireInfo = {
  basicPaymentList: PaymentList<BasicPaymentMethodCode>[];
  easyPaymentList: PaymentList<EasyPaymentMethodCode>[];
  addPaymentList: PaymentList<AddPaymentMethodCode>[];
  bankEnumList: Code<BankCode>[];

  hectoPg: {
    payToken: string;
    shopId: string;
  };
};

type PaymentRequireInfoResp = APIResponse & {
  data: PaymentRequireInfo;
};

type PaymentRequestBody = {
  deviceTypeEnum: string;
  paymentMethodEnum: string;
  returnUrl?: string;
  notiUrl?: string;
  bankEnum?: Code<BankCode>;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  paymentTypeEnum: Code<PaymentTypeCode>;
};

export type PaymentRequest = {
  pgServiceEnum: Code<PgServiceTypeCode>;
  pgRequestData: {
    [key: string]: string;
  };
};
type PaymentRequsetResp = APIResponse & {
  data: PaymentRequest;
};

export type PaymentResultBody = {
  pgServiceEnum: string;
  deviceTypeEnum: string;
  pgDataJson: string;
  processIngAddPaymentYn: boolean;
};
export type PaymentResult = {
  paymentTypeEnum: string;
  receiveAuthResult: string;
  orderNumber: string;
  ordersIdEncrypt: string;
  paymentMethodEnum: Code<PaymentMethodCode>;
  virtualBank: {
    bankName: string;
    bankAccountNumber: string;
    bankAccountHolder: string;
    virtualBankDate: string;
  };
  buyerName: string;
  address: string;
  addressDetail: string;
  depositPay010Mileage: Price;
  goodsDepositPay010Mileage: Price;
  paymentDepositPay010Mileage: Price;
  buyerGroupDepositPay010MileageYn: boolean;
  buyerGroupDepositPay010Mileage: Price;
};
type PaymentResultResp = APIResponse & {
  data: PaymentResult;
};
const SystemAPI = {
  getBuyerInfo: (): Promise<PaymentBuyerInfoResp> => {
    return axiosInstance
      .get(SystemUrl.getBuyerInfo)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getPaymentRequireInfo: (): Promise<PaymentRequireInfoResp> => {
    return axiosInstance
      .get(SystemUrl.getPaymentRequireInfo)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postPaymentRequestInfo: (paymentGatewayIdEncrypt: string, body: PaymentRequestBody): Promise<PaymentRequsetResp> => {
    return axiosInstance
      .post(SystemUrl.postPaymentRequestInfo(paymentGatewayIdEncrypt), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postPaymentResult: (body: PaymentResultBody): Promise<PaymentResultResp> => {
    return axiosInstance
      .post(SystemUrl.postPaymentResult, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default SystemAPI;
