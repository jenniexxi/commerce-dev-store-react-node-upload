import { Selector } from '@components';
import { GOODS_CUSTOM_MADE_TYPE } from '@type';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { showPriceText } from '@utils/display';

import { CustomGoods } from '../ClaimRequest';
import * as S from './ClaimFeatures.style';

type OrderProductProps = {
  item: CustomGoods;
  shippingListItemChange: (orderItemIdEncrypt: string, checked?: boolean, value?: number) => void;
  withCheckbox?: boolean;
  title: string;
};

const ClaimPdItemGroup = ({ item, shippingListItemChange, withCheckbox, title }: OrderProductProps) => {
  const handleCheckboxChange = (checked: boolean, orderItemIdEncrypt: string) => {
    shippingListItemChange(orderItemIdEncrypt, checked);
  };

  const handleChangeSelectValue = (value: number, orderItemIdEncrypt: string) => {
    shippingListItemChange(orderItemIdEncrypt, undefined, value);
  };

  const createOptionLists = (goodsOption: CustomGoods) => {
    let optionList: { label: string; value: number }[] = [];
    for (let index = 1; index <= goodsOption.buyCnt; index++) {
      optionList.push({ label: index.toString(), value: index });
    }

    return optionList;
  };

  return (
    <>
      <S.ItemBox>
        <S.ItemDetail>
          {withCheckbox && (
            <S.ItemCheckbox
              checked={item.isChecked}
              onChange={(checked) => handleCheckboxChange(checked, item.orderItemIdEncrypt)}
              id={`OrderProductCheck-${item.goodsId}`}
              name={`OrderProductCheck-${item.goodsId}`}
            />
          )}
          <S.DisplayImg
            src={item.imageFilesUrl}
            alt={item.displayGoodsName}
          />
          <S.DetailBox>
            <S.DetailBrand>{item.brandName}</S.DetailBrand>
            <S.DetailGoodsName>{item.displayGoodsName}</S.DetailGoodsName>
            {item.goodsOption ? (
              <S.DetailOption>
                <span>{item.goodsOption}</span>
                <em>{item.buyCnt}개</em>
              </S.DetailOption>
            ) : (
              <S.DetailOption>
                <span>옵션 없음</span>
              </S.DetailOption>
            )}
            {item.goodsTypeEnum.code === GOODS_CUSTOM_MADE_TYPE.CUSTOM_MADE ||
            GOODS_CUSTOM_MADE_TYPE.CUSTOM_MADE_DEAL ? (
              <S.PdIsCustom>
                주문 제작 상품{' '}
                <NonModalTooltip
                  title='주문 제작 상품'
                  trigerColor={colors.icon4}
                  trigerType='?'
                  position='center'
                  showCloseButton={true}
                  defaultShown={false}
                  withDot={false}
                  items={[
                    '이 상품은 주문 제작 상품으로 구매자에 따라 개별 맞춤 제작되며, 판매자에 의해 반품/교환이 제한될 수 있습니다.',
                  ]}
                />
              </S.PdIsCustom>
            ) : (
              <></>
            )}
            <S.PriceItem>{showPriceText(item.itemPaymentPrice)}</S.PriceItem>
            {title === '교환' &&
              (withCheckbox ? (
                <>
                  {item.availableClaimCnt > 0 ? (
                    <>
                      <S.ExchangeAbleText>교환 가능 수량 : {item.availableClaimCnt}</S.ExchangeAbleText>
                      <S.AmountGroup>
                        <span>교환 수량</span>
                        <S.AmountSelector>
                          <Selector
                            options={createOptionLists(item)}
                            onChange={(value) => handleChangeSelectValue(value as number, item.orderItemIdEncrypt)}
                            defaultValue={item.valueCnt}
                            width={100}
                            unit='개'
                            disable={item.buyCnt === 1}
                          />
                        </S.AmountSelector>
                      </S.AmountGroup>
                    </>
                  ) : (
                    <S.ExchangeNonAbleText>재고가 부족하여 교환이 불가합니다.</S.ExchangeNonAbleText>
                  )}
                </>
              ) : (
                <S.AmountGroup>
                  <span>교환 수량 : {item.valueCnt}개</span>
                </S.AmountGroup>
              ))}
          </S.DetailBox>
        </S.ItemDetail>
      </S.ItemBox>
      {item.addList?.map((addItem: CustomGoods) => (
        <S.AddtionalBox key={addItem.orderItemIdEncrypt}>
          {withCheckbox && (
            <S.ItemCheckbox
              checked={addItem.isChecked}
              onChange={(check) => handleCheckboxChange(check, addItem.orderItemIdEncrypt)}
              id={`OrderProductCheck-${addItem.goodsId}`}
              name={`OrderProductCheck-${addItem.goodsId}`}
            />
          )}
          <S.ItemDetail>
            <S.DisplayImg
              src={addItem.imageFilesUrl}
              alt={addItem.displayGoodsName}
            />
            <S.DetailBox>
              <S.AddBedge>추가상품</S.AddBedge>
              {addItem.goodsOption ? (
                <S.DetailOption>
                  <span>{addItem.goodsOption}</span>
                  <em>{addItem.buyCnt}개</em>
                </S.DetailOption>
              ) : (
                <S.DetailOption>
                  <span>옵션 없음</span>
                </S.DetailOption>
              )}
              <S.PriceItem>{showPriceText(addItem.itemPaymentPrice)}</S.PriceItem>
              {title === '교환' &&
                (withCheckbox ? (
                  <>
                    {addItem.availableClaimCnt > 0 ? (
                      <>
                        <S.ExchangeAbleText>교환 가능 수량 : {addItem.availableClaimCnt}</S.ExchangeAbleText>
                        <S.AmountGroup>
                          <span>교환 수량</span>
                          <S.AmountSelector>
                            <Selector
                              options={createOptionLists(addItem)}
                              onChange={(value) => handleChangeSelectValue(value as number, addItem.orderItemIdEncrypt)}
                              defaultValue={addItem.valueCnt}
                              width={100}
                              unit='개'
                              disable={addItem.buyCnt === 1}
                            />
                          </S.AmountSelector>
                        </S.AmountGroup>
                      </>
                    ) : (
                      <S.ExchangeNonAbleText>재고가 부족하여 교환이 불가합니다.</S.ExchangeNonAbleText>
                    )}
                  </>
                ) : (
                  <S.AmountGroup>
                    <span>교환 수량 : {addItem.valueCnt}개</span>
                  </S.AmountGroup>
                ))}
            </S.DetailBox>
          </S.ItemDetail>
        </S.AddtionalBox>
      ))}
    </>
  );
};

export default ClaimPdItemGroup;
