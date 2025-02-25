import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
import { Button, Checkbox, Footer, Modal, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GoodsDisplaySalesStatus, GoodsDisplaySalesStatusKey } from '@type';
import { difference, uniqBy } from 'lodash';

import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import { numberWithCommas, showPriceText } from '@utils/display';
import { availablePurchaseErrorHandler } from '@utils/errorMsg';
import R from '@utils/resourceMapper';

import { Code, Price } from '@apis/apiCommonType';
import promotionApi from '@apis/promotionApi';
import shoppingCartApi, { AddGoods, CartsList, Goods, ShippingInfo } from '@apis/shoppingCartApi';

import ArrowTop from '@commons/ArrowTop';
import SvgIcon from '@commons/SvgIcon';

import * as S from './ShoppingCart.style';
import ProductSectionItem from './features/ProductSectionItem';

export type CustomCartItem = {
  companyId: number;
  storeName: string;
  isChecked: boolean;
  disabled: boolean;
  shippingList: CustomShippingList[];
};

export type CustomShippingList = {
  shipping: ShippingInfo;
  goodsList: CustomGoods[];
};

export type CustomGoods = {
  cartIdList: number[];
  cartId: number;
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  shippingPaymentPrice: Price;
  adultYn: boolean;
  totalRecommendPrice: Price;
  totalPaymentPrice: Price;
  optionList: Goods[];
  isChecked: boolean;
  disabled: boolean;
  addGoodsList: AddGoods[];
  shippingPolicyConditionText: string;
};

