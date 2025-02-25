import { ShippingList } from '@apis/claimApi';

import { CustomGoods, CustomShippingList } from './ClaimRequest';

export const createCustomShippingList = (
  shippingList: ShippingList[],
  isCheckboxState: boolean,
  orderItemIdEncrypt: string[],
): CustomShippingList[] => {
  const updatedShippingList: CustomShippingList[] = shippingList.map((shipping) => ({
    orderShippingPriceIdEncrypt: shipping.orderShippingPriceIdEncrypt,
    goodsList: shipping.goodsList.map<CustomGoods>((goods) => ({
      ...goods,
      isChecked: !isCheckboxState ? true : orderItemIdEncrypt.includes(goods.orderItemIdEncrypt),
      valueCnt: goods.buyCnt,
      addList: goods.addList.map<CustomGoods>((addItem) => ({
        ...addItem,
        isChecked: !isCheckboxState ? true : orderItemIdEncrypt.includes(addItem.orderItemIdEncrypt),
        valueCnt: addItem.buyCnt,
        addList: [],
      })),
    })),
  }));
  return updatedShippingList;
};

// 체크박스 모두 선택여부 확인 (자식아이템들 선택했을 때 전체선택 체크박스가 선택되는지 여부)
export const getAllCheckboxCheckedState = (shippingList: CustomShippingList[]) => {
  const allChecked = shippingList.every((shipping) =>
    shipping.goodsList.every(
      (goods) => goods.isChecked && goods.addList.every((addItem: CustomGoods) => addItem.isChecked),
    ),
  );
  return allChecked;
};

// 전체선택 checkbox 를 클릭했을 때
export const updateAllCheckedState = (checked: boolean, shippingList: CustomShippingList[]): CustomShippingList[] => {
  return shippingList.map((shipping) => ({
    ...shipping,
    goodsList: shipping.goodsList.map((goods) => ({
      ...goods,
      isChecked: checked,
      addList: goods.addList.map((addItem: CustomGoods) => ({
        ...addItem,
        isChecked: checked,
      })),
    })),
  }));
};

// 취소, 교환, 환불 정보 - 값에만 해당 (UI 아님)
export const getRefundOrderItemList = (shippingList: CustomShippingList[]) => {
  let list: { orderItemIdEncrypt: string; claimCnt: number }[] = [];

  shippingList.forEach((shipping) =>
    shipping.goodsList.forEach((goods) => {
      if (goods.isChecked) {
        list.push({
          orderItemIdEncrypt: goods.orderItemIdEncrypt,
          claimCnt: goods.valueCnt,
        });
      }
      goods.addList.forEach((addItem: CustomGoods) => {
        if (addItem.isChecked) {
          list.push({
            orderItemIdEncrypt: addItem.orderItemIdEncrypt,
            claimCnt: addItem.valueCnt,
          });
        }
      });
    }),
  );

  return list;
};

// (취소, 교환, 반품)할 상품 바뀌는 정보 (UI에 해당)
export const updateShippingListItem = (
  shippingList: CustomShippingList[],
  orderItemIdEncrypt: string,
  checked?: boolean,
  value?: number,
) => {
  return shippingList.map((shipping) => ({
    ...shipping,
    goodsList: shipping.goodsList.map<CustomGoods>((goods) => {
      if (goods.orderItemIdEncrypt === orderItemIdEncrypt) {
        if (checked !== undefined) {
          goods.isChecked = checked;
        }
        if (value) {
          goods.valueCnt = value;
        }
      }

      goods.addList = goods.addList.map<CustomGoods>((addItem: CustomGoods) => {
        if (addItem.orderItemIdEncrypt === orderItemIdEncrypt) {
          if (checked !== undefined) {
            addItem.isChecked = checked;
          }
          if (value) {
            addItem.valueCnt = value;
          }
        }
        return addItem;
      });

      return goods;
    }),
  }));
};
