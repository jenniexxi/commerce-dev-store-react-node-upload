import { GradeName } from '@commons/GradeBadge';

import { APIResponse, axiosInstance } from './api';
import { Price } from './apiCommonType';
import { MyPageUrl } from './urls';

type MyPageMainResp = APIResponse & {
  data: MyPageMain;
};

export type OrderInfo = {
  depositReadyCnt: number;
  depositCompleteCnt: number;
  shippingReadyCnt: number;
  shippingIngCnt: number;
  shippingCompleteCnt: number;
  cancelCnt: number;
  exchangeCnt: number;
  returnCnt: number;
};

export type MyPageMain = {
  buyerGroup: {
    name: GradeName;
  };
  mileage: {
    useYn: boolean;
    name: string;
    unit: string;
    availableMileage: Price;
  };
  coupon: {
    couponCnt: number;
  };
  order: OrderInfo;
  noticeHtmlYn: boolean;

  pay010: {
    useYn: boolean;
    name: string;
    unit: string;
    availablePay010Mileage: Price;
    availablePay010Money: Price;
  };
};

const MyPageAPI = {
  getMyPageMainInfo: (): Promise<MyPageMainResp> => {
    return axiosInstance
      .get(MyPageUrl.getMyPage)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default MyPageAPI;
