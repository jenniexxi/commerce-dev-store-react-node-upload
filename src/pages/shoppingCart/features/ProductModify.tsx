import { useEffect, useRef, useState } from 'react';

import { T } from '@commons';
import { Modal, Selector, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GoodsSaleStatus } from '@type';
import { isEqual } from 'lodash';

import { showModal } from '@components/modal/ModalManager';
import QuantityCounter from '@components/quantityCounter/QuantityCounter';
import OptionSelector from '@components/selector/OptionSelector';
import { addToast } from '@components/toast/Toast';
import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';
import { shoppingCartErrorMsg } from '@utils/errorMsg';
import R from '@utils/resourceMapper';

import { GoodsOptionsList } from '@apis/goodsApi';
import shoppingCartApi, {
  CheckAvailable,
  CreateCartBody,
  MiniCartAddGoods,
  UpdateCartBody,
} from '@apis/shoppingCartApi';

import SvgIcon from '@commons/SvgIcon';

import { CustomGoods } from '../ShoppingCart';
import * as S from '../ShoppingCart.style';

type Props = {
  isVisible: boolean;
  goodsOptionItem: CustomGoods;
  errorData: CheckAvailable[];
  onHide: () => void;
  fetchCart: () => void;
};

type ChildItemType = {
  goodsId: number;
  buyCnt: number;
  name: string;
  goodsOptionId?: number;
  minBuyCnt?: number;
  cartId?: number;
  price: number;
  maxCnt: number;
  isAddItemShow: boolean;
};

