import {
  AddShippingPriceAreaCode,
  AvailableInfoFailCode,
  GoodsDisplaySalesStatusKey,
  GoodsSaleStatusKey,
  ShippingPolicyTypeCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { GoodsOptionsList } from './goodsApi';
import { ShoppingUrl } from './urls';

export type AddGoods = {
  cartId: number;
  optionName: string;
  paymentPrice: Price;
  paymentPricePerOne: Price;
  buyCnt: number;
  saleStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  goodsOptionId: number;
};

export type Goods = {
  cartId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  recommendPrice: Price;
  recommendPricePerOne: Price;
  paymentPrice: Price;
  paymentPricePerOne: Price;
  shippingPaymentPrice: Price;
  adultYn: boolean;
  buyCnt: number;
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  saleStock: number;
  buyerAvailableBuyCnt: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  goodsId: number;
  goodsOptionId: number;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  saleRate: number;
  shippingPolicyEnum: Code<ShippingPolicyTypeCode>;
  shippingPolicyConditionText: string;
  singleGoodsYn: boolean;
  addGoodsList: AddGoods[];
};

export type ShippingInfo = {
  shippingPolicyGroupYn: boolean;
  shippingPaymentPrice: Price;
  shippingPolicyEnum: Code<ShippingPolicyTypeCode>;
  basicShippingPrice: Price;
  policyCondition: number;
  policyConditionPrice: Price;
  policyCondition2: number;
  policyConditionPrice2: Price;
  addShippingPriceUseYn: boolean;
  addShippingPriceEnum: Code<AddShippingPriceAreaCode>;
  addShippingPrice: Price;
  addShippingPrice2: Price;
};

export type CompanyInfo = {
  companyId: number;
  storeName: string;
};

export type CartGroup = {
  shipping: ShippingInfo;
  goodsList: Goods[];
};

export type CartsList = {
  company: CompanyInfo;
  shippingList: CartGroup[];
};
export type CartSummary = {
  goodsPaymentPrice: Price;
  discountPrice: Price;
  shippingPaymentPrice: Price;
  paymentPrice: Price;
};
export type CartsTotal = {
  summery: CartSummary;
  companySummery: Record<string, CartSummary>;
};

export type CartsCreate = {
  cartList: {
    cartId: number;
  }[];
  cartCnt: number;
  buyAvailableInfo: {
    buyerMaxBuyCnt: number | null;
    displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey> | null;
    maxBuyCnt: number | null;
    minBuyCnt: number | null;
    nowBuyCnt: number | null;
    buyAvailableEnum: Code<AvailableInfoFailCode> | null;
  };
};

export type CreateCartBody = {
  buyNowYn: boolean;
  goodsId?: number;
  goodsOptionId?: number;
  buyCnt?: number;
};

export type MiniCartAddGoods = {
  valueStr: string;
  goodsOptionId: number;
  price: Price;
  totalStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  addGoodsList: MiniCartAddGoods[];
};

export type UpdateCartBody = {
  goodsId: number;
  goodsOptionId?: number;
  buyCnt: number;
};

export type MiniCartsList = {
  displayGoodsName: string;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  recommendPrice: Price;
  salePrice: Price;
  goodsSaleStock: number;
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  buyerAvailableBuyCnt: number;
  buyerNowBuyCnt: number;
  optionNameList: string[];
  optionList: GoodsOptionsList[];
  addGoodsList: MiniCartAddGoods[];
};

export type CheckAvailable = {
  saleStock: number;
  buyerMaxBuyCnt: number | null;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  maxBuyCnt: number | null;
  minBuyCnt: number | null;
  cartId: number;
  goodsName: string;
  goodsOption: string;
  addGoodsOption: string | null;
  nowBuyCnt: number;
  buyAvailableEnum: {
    code: string;
    message: string;
  };
};

export type CartsListResp = APIResponse & {
  data: CartsList[];
};

export type CartsTotalResp = APIResponse & {
  data: CartsTotal;
};

export type ShoppigCartErrorData = {
  buyerMaxBuyCnt: number | null;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey> | null;
  maxBuyCnt: number | null;
  minBuyCnt: number | null;
  nowBuyCnt: number | null;
  buyAvailableEnum: Code<AvailableInfoFailCode> | null;
};

export type UpdateCartResp = APIResponse & {
  data: ShoppigCartErrorData;
};

export type CartsCreateResp = APIResponse & {
  data: CartsCreate;
};

export type CartsDeleteResp = APIResponse & {
  data: object;
};

export type MiniCartsListResp = APIResponse & {
  data: MiniCartsList;
};

export type CheckAvailableResp = APIResponse & {
  data: CheckAvailable[];
  error: {
    errorCode: AvailableInfoFailCode;
  };
};

/**
 * getCartList: 장바구니 조회
 * getCartTotal : 장바구니 총 합계 조회
 * updateCartItemCount : 장바구니 구매수량 수정 (일단 주석처리)
 * createCart : 장바구니 추가
 * deleteCartList : 장바구니 삭제
 *
 * getMiniCartList : 추가상품 조회
 * getCartBuyAvailableCheck : 장바구니 구매 가능 여부 확인
 * updateCart : 장바구니 수정
 */
const shoppingCartApi = {
  getCartList: (): Promise<CartsListResp> => {
    return axiosInstance
      .get(ShoppingUrl.getShoppingCart)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartTotal: (cartIdList: number[]): Promise<CartsTotalResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });

    return axiosInstance
      .get(ShoppingUrl.getShoppingCartTotal + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  // updateCartItemCount: (cartId: number, buyCnt: number): Promise<UpdateCartResp> => {
  //   const url = ShoppingUrl.updateShoppingCart(cartId);

  //   return axiosInstance
  //     .patch(url, { buyCnt })
  //     .then((resp) => resp.data)
  //     .catch((e) => {
  //       console.error('API Error:', e);
  //       throw e;
  //     });
  // },
  createCart: (body: CreateCartBody[]): Promise<CartsCreateResp> => {
    const url = ShoppingUrl.createShoppingCart;

    return axiosInstance
      .post(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  deleteCartList: (cartIdList: number[]): Promise<CartsDeleteResp> => {
    const url = ShoppingUrl.deleteShoppingCart;

    return axiosInstance
      .delete(url, { data: { cartIdList } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getMiniCartList: (goodsId: number): Promise<MiniCartsListResp> => {
    return axiosInstance
      .get(ShoppingUrl.getShoppingMiniCart(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartBuyAvailableCheck: (cartIdList: number[]): Promise<CheckAvailableResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });

    return axiosInstance
      .get(ShoppingUrl.getCartBuyAvailableCheck + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  updateCart: (cartId: number, goodsList: UpdateCartBody[]): Promise<UpdateCartResp> => {
    const url = ShoppingUrl.updateShoppingCart();

    return axiosInstance
      .put(url, { cartId, goodsList })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default shoppingCartApi;
