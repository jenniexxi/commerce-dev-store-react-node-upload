import { GOODS_CUSTOM_MADE_TYPE, ItemStateKey } from '@type';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { showPriceText } from '@utils/display';

import { OrderCheckResponse } from '@apis/orderApi';

import * as S from './OrderHistoryDetail.style';

type OrderProductProps = {
  item: OrderCheckResponse;
  renderOneCancelStatus: (code: ItemStateKey, orderItemIdEncrypt: string) => JSX.Element;
  renderByShippingBtnStatus: (code: ItemStateKey, orderItemIdEncrypt: string) => JSX.Element;
};

const OrderProductGroup = ({ item, renderOneCancelStatus, renderByShippingBtnStatus }: OrderProductProps) => {
  return (
    <>
      <S.ItemBoxAllWrap>
        <S.ItemBox key={item.goodsId}>
          <S.PayState $code={item.itemStatusEnum.code || item.claimTypeEnum.code}>
            {item.itemStatusEnum.codeName || item.claimTypeEnum.codeName}
          </S.PayState>
          <S.ItemDetail>
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
              <S.PriceItem>
                {showPriceText(item.itemPaymentPrice)}
                {item.totalDiscountPrice && (
                  <NonModalTooltip
                    title='할인금액'
                    trigerColor={colors.icon4}
                    trigerType='?'
                    position='center'
                    showCloseButton={true}
                    defaultShown={false}
                    withDot={false}
                  >
                    <S.DiscountToolTipBox key={item.goodsId + item.shippingPolicyId}>
                      <S.DiscountList>
                        <li>
                          <S.DiscountTxt>즉시할인</S.DiscountTxt>
                          <S.DiscountPrice>{showPriceText(item.immediateDiscountPrice)}</S.DiscountPrice>
                        </li>
                        <li>
                          <S.DiscountTxt>쿠폰할인</S.DiscountTxt>
                          <S.DiscountPrice>{showPriceText(item.couponDiscountPrice)}</S.DiscountPrice>
                        </li>
                      </S.DiscountList>
                      <S.TotalBox>
                        <S.DiscountTxt>총 할인금액</S.DiscountTxt>
                        <S.DiscountTotalPrice>{showPriceText(item.totalDiscountPrice)}</S.DiscountTotalPrice>
                      </S.TotalBox>
                    </S.DiscountToolTipBox>
                  </NonModalTooltip>
                )}
              </S.PriceItem>
            </S.DetailBox>
          </S.ItemDetail>
          <S.BtnWrap>
            {renderOneCancelStatus && renderOneCancelStatus(item.itemStatusEnum.code, item.orderItemIdEncrypt)}
            {renderByShippingBtnStatus && renderByShippingBtnStatus(item.itemStatusEnum.code, item.orderItemIdEncrypt)}
          </S.BtnWrap>
        </S.ItemBox>
        {item.addList?.map((addItem) => {
          return (
            <S.AddtionalBox key={addItem.orderItemIdEncrypt}>
              <S.PayState $code={addItem.itemStatusEnum.code || addItem.claimTypeEnum.code}>
                {addItem.itemStatusEnum.codeName || addItem.claimTypeEnum.codeName}
              </S.PayState>
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
                </S.DetailBox>
              </S.ItemDetail>
              <S.BtnWrap>
                {renderOneCancelStatus &&
                  renderOneCancelStatus(addItem.itemStatusEnum.code, addItem.orderItemIdEncrypt)}
                {renderByShippingBtnStatus &&
                  renderByShippingBtnStatus(item.itemStatusEnum.code, item.orderItemIdEncrypt)}
              </S.BtnWrap>
            </S.AddtionalBox>
          );
        })}
      </S.ItemBoxAllWrap>
    </>
  );
};

export default OrderProductGroup;
