import { BankCode, CashReceiptTypeCode, IdentityTypeCode, PaymentTypeCode } from '@type';
import { create } from 'zustand';

import { Code, Price } from '@apis/apiCommonType';
import {
  CreateOrderAddress,
  CreateOrderBuyer,
  CreateOrderCoupon,
  CreateOrderPayment,
  CreateOrderReq,
} from '@apis/orderApi';

type OrderStore = {
  createOrderInfo: CreateOrderReq | undefined;
  cartIdList: number[];
  delCartIdList: number[];
  buyer: CreateOrderBuyer | undefined;
  address: CreateOrderAddress | undefined;
  useTotalCouponDiscountPrice: Price | undefined;
  useCouponDiscountPrice: Price | undefined;
  useDupCouponDiscountPrice: Price | undefined;
  useStoreCouponDiscountPrice: Price | undefined;
  usedCouponList: CreateOrderCoupon[] | undefined;
  usedDupCouponList: CreateOrderCoupon[] | undefined;
  usedStoreCoupon: CreateOrderCoupon[] | undefined;
  useMileage: Price | undefined;
  usePay010Mileage: Price | undefined;
  payment: CreateOrderPayment;

  paymentMethod: Code<PaymentTypeCode> | undefined;
  bankEnum: Code<BankCode> | undefined;
  bankAccountNumber: string;
  bankAccountHolder: string;
  cashReceiptYn: boolean | undefined;
  purposeEnum: Code<CashReceiptTypeCode> | undefined;
  identityTypeEnum: Code<IdentityTypeCode> | undefined;
  identity: string | undefined;

  setCartIdList: (cartIdList: number[]) => void;
  setDelCartIdList: (delCartIdList: number[]) => void;
  setBuyer: (buyer: CreateOrderBuyer) => void;
  setAddress: (address: CreateOrderAddress) => void;
  setUseTotalCouponDiscountPrice: (useTotalCouponDiscountPrice: Price) => void;
  setUseCouponDiscountPrice: (useCouponDiscountPrice: Price) => void;
  setUseDupCouponDiscountPrice: (useDupCouponDiscountPrice: Price) => void;
  setUseStoreCouponDiscountPrice: (useStoreCouponDiscountPrice: Price) => void;
  setUsedCouponList: (usedCouponList: CreateOrderCoupon[]) => void;
  setUsedDupCouponList: (usedDupCouponList: CreateOrderCoupon[]) => void;
  setUsedStoreCoupon: (usedStoreCoupon: CreateOrderCoupon[]) => void;
  setUseMileage: (useMileage: Price) => void;
  setUsePay010Mileage: (usePay010Mileage: Price) => void;
  setPayment: (payment: CreateOrderPayment) => void;

  setBaymentMethod: (paymentMethod: Code<PaymentTypeCode>) => void;
  setBankEnum: (bankEnum: Code<BankCode>) => void;
  setBankAccountNumber: (bankAccountNumber: string) => void;
  setBankAccountHolder: (bankAccountHolder: string) => void;
  setCashReceiptYn: (cashReceiptYn: boolean) => void;
  setPurposeEnum: (purposeEnum: Code<CashReceiptTypeCode> | undefined) => void;
  setIdentityTypeEnum: (identityTypeEnum: Code<IdentityTypeCode> | undefined) => void;
  setIdentity: (identity: string) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  createOrderInfo: undefined,
  cartIdList: [],
  delCartIdList: [],
  buyer: undefined,
  address: undefined,
  useTotalCouponDiscountPrice: undefined,
  useCouponDiscountPrice: undefined,
  useDupCouponDiscountPrice: undefined,
  useStoreCouponDiscountPrice: undefined,
  usedCouponList: undefined,
  usedDupCouponList: undefined,
  usedStoreCoupon: undefined,
  useMileage: undefined,
  usePay010Mileage: undefined,
  payment: {
    paymentMethodEnum: '',
    paymentMethodSelectYn: false,
    bankUseAgainYn: true,
    cashReceiptUseAgainYn: true,
  },
  paymentMethod: undefined,
  bankEnum: undefined,
  bankAccountNumber: '',
  bankAccountHolder: '',
  cashReceiptYn: undefined,
  purposeEnum: undefined,
  identityTypeEnum: undefined,
  identity: undefined,
  setCartIdList: (cartIdList) =>
    set((state) => ({
      cartIdList,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        cartIdList,
      },
    })),
  setDelCartIdList: (delCartIdList) =>
    set((state) => ({
      delCartIdList,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        delCartIdList,
      },
    })),
  setBuyer: (buyer) =>
    set((state) => ({
      buyer,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        buyer,
      },
    })),
  setAddress: (address) =>
    set((state) => ({
      address,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        address,
      },
    })),
  setUseTotalCouponDiscountPrice: (useTotalCouponDiscountPrice) =>
    set((state) => ({
      useTotalCouponDiscountPrice,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        useTotalCouponDiscountPrice,
      },
    })),
  setUseCouponDiscountPrice: (useCouponDiscountPrice) =>
    set((state) => ({
      useCouponDiscountPrice,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        useCouponDiscountPrice,
      },
    })),
  setUseDupCouponDiscountPrice: (useDupCouponDiscountPrice) =>
    set((state) => ({
      useDupCouponDiscountPrice,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        useDupCouponDiscountPrice,
      },
    })),
  setUseStoreCouponDiscountPrice: (useStoreCouponDiscountPrice) =>
    set((state) => ({
      useStoreCouponDiscountPrice,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        useStoreCouponDiscountPrice,
      },
    })),
  setUsedCouponList: (usedCouponList) =>
    set((state) => ({
      usedCouponList,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        usedCouponList,
      },
    })),
  setUsedDupCouponList: (usedDupCouponList) =>
    set((state) => ({
      usedDupCouponList,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        usedDupCouponList,
      },
    })),
  setUsedStoreCoupon: (usedStoreCoupon) =>
    set((state) => ({
      usedStoreCoupon,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        usedStoreCoupon,
      },
    })),
  setUseMileage: (useMileage) =>
    set((state) => ({
      useMileage,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        useMileage,
      },
    })),
  setUsePay010Mileage: (usePay010Mileage) =>
    set((state) => ({
      usePay010Mileage,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        usePay010Mileage,
      },
    })),
  setPayment: (payment) =>
    set((state) => ({
      payment,
      createOrderInfo: {
        ...(state.createOrderInfo as CreateOrderReq),
        payment,
      },
    })),

  setBaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setBankEnum: (bankEnum) => set({ bankEnum }),
  setBankAccountNumber: (bankAccountNumber) => set({ bankAccountNumber }),
  setBankAccountHolder: (bankAccountHolder) => set({ bankAccountHolder }),
  setCashReceiptYn: (cashReceiptYn) => set({ cashReceiptYn }),
  setPurposeEnum: (purposeEnum) => set({ purposeEnum }),
  setIdentityTypeEnum: (identityTypeEnum) => set({ identityTypeEnum }),
  setIdentity: (identity) => set({ identity }),
}));
