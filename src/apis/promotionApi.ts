import {
  CouponBaseDateTypeCode,
  CouponTypeCode,
  DeviceTypeCode,
  DiscountRangeTypeCode,
  DiscountTypeCode,
  UseDateTypeCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { PromotionUrl } from './urls';

export type CouponInfo = {
  couponId: number;
  displayName: string;
  code: string;
  deviceTypeEnumList: Code<DeviceTypeCode>[];
  discountTypeEnum: Code<DiscountTypeCode>;
  discountValue: number;
  useDateTypeEnum: Code<UseDateTypeCode>;
  useStartDatetime: string;
  useEndDatetime: string;
  issueStartDatetime: string;
  issueEndDatetime: string;
  minGoodsYn: boolean;
  minGoodsPrice: Price;
  maxDiscountYn: boolean;
  maxDiscountPrice: Price;
  discountRangeTypeEnum: Code<DiscountRangeTypeCode>;
  downloadYn: boolean;
  baseDateTypeEnum: Code<CouponBaseDateTypeCode>;
  baseDateValue: number;
};

export type OrderCouponInfo = {
  couponId: number;
  couponIssueId: number;
  displayName: string;
  couponDiscountPrice: Price;
  couponSalePrice: Price;
  availableYn: boolean;
  couponCode: string;
  availableCouponCnt: number;
};
export type OrderCouponListCheck = {
  cartId: number;
  goodsId: number;
  goodsOptionId: number;
  couponList: OrderCouponInfo[];
};

export type CouponListResp = APIResponse & {
  data: CouponInfo[];
};

export type OrderCouponListResp = APIResponse & {
  data: OrderCouponListCheck[];
};

export type CartCouponItem = {
  couponId: number;
  typeEnum: Code<CouponTypeCode>;
  displayName: string;
  code: string;
  deviceTypeEnumList: Code<DeviceTypeCode>[];
  discountTypeEnum: Code<DiscountTypeCode>;
  discountValue: number;
  useDateTypeEnum: Code<UseDateTypeCode>;
  useStartDatetime: string;
  useEndDatetime: string;
  issueStartDatetime: string;
  issueEndDatetime: string;
  minGoodsYn: boolean;
  minGoodsPrice: Price;
  maxDiscountYn: boolean;
  maxDiscountPrice: Price;
  discountRangeTypeEnum: Code<DiscountRangeTypeCode>;
  downloadYn: boolean;
  baseDateTypeEnum: Code<CouponBaseDateTypeCode>;
  baseDateValue: number;
};
export type CartCouponList = APIResponse & {
  data: Record<string, CartCouponItem[]>;
};

/**
 * getGoodsCoupon : 상품의 쿠폰 다운로드 가능 목록 조회
 * postDownloadCoupon : 쿠폰코드로 쿠폰 발급
 * getOrderCouponList : 주문 보유 쿠폰 목록 조회 (장바구니에서)
 */

const promotionApi = {
  getGoodsCoupon: (goodsId: number): Promise<CouponListResp> => {
    return axiosInstance
      .get(PromotionUrl.getGoodsCoupon(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
      });
  },
  postDownloadCoupon: (code: string, body?: { goodsId: number }): Promise<APIResponse> => {
    return axiosInstance
      .post(PromotionUrl.postDownloadCoupon(code), body)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  getOrderCouponList: (cartId: number[]): Promise<OrderCouponListResp> => {
    const query = new URLSearchParams({ cartId: cartId.toString() });

    return axiosInstance
      .get(PromotionUrl.getOrderCouponList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartCouponList: (): Promise<CartCouponList> => {
    return axiosInstance
      .get(PromotionUrl.getCartCouponList)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default promotionApi;