const ShoppingCart = () => {
  const [checkAll, setCheckall] = useState(true);
  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);
  const [isModifyPayTotalOpen, setIsModifyPayTotalOpen] = useState(false);
  const [cartData, setCartData] = useState<CustomCartItem[]>([]);

  const [totlaAmount, setTotalAmount] = useState(0);
  let interval: NodeJS.Timeout;

  const navigate = useNavigate();
  useHeader('장바구니', { showHeader: true });

  const initCart = useRef(false); // 최초 진입 시, 초기화 여부 확인 (진입할 때마다 false)

  // useEffect(() => {
  //   fetchCartData();
  // }, []);

  // const fetchCartData = (): Promise<void> => {
  //   setIsLoading(true);
  //   return shoppingCartApi
  //     .getCartList()
  //     .then((resp) => {
  //       setCartData((prev) => transformCartList(resp.data, prev));
  //       setIsLoading(false);
  //     })
  //     .catch(() => setIsLoading(false));
  // };
  const {
    data,
    isLoading,
    refetch: fetchCartData,
  } = useQuery({
    queryKey: ['getShoppingCart'],
    queryFn: () => shoppingCartApi.getCartList(),
    staleTime: 0,
    gcTime: 0,
  });

  const { data: summaryData } = useQuery({
    queryKey: ['getShopsTotalCarts', selectedCartId],
    queryFn: () => shoppingCartApi.getCartTotal(selectedCartId),
    enabled: data?.success && selectedCartId.length !== 0,
  });

  const { data: couponData, refetch: refetchCoupon } = useQuery({
    queryKey: ['getGoodsCoupon'],
    queryFn: () => promotionApi.getCartCouponList(),
  });

  const countByTime = (pnt: number) => {
    const shard = pnt / 10;
    let sum = 0;

    interval = setInterval(() => {
      if (sum >= pnt) {
        setTotalAmount(pnt);
        clearInterval(interval);
      } else {
        setTotalAmount(sum);
        sum += shard;
      }
    }, 30);
  };

  useEffect(() => {
    if (data) {
      setCartData((prev) => transformCartList(data?.data, prev));
      console.log('transform complete');
    }
  }, [data]);

  useEffect(() => {
    console.log('selectedCart change', selectedCartId);
  }, [selectedCartId]);

  useEffect(() => {
    if (summaryData?.data.summery.paymentPrice) {
      if (interval) {
        clearInterval(interval);
        interval.unref;
      }
      countByTime(summaryData?.data.summery.paymentPrice.number);
    }
  }, [summaryData]);

  useEffect(() => {
    if (cartData.length > 0) {
      const allChecked = cartData?.every((item) => item.isChecked);
      setCheckall(allChecked ? allChecked : false);
      console.log('cartdata change');
      if (!initCart.current && cartData && cartData.length > 0) {
        updateAllCartChecked(true);

        initCart.current = true;
      }
    }
  }, [cartData]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: (cartId: number[]) => {
      console.log(cartId);
      return shoppingCartApi.deleteCartList(cartId);
    },

    onSuccess: (_data, valiable) => {
      setSelectedCartId(difference(selectedCartId, valiable));
      fetchCartData();
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    },
  });

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

  const transformCartList = (cartsList: CartsList[], prevData: CustomCartItem[]): CustomCartItem[] => {
    return cartsList.map((cart) => {
      const prevCompany = prevData?.find((prev) => prev.companyId === cart.company.companyId);
      const disableStates: boolean[] = [];

      const transformedShippingList = cart.shippingList.map((shippingGroup) => {
        // goodsId를 기준으로 상품들을 그룹화
        const groupedGoods = shippingGroup.goodsList.reduce(
          (acc, goods) => {
            const key = goods.goodsId;
            if (!acc[key]) {
              acc[key] = {
                goods: [],
                baseInfo: {
                  displaySaleStatusEnum: goods.displaySaleStatusEnum,
                  goodsId: goods.goodsId,
                  imageFilesUrl: goods.imageFilesUrl,
                  brandName: goods.brandName,
                  displayGoodsName: goods.displayGoodsName,
                  shippingPaymentPrice: goods.shippingPaymentPrice,
                  adultYn: goods.adultYn,
                },
              };
            }
            acc[key].goods.push(goods);
            return acc;
          },
          {} as Record<number, { goods: Goods[]; baseInfo: Partial<CustomGoods> }>,
        );

        // 그룹화된 상품들을 CustomGoods 형태로 변환
        const transformedGoodsList = Object.entries(groupedGoods).map(([goodsId, group]) => {
          const allCartIds = group.goods.map((g) => g.cartId);

          // 전체 결제 금액 계산 (옵션 + 추가상품)
          const optionsTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.paymentPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          const optionsRecommendTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.recommendPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          // 그룹 내 상품들의 disabled 상태 확인
          const isAnyDisabled = group.goods.some(
            (goods) => goods.displaySaleStatusEnum.code !== GoodsDisplaySalesStatus.OnSale,
          );
          disableStates.push(isAnyDisabled);

          // 그룹의 체크 상태 계산
          const prevCheckedState =
            prevCompany?.shippingList
              .flatMap((s) => s.goodsList)
              .find((g) => g.cartIdList.includes(group.goods[0].cartId))?.isChecked ?? true;

          // CustomGoods 형태로 변환
          return {
            cartIdList: allCartIds,
            ...group.baseInfo,
            totalPaymentPrice: {
              number: optionsTotalPrice,
              currencyCode: group.goods[0].paymentPrice.currencyCode,
            },
            totalRecommendPrice: {
              number: optionsRecommendTotalPrice,
              currencyCode: group.goods[0].recommendPrice.currencyCode,
            },
            optionList: group.goods,
            isChecked: isAnyDisabled ? false : prevCheckedState,
            disabled: isAnyDisabled,
            addGoodsList: group.goods.flatMap((goods) => goods.addGoodsList || []),
          } as CustomGoods;
        });

        return {
          shipping: shippingGroup.shipping,
          goodsList: transformedGoodsList,
        };
      });

      const isAllDisabled = disableStates.length > 0 && disableStates.every((state) => state);

      return {
        companyId: cart.company.companyId,
        storeName: cart.company.storeName,
        isChecked: prevCompany?.isChecked ?? true,
        disabled: isAllDisabled,
        shippingList: transformedShippingList,
      };
    });
  };

  // 전체 선택/해제 핸들러 (그룹핑)
  const updateAllCartChecked = (checked: boolean) => {
    setCheckall(checked);

    setCartData((prev) =>
      prev?.map((cart) => ({
        ...cart,
        isChecked: checked,
        shippingList: cart.shippingList.map((shippingGroup) => ({
          ...shippingGroup,
          goodsList: shippingGroup.goodsList.map((goods) => ({
            ...goods,
            isChecked: checked,
          })),
        })),
      })),
    );

    if (checked) {
      const allCartIds =
        cartData?.flatMap((cart) =>
          cart.shippingList.flatMap((shipping) => shipping.goodsList.flatMap((goods) => [...goods.cartIdList])),
        ) || [];
      console.log(allCartIds);
      setSelectedCartId(allCartIds);
    } else {
      setSelectedCartId([]);
    }
  };

  const handleSelectCompany = (checked: boolean, companyId: number) => {
    if (!checked) {
      setCheckall(false);
    }

    const companyCartIds =
      cartData
        ?.find((company) => company.companyId === companyId)
        ?.shippingList.flatMap((shipping) => shipping.goodsList.flatMap((goods) => [...goods.cartIdList])) || [];

    setSelectedCartId((prev) => {
      if (checked) {
        return [...new Set([...prev, ...companyCartIds])];
      } else {
        return prev.filter((id) => !companyCartIds.includes(id));
      }
    });

    setCartData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((company) => {
        if (company.companyId === companyId) {
          return {
            ...company,
            isChecked: checked,
            shippingList: company.shippingList.map((shippingItem) => ({
              ...shippingItem,
              goodsList: shippingItem.goodsList.map((goods) => ({
                ...goods,
                isChecked: checked,
              })),
            })),
          };
        }
        return company;
      });
    });
  };

  const handleSelectItem = (checked: boolean, companyId: number, goodsId: number) => {
    if (!checked) {
      setCheckall(false);
    }

    const goods = cartData
      ?.find((company) => company.companyId === companyId)
      ?.shippingList.flatMap((shipping) => shipping.goodsList)
      .find((goods) => goods.goodsId === goodsId);

    const allCartIds = goods?.cartIdList || [];

    setSelectedCartId((prev) => {
      if (checked) {
        return [...prev, ...allCartIds];
      } else {
        return prev.filter((id) => !allCartIds.includes(id));
      }
    });

    setCartData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((company) => {
        if (company.companyId === companyId) {
          const shippingList = company.shippingList.map((shippingItem) => ({
            ...shippingItem,
            goodsList: shippingItem.goodsList.map((goods) => {
              if (goods.goodsId === goodsId) {
                return {
                  ...goods,
                  isChecked: checked,
                };
              } else {
                return goods;
              }
            }),
          }));

          const allChecked = shippingList.every((shipping) => shipping.goodsList.every((goods) => goods.isChecked));

          return {
            ...company,
            isChecked: allChecked,
            shippingList,
          };
        }
        return company;
      });
    });
  };

  // 선택된 아이템 주문결제로 전달하기
  const movoToOrder = () => {
    checkAvaliable(selectedCartId);
  };

  // 카드 비었을 때 쇼핑히러 가기
  const gotoShopping = () => {
    navigate('/');
  };

  // 선택 삭제 버튼 클릭 시 팝업 표시
  const handleSelectDelete = () => {
    if (selectedCartId.length === 0) {
      showModal.text('삭제할 상품을\n선택하세요');
    } else {
      showModal.text('선택한 상품을\n삭제하시겠습니까?', {
        buttonType: 'multi',
        rightonClick: () => {
          deleteItem(selectedCartId);
        },
      });
    }
  };

  const deleteSingleItem = (cartId: number[]) => {
    deleteItem(cartId);
  };

  // 품절 삭제 버튼 클릭 시 팝업 표시
  const handleSoldOutDelete = () => {
    showModal.text('품절 및 판매중지된 상품을\n모두 삭제하겠습니까?', {
      buttonType: 'multi',
      rightonClick: () => {
        const soldOutCartIds = cartData?.flatMap((i) =>
          i.shippingList.flatMap((ships) =>
            ships.goodsList.flatMap((optionItem) =>
              optionItem.optionList
                .filter((item) => {
                  const code = item.displaySaleStatusEnum.code;
                  return (
                    code === GoodsDisplaySalesStatus.SoldOut ||
                    code === GoodsDisplaySalesStatus.Stop ||
                    code === GoodsDisplaySalesStatus.End
                  );
                })
                .map((item) => item.cartId),
            ),
          ),
        );
        if (soldOutCartIds && soldOutCartIds?.length > 0) {
          deleteItem(soldOutCartIds);
        }
      },
    });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {/* 카드 비었을때 조건 추가 */}
      {cartData?.length === 0 ? (
        <S.NonContsWrapper>
          <S.TopContsSec>
            <SvgIcon
              name={R.svg.icoExclamationCircleFill}
              width={80}
              height={80}
            />
            <p>장바구니에 담긴 상품이 없습니다.</p>
            <Button
              title='쇼핑하러 가기'
              size='sm'
              onClick={gotoShopping}
            />
          </S.TopContsSec>
          <S.ContsSec>상품 추가할 부분</S.ContsSec>
        </S.NonContsWrapper>
      ) : (
        <S.ContsWrapper>
          <S.PickSummary>
            <Checkbox
              id='allChoice'
              name='allChoice'
              value='전체선택'
              checked={checkAll}
              onChange={(checked) => {
                updateAllCartChecked(checked);
              }}
            />
            <S.TopRightButtonWrap>
              <Button
                size='xsm'
                title='품절삭제'
                onClick={handleSoldOutDelete}
                btnType='tertiary'
              />
              <Button
                size='xsm'
                title='선택삭제'
                onClick={handleSelectDelete}
                btnType='tertiary'
              />
            </S.TopRightButtonWrap>
          </S.PickSummary>

          {cartData?.map((item, groupIndex) => {
            return (
              <ProductSectionItem
                key={'productSection' + groupIndex}
                item={item}
                storeName={item.storeName}
                companyId={item.companyId}
                summaryInfo={summaryData?.data.companySummery || {}}
                couponInfo={uniqBy(couponData?.data[item.companyId], 'couponId') || []}
                refetchCoupon={refetchCoupon}
                deleteItem={deleteSingleItem}
                checkCompanyItem={handleSelectCompany}
                checkSingleItem={handleSelectItem}
                fetchCart={fetchCartData}
              />
            );
          })}
          <S.InfoList>
            <li>장바구니의 전체 상품 옵션은 최대 100개까지 담을 수 있습니다.</li>
            <li>장바구니에 담긴 상품은 최대 90일간 보관 후 삭제됩니다.</li>
            <li>가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.</li>
          </S.InfoList>
          <S.ProductTotal>
            <S.ItemDl>
              <S.ItemTitle>선택상품금액</S.ItemTitle>
              <S.ItemPrice>{showPriceText(summaryData?.data.summery.goodsPaymentPrice)}</S.ItemPrice>
            </S.ItemDl>
            <S.ItemDl>
              <S.ItemTitle>즉시할인금액</S.ItemTitle>
              <S.ItemDiscount>
                {selectedCartId.length > 0 ? '-' : ''}
                {showPriceText(summaryData?.data.summery.discountPrice)}
              </S.ItemDiscount>
            </S.ItemDl>
            <S.ItemDl>
              <S.ItemTitle>총 배송비</S.ItemTitle>
              <S.ItemPrice>{showPriceText(summaryData?.data.summery.shippingPaymentPrice)}</S.ItemPrice>
            </S.ItemDl>
            <S.ItemTotal>
              <dt>총 결제예정금액</dt>
              <dd>{showPriceText(summaryData?.data.summery.paymentPrice)}</dd>
            </S.ItemTotal>
          </S.ProductTotal>
          <Footer />
          <S.BottomPadding />
          <S.TotalBottom $isExpend={isModifyPayTotalOpen}>
            <S.Handle onClick={() => setIsModifyPayTotalOpen(!isModifyPayTotalOpen)}>
              <SvgIcon
                name={R.svg.icoChevronDown}
                tintColor={colors.icon4}
                width={20}
                height={20}
              />
            </S.Handle>
            <S.PayBox>
              <S.AmountDl>
                <S.AmountDt>
                  <T.Body2_NormalM>선택상품금액</T.Body2_NormalM>
                </S.AmountDt>
                <S.AmountDd>
                  <T.Body1_NormalM>{showPriceText(summaryData?.data.summery.goodsPaymentPrice)}</T.Body1_NormalM>
                </S.AmountDd>
              </S.AmountDl>
              <S.AmountDl>
                <S.AmountDt>
                  <T.Body2_NormalM>즉시할인금액</T.Body2_NormalM>
                </S.AmountDt>
                <S.AmountDd $isMinus={true}>
                  <T.Body1_NormalM>-{showPriceText(summaryData?.data.summery.discountPrice)}</T.Body1_NormalM>
                </S.AmountDd>
              </S.AmountDl>
              <S.AmountDl>
                <S.AmountDt>
                  <T.Body2_NormalM>총 배송비</T.Body2_NormalM>
                </S.AmountDt>
                <S.AmountDd>
                  <T.Body1_NormalM>{showPriceText(summaryData?.data.summery.shippingPaymentPrice)}</T.Body1_NormalM>
                </S.AmountDd>
              </S.AmountDl>
            </S.PayBox>
            <S.TotalPriceBox>
              <S.TotalBox>
                <S.TotalText>
                  총 <span>{selectedCartId.length}</span>개
                </S.TotalText>
                <S.Arrow onClick={() => setIsModifyPayTotalOpen(!isModifyPayTotalOpen)}>
                  <ArrowTop />
                </S.Arrow>
              </S.TotalBox>
              <S.PriceBox>
                <Button
                  title={
                    selectedCartId.length === 0
                      ? '상품을 선택해주세요'
                      : numberWithCommas(totlaAmount) + '원' + ' 구매하기'
                  }
                  textHighLight={true}
                  size='md'
                  align='center'
                  disabled={selectedCartId.length === 0}
                  // // 선택된 아이템 주문결제로 전달하기
                  onClick={movoToOrder}
                />
              </S.PriceBox>
            </S.TotalPriceBox>
          </S.TotalBottom>
        </S.ContsWrapper>
      )}
    </>
  );
};

export default ShoppingCart;
