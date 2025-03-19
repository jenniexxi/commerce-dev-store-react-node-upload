import { create } from 'zustand';

import { Code } from '@apis/apiCommonType';
import { DeliveryAddress, Encrypt } from '@apis/buyersApi';
import { ShippingAddress } from '@apis/claimApi';

type DeliveryStore = {
  selectedAddr: (DeliveryAddress & Encrypt) | undefined;
  deliveryRequest: Code<string> | undefined;
  deliveryRequestReason: string;
  existingAddress: ShippingAddress | undefined;
  exchangeAddress: ShippingAddress | undefined;
  exchangeRequest: Code<string> | undefined;
  exchangeRequestReason: string;
  setDeliveryRequest: (deliveryRequest: Code<string>) => void;
  setSelectedAddr: (selectedAddr: (DeliveryAddress & Encrypt) | undefined) => void;
  setDeliveryRequestReason: (deliveryRequestReason: string) => void;
  setExistingAddress: (existingAddress: ShippingAddress | undefined) => void;
  setExchangeAddress: (exchangeAddress: ShippingAddress | undefined) => void;
  setExchangeRequest: (exchangeRequest: Code<string>) => void;
  setExchangeRequestReason: (exchangeRequestReason: string) => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  selectedAddr: undefined,
  deliveryRequest: undefined,
  deliveryRequestReason: '',
  existingAddress: undefined,
  exchangeAddress: undefined,
  exchangeRequest: undefined,
  exchangeRequestReason: '',

  setDeliveryRequest: (deliveryRequest) => set({ deliveryRequest }),
  setSelectedAddr: (selectedAddr) => set({ selectedAddr }),
  setDeliveryRequestReason: (deliveryRequestReason) => set({ deliveryRequestReason }),
  setExistingAddress: (existingAddress) => set({ existingAddress }),
  setExchangeAddress: (exchangeAddress) => set({ exchangeAddress }),
  setExchangeRequest: (exchangeRequest) => set({ exchangeRequest }),
  setExchangeRequestReason: (exchangeRequestReason) => set({ exchangeRequestReason }),
}));
