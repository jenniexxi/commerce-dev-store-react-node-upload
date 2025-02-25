import { create } from 'zustand';

import { Code } from '@apis/apiCommonType';
import { DeliveryAddress, Encrypt } from '@apis/buyersApi';

type DeliveryStore = {
  selectedAddr: (DeliveryAddress & Encrypt) | undefined;
  deliveryRequest: Code<string> | undefined;
  deliveryRequestReason: string;
  setDeliveryRequest: (deliveryRequest: Code<string>) => void;
  setSelectedAddr: (selectedAddr: (DeliveryAddress & Encrypt) | undefined) => void;
  setDeliveryRequestReason: (deliveryRequestReason: string) => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  selectedAddr: undefined,
  deliveryRequest: undefined,
  deliveryRequestReason: '',
  setDeliveryRequest: (deliveryRequest) => set({ deliveryRequest }),
  setSelectedAddr: (selectedAddr) => set({ selectedAddr }),
  setDeliveryRequestReason: (deliveryRequestReason) => set({ deliveryRequestReason }),
}));
