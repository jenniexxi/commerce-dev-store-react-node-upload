import { useCallback, useEffect, useRef, useState } from 'react';

import { Button, TwoButton } from '@components';
import { useMutation } from '@tanstack/react-query';

import { TextModalShowOptions } from '@components/modal/Modal.type';
import { hideModal, showModal } from '@components/modal/ModalManager';
import QuantityCounter from '@components/quantityCounter/QuantityCounter';
import OptionSelector from '@components/selector/OptionSelector';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { numberWithCommas } from '@utils/display';
import { availablePurchaseErrorHandler } from '@utils/errorMsg';

import { GoodsOptionsList } from '@apis/goodsApi';
import shoppingCartApi, { CreateCartBody, MiniCartAddGoods, MiniCartsListResp } from '@apis/shoppingCartApi';

import { ItemProp } from '../ProductDetail';
import AddGoodsModal from './AddGoodsModal';
import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;

  miniCartData?: MiniCartsListResp;
  selectOptionId: (option: number) => void;
  buyItem: ItemProp[];
  navigate: any;
  hideBuyModal: () => void;
  onItemsUpdate: (items: ItemProp[]) => void;
  initialSelectOption: number;
};

const ProductBuyModal = ({
  goodsId,
  miniCartData,
  selectOptionId,
  buyItem,
  navigate,
  hideBuyModal,
  onItemsUpdate,
  initialSelectOption,
}: Props) => {
  const [items, setItems] = useState(buyItem);
  const [localOptionId, setLocalOptionId] = useState<number>(initialSelectOption);
  const modalId = useRef('');

  // 컴포넌트 마운트 시 이전 선택 옵션 복원
  useEffect(() => {
    if (localOptionId !== -1) {
      selectOptionId(localOptionId);
    }
  }, [localOptionId, selectOptionId]);

  const addToCartMutation = useMutation({
    mutationFn: (body: CreateCartBody[]) => shoppingCartApi.createCart(body),
    onSuccess: (response, v) => {
      if (response.success) {
        if (v[0].buyNowYn) {
          hideBuyModal();
        } else {
          showTextModal('장바구니에 해당 상품을 담았습니다.\n장바구니로 이동하시겠습니까?', {
            buttonType: 'multi',
            rightonClick: () => {
              navigate(PAGE_WITHOUT_FOOTER_ROUTES.SHOPPINGCART.path);
              hideBuyModal();
            },
          });
        }
      } else {
        showTextModal(response.error.message);
      }
    },
    onError: (error) => {
      console.error('에러:', error);
    },
  });

  //@ts-ignore
  const { mutate: checkAvaliable } = useMutation({
    mutationFn: (cartId: number[]) => shoppingCartApi.getCartBuyAvailableCheck(cartId),
    onSuccess: (resp, value) => {
      if (resp.success) {
        navigate(PAGE_WITHOUT_FOOTER_ROUTES.ORDER.path, {
          state: { selectedCartId: value },
        });
      } else {
        const result = availablePurchaseErrorHandler(resp.data);
        if (result !== '') {
          showModal.text(result);
        }
      }
    },
    onError: (error) => {
      console.error('수정 중 오류 발생:', error);
    },
  });

  const showTextModal = (title: string, option?: TextModalShowOptions) => {
    showModal.text(title, option);
  };

  const sendToShoppingCart = () => {
    // 로컬 옵션 ID를 사용하여 체크
    if (localOptionId !== -1 || !miniCartData?.data?.optionList || miniCartData.data.optionList.length === 0) {
      submitOrders(false);
    } else {
      showTextModal('옵션을 선택해주세요');
    }
  };

  const submitOrders = useCallback(
    (buyNowYn: boolean) => {
      // 로컬 옵션 ID를 사용하여 체크
      if (localOptionId !== -1 || !miniCartData?.data?.optionList || miniCartData.data.optionList.length === 0) {
        const body = items.map((buyItem) => ({
          goodsId: Number(goodsId),
          buyCnt: buyItem.quantity,
          goodsOptionId: buyItem.goodsOptionId,
          buyNowYn,
        }));

        addToCartMutation.mutate(body);
      } else {
        showTextModal('옵션을 선택해주세요');
      }
    },
    [localOptionId, items, goodsId, miniCartData],
  );

  const findOptionRecursive = (optionList: GoodsOptionsList[], targetId: number): GoodsOptionsList | null => {
    for (const option of optionList) {
      // 현재 옵션이 찾는 옵션인 경우
      if (option.goodsOptionId === targetId) {
        return option;
      }

      // 하위 옵션이 있는 경우 재귀적으로 탐색
      if (option.optionList && option.optionList.length > 0) {
        const found = findOptionRecursive(option.optionList, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const onChangeOption = useCallback(
    (option: GoodsOptionsList) => {
      if (!miniCartData?.data?.optionList) return;

      // 먼저 로컬 상태 업데이트
      setLocalOptionId(option.goodsOptionId);

      if (option) {
        const newItem: ItemProp = {
          name: option.valueStr,
          minCount: 1,
          quantity: 1,
          price: option.optionSalePrice.number,
          goodsId: goodsId,
          goodsOptionId: option.goodsOptionId,
        };

        setItems((prev) => {
          const filteredItems = prev.filter((item) => !item.goodsOptionId);
          const newItems = [...filteredItems, newItem];
          onItemsUpdate(newItems);
          return newItems;
        });
      }
    },
    [miniCartData?.data?.optionList, goodsId, onItemsUpdate],
  );

  const handleAddGoodsAccept = (selectedGoods: MiniCartAddGoods[]) => {
    if (selectedGoods.length === 0) return;

    const newItems: ItemProp[] = selectedGoods.map((item) => ({
      name: item.valueStr,
      minCount: 1,
      quantity: 1,
      price: item.price.number,
      goodsId: goodsId,
      goodsOptionId: item.goodsOptionId,
    }));

    setItems((prev) => {
      const newGoodsOptionIds = new Set(newItems.map((item) => item.goodsOptionId));
      const filtered = prev.filter((item) => !newGoodsOptionIds.has(item.goodsOptionId));
      return [...filtered, ...newItems];
    });

    hideModal(modalId.current);
    modalId.current = '';
  };

  const updateItemQuantity = (itemId: number | undefined, newQuantity: number, isOptionItem: boolean = false) => {
    if (!itemId) return;

    setItems((prevItems) =>
      prevItems.map((item) => {
        const isMatch = isOptionItem ? item.goodsOptionId === itemId : item.goodsId === itemId && !item.goodsOptionId;

        return isMatch ? { ...item, quantity: newQuantity } : item;
      }),
    );
  };

  const showAddGoodsModal = () => {
    if (!miniCartData) return;

    modalId.current = showModal.custom(
      <AddGoodsModal
        miniCartData={miniCartData}
        onAccept={handleAddGoodsAccept}
      />,
      {
        type: 'bottomSheet',
        radius: 0,
      },
    );
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const ProductItem = ({ name, minCount, quantity, price, goodsId, goodsOptionId }: ItemProp) => {
    return (
      <S.ModalProductItem>
        <span>{name}</span>
        <div>
          <QuantityCounter
            width={30}
            minValue={minCount}
            quantity={quantity}
            setQuantity={(newQuantity) => {
              if (goodsOptionId !== undefined) {
                updateItemQuantity(goodsOptionId, newQuantity, true);
              } else if (goodsId !== undefined) {
                updateItemQuantity(goodsId, newQuantity, false);
              }
            }}
          />
          <span>{numberWithCommas(price * quantity)}원</span>
        </div>
      </S.ModalProductItem>
    );
  };

  return (
    <S.ModalContainer>
      {miniCartData?.data.addGoodsList && miniCartData?.data.addGoodsList.length > 1 && (
        <Button
          size='sm'
          title='추가상품 선택'
          onClick={showAddGoodsModal}
        />
      )}
      {miniCartData?.data && (
        <OptionSelector
          options={miniCartData?.data}
          optionCount={miniCartData?.data?.optionNameList.length || 0}
          onChange={onChangeOption}
        />
      )}
      {items.map((item) => (
        <ProductItem
          key={item.goodsId || '' + item.goodsOptionId || ''}
          {...item}
        />
      ))}

      <S.ModalTotalPrice>
        <span>총 상품금액</span>
        <span>{numberWithCommas(getTotalPrice())}원</span>
      </S.ModalTotalPrice>
      <S.ModalBottomButton>
        <TwoButton
          leftTitle={'장바구니'}
          rightTitle={'구매하기'}
          leftSize={5}
          rightSize={5}
          btnGap={20}
          leftType='primary'
          rightType='tertiary'
          size='lg'
          leftonClick={sendToShoppingCart}
          rightonClick={() => submitOrders(true)}
        />
      </S.ModalBottomButton>
    </S.ModalContainer>
  );
};

export default ProductBuyModal;