const ProductModify = ({ isVisible, goodsOptionItem, errorData, onHide, fetchCart }: Props) => {
  const [newChildItem, setNewChildItem] = useState<ChildItemType[]>([]); // 다른 옵션 추가 및 추가상품

  const originalChildItem = useRef<ChildItemType[]>([]);

  useEffect(() => {
    const item = goodsOptionItem.optionList.map((goods): ChildItemType => {
      const goodsError = errorData?.find((item) => item.cartId === goods.cartId);
      return {
        goodsId: goodsOptionItem.goodsId,
        buyCnt: goodsError?.saleStock ?? goods.buyCnt,
        name: goods.goodsOption === '' ? goods.displayGoodsName : goods.goodsOption,
        goodsOptionId: goods.goodsOptionId,
        cartId: goods.cartId,
        price: goods.paymentPricePerOne.number,
        maxCnt: goods.saleStock,
        isAddItemShow: false,
      };
    });

    const addGoodsItem = goodsOptionItem.addGoodsList.map((goods): ChildItemType => {
      const goodsError = errorData?.find((item) => item.cartId === goods.cartId);
      return {
        goodsId: goodsOptionItem.goodsId,
        buyCnt: goodsError?.saleStock ?? goods.buyCnt,
        name: goods.optionName,
        goodsOptionId: goods.goodsOptionId,
        cartId: goods.cartId,
        price: goods.paymentPricePerOne.number,
        maxCnt: goods.saleStock,
        isAddItemShow: true,
      };
    });

    originalChildItem.current = [...item, ...addGoodsItem].map((item) => ({ ...item }));

    setNewChildItem([...item, ...addGoodsItem]);
  }, [goodsOptionItem]);

  const { data } = useQuery({
    queryKey: ['getMiniCarts', goodsOptionItem.goodsId],
    queryFn: () => shoppingCartApi.getMiniCartList(goodsOptionItem.goodsId),
    enabled: isVisible,
  });

  const { mutate: updateCartsMutation } = useMutation({
    mutationFn: ({ cartId, goodsList }: { cartId: number; goodsList: UpdateCartBody[] }) =>
      shoppingCartApi.updateCart(cartId, goodsList),
    onSuccess: (resp) => {
      if (resp.success) {
        fetchCart();
        onHide();
      } else {
        showModal.text(shoppingCartErrorMsg(resp.data));
      }
    },
    onError: (error) => {
      console.error('수정 중 오류 발생:', error);
    },
  });

  const { mutate: addCart } = useMutation({
    mutationFn: (body: CreateCartBody[]) => shoppingCartApi.createCart(body),
    onSuccess: (response, v) => {
      if (response.success) {
        fetchCart();
        onHide();
      }
    },
    onError: (error) => {
      console.error('에러:', error);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (cartId: number[]) => {
      return shoppingCartApi.deleteCartList(cartId);
    },

    onSuccess: (_data) => {
      fetchCart();
      onHide();
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    },
  });

  const handleOptionAddChange = (value: GoodsOptionsList, topValue?: string[]) => {
    const item: ChildItemType = {
      goodsId: goodsOptionItem.goodsId,
      buyCnt: 1,
      name: topValue ? [...topValue, value.valueStr].join('/') : value.valueStr,
      goodsOptionId: value.goodsOptionId,
      price: value.optionSalePrice.number,
      maxCnt: value.totalStock,
      isAddItemShow: false,
    };

    // 중복 체크
    const otherOpAddId = newChildItem.findIndex((option) => item.goodsOptionId === option.goodsOptionId);

    if (otherOpAddId === -1) {
      setNewChildItem((prev) => [...prev, item]);
    } else {
      setNewChildItem((prev) => {
        return prev.map((item, index) => {
          if (index === otherOpAddId) {
            if (item.maxCnt >= item.buyCnt + 1) {
              item.buyCnt = item.buyCnt + 1;
              addToast('수량이 추가되었어요');
            }
          }

          return item;
        });
      });
    }
  };

  const modifyOrder = () => {
    showModal.text('변경된 옵션 정보로\n주문수정하시겠습니까?', {
      buttonType: 'multi',
      leftType: 'tertiary',
      rightonClick: async () => {
        const changedExistingItems = newChildItem.filter((newItem) => {
          const originalItem = originalChildItem.current.find(
            (origItem) => origItem.goodsOptionId === newItem.goodsOptionId,
          );
          return originalItem && originalItem.buyCnt !== newItem.buyCnt && newItem.cartId;
        });

        // 새로 추가된 아이템 찾기 (cartId가 없는 것들)
        const newItems = newChildItem.filter((item) => !item.cartId);

        // 삭제된 항목 찾기 (원본에는 있지만 newChildItem에는 없는 항목)
        const deletedItems = originalChildItem.current.filter(
          (origItem) => !newChildItem.some((newItem) => newItem.goodsOptionId === origItem.goodsOptionId),
        );

        try {
          const promises = [];
          // 변경된 항목과 삭제된 항목에 대한 업데이트 mutation 생성
          const updatePromises = changedExistingItems.map((item) =>
            updateCartsMutation({
              cartId: item.cartId!,
              goodsList: [
                {
                  goodsId: item.goodsId,
                  goodsOptionId: item.goodsOptionId === 0 ? undefined : item.goodsOptionId,
                  buyCnt: item.buyCnt,
                },
              ],
            }),
          );

          if (newItems.length > 0) {
            const newItemsBody = newItems.map((item) => ({
              buyNowYn: false,
              goodsId: item.goodsId,
              goodsOptionId: item.goodsOptionId === 0 ? undefined : item.goodsOptionId,
              buyCnt: item.buyCnt,
            }));
            promises.push(addCart(newItemsBody));
          }

          if (deletedItems.length > 0) {
            const cartIdsToDelete = deletedItems
              .filter((item) => item.cartId !== undefined)
              .map((item) => item.cartId!);

            if (cartIdsToDelete.length > 0) {
              updatePromises.push(deleteItem(cartIdsToDelete));
            }
          }

          // 모든 업데이트 요청을 병렬로 실행
          await Promise.all(updatePromises);
          await fetchCart();
          onHide();
        } catch (error) {
          showModal.text('주문 수정 중 오류가 발생했습니다.');
        }
      },
    });
  };

  const closeModify = () => {
    if (isEqual(originalChildItem.current, newChildItem)) {
      onHide();
    } else {
      showModal.text('변경된 옵션 정보가 있습니다.\n주문수정을 취소하시겠습니까?', {
        buttonType: 'multi',
        leftType: 'tertiary',
        rightonClick: () => {
          onHide();
        },
      });
    }
  };

  // 상품 수량 변경 핸들러
  const handleGoodsQuantityChange = (goodsOptionId: number, newQuantity: number) => {
    setNewChildItem((prevItems) =>
      prevItems.map((item) => (item.goodsOptionId === goodsOptionId ? { ...item, buyCnt: newQuantity } : item)),
    );
  };

  // 추가상품 Box 추가 핸들러
  const handleAddNewChild = (value: MiniCartAddGoods) => {
    const item: ChildItemType = {
      goodsId: goodsOptionItem.goodsId,
      buyCnt: 1,
      name: value.valueStr,
      goodsOptionId: value.goodsOptionId,
      price: value.price.number,
      maxCnt: value.totalStock,
      isAddItemShow: true,
    };

    // 중복 체크
    const otherOpAddId = newChildItem.findIndex((option) => item.goodsOptionId === option.goodsOptionId);

    if (otherOpAddId === -1) {
      setNewChildItem((prev) => [...prev, item]);
    } else {
      setNewChildItem((prev) => {
        return prev.map((item, index) => {
          if (index === otherOpAddId) {
            if (item.maxCnt >= item.buyCnt + 1) {
              item.buyCnt = item.buyCnt + 1;
              addToast('수량이 추가되었어요');
            }
          }

          return item;
        });
      });
    }
  };

  const getTotalPrice = () => {
    const total = newChildItem.reduce((acc, item) => {
      acc += item.buyCnt * item.price;
      return acc;
    }, 0);

    return total;
  };

  if (isVisible) {
    return (
      <Modal
        type='bottomSheet'
        onClickBackDrop={closeModify}
        onHide={closeModify}
        zIndex={110}
        bottomTitle='주문수정'
        fixedArea={
          <S.BtnBox>
            <S.SummaryView>
              <S.TextItem>
                <T.Body1_Normal>총</T.Body1_Normal> <T.Body1_NormalB $ml={3}>{newChildItem.length}</T.Body1_NormalB>
                <T.Body1_Normal>개</T.Body1_Normal>
              </S.TextItem>
              <S.TextItem>
                <T.Body2_NormalM
                  color={colors.text4}
                  $mr={2}
                >
                  총 금액
                </T.Body2_NormalM>
                <NonModalTooltip
                  trigerType='?'
                  isTop={true}
                  title='총 금액'
                  withDot={false}
                  items={['총 금액에는 배송비가 포함되어있지 않아요.', '결제 시 배송비가 추가될 수 있어요!']}
                />
                <T.Body1_NormalB $ml={8}>{numberWithCommas(getTotalPrice())}원</T.Body1_NormalB>
              </S.TextItem>
            </S.SummaryView>
            <TwoButton
              leftTitle={'취소'}
              rightTitle={'주문수정'}
              leftSize={4}
              rightSize={6}
              btnGap={8}
              leftType='tertiary'
              rightType='primary'
              size='lg'
              rightDisabled={errorData.length !== 0 ? false : isEqual(originalChildItem.current, newChildItem)}
              leftonClick={closeModify}
              rightonClick={modifyOrder}
            />
          </S.BtnBox>
        }
      >
        <S.OrderModifyContainer>
          {/* 다른 옵션 추가 selector */}
          {data?.data?.optionNameList && data?.data?.optionNameList.length > 0 && (
            <S.OtherOpPart>
              <T.Body2_NormalM>다른 옵션 추가</T.Body2_NormalM>
              <OptionSelector
                options={data?.data}
                optionCount={data?.data.optionNameList.length | 0}
                onChange={(value: GoodsOptionsList, topValue?: string[]) => {
                  if (topValue) {
                    handleOptionAddChange(value, topValue);
                  } else {
                    handleOptionAddChange(value);
                  }
                }}
              />
            </S.OtherOpPart>
          )}

          {/* 추가상품 selector */}
          {data?.data?.addGoodsList && data?.data?.addGoodsList.length > 0 && (
            <S.AddOpPart>
              <T.Body2_NormalM>추가상품</T.Body2_NormalM>
              {data?.data.addGoodsList?.map((item: MiniCartAddGoods, index: number) => {
                const options = item.addGoodsList.map((goods) => ({
                  label: goods.valueStr,
                  value: goods,
                  disabled: goods.saleStatusEnum.code !== GoodsSaleStatus.OnSale,
                }));

                return (
                  <Selector<MiniCartAddGoods>
                    key={index + item.valueStr}
                    options={options}
                    onChange={(value: MiniCartAddGoods) => {
                      handleAddNewChild(value);
                    }}
                    placeholder={item.valueStr}
                  />
                );
              })}
            </S.AddOpPart>
          )}

          {newChildItem.map((item, index) => (
            <S.OptionBoxWrap key={item.name + index}>
              <S.Info>
                {item.isAddItemShow && (
                  <S.AddOptionBedge>
                    <T.Caption2_NormalM color={colors.text5}>추가상품</T.Caption2_NormalM>
                  </S.AddOptionBedge>
                )}
                <S.Name>{item.name}</S.Name>
                <S.CloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewChildItem((prev) =>
                      prev.filter((childItem) => childItem.goodsOptionId !== item.goodsOptionId),
                    );
                  }}
                >
                  <SvgIcon
                    name={R.svg.icoClose}
                    tintColor={colors.icon4}
                  />
                </S.CloseButton>
              </S.Info>
              <S.QuantityInfo>
                <QuantityCounter
                  quantity={item.buyCnt}
                  maxValue={item.maxCnt}
                  setQuantity={(newQuantity) => handleGoodsQuantityChange(item.goodsOptionId || 0, newQuantity)}
                  width={32}
                />
                <S.OptionPrice>
                  {numberWithCommas(item.price * item.buyCnt)}
                  {currencyCodeToCurrency()}
                </S.OptionPrice>
              </S.QuantityInfo>
            </S.OptionBoxWrap>
          ))}
        </S.OrderModifyContainer>
      </Modal>
    );
  } else {
    return null;
  }
};

export default ProductModify;
