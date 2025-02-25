import { ADD_SHIPPING_PRICE_AREA_CODES } from '@type';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { showPriceText, showShippingPriceText } from '@utils/display';

import { DetailsContent, ShippingInfo } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
  shippingInfo?: ShippingInfo;
};

const ProductDileveryInfo = ({ goodsInfo, shippingInfo }: Props) => {
  if (!goodsInfo || !shippingInfo) return;
  return (
    <S.ProdListInfoView>
      <S.ToolTipView className='toolTipView02'>
        <p className='tipTitle'>무이자 혜택보기</p>
        <NonModalTooltip
          title='무이자 혜택보기'
          trigerColor={colors.icon4}
          trigerType='!'
          position='center'
          showCloseButton={true}
          defaultShown={false}
          withDot={true}
          items={['추후 업데이트 예정이에요!']}
        />
      </S.ToolTipView>
      {goodsInfo.buyerMaxBuyCnt !== null && (
        <S.RowView className='item'>
          <span className='th'>구매정보</span>
          <div className='td'>
            <div className='type01'>최대 구매 {goodsInfo.buyerMaxBuyCnt}개 (1인)</div>
          </div>
        </S.RowView>
      )}
      <S.ProdListInfoViewItem>
        <S.RowView className='item'>
          <span className='th'>배송비</span>
          <div className='td'>
            <div className='type01'>{showShippingPriceText(shippingInfo.basicShippingPrice)}</div>
            <p className='type02'>
              {shippingInfo.shippingAreaEnum?.code !== ADD_SHIPPING_PRICE_AREA_CODES.NONE
                ? `제주/도서산간 추가배송비 ${showPriceText(shippingInfo.addShippingPrice)}`
                : '제주 / 도서산간 무료배송'}
            </p>
            {shippingInfo.shippingAreaEnum?.code === ADD_SHIPPING_PRICE_AREA_CODES.SECTION_3 && (
              <p className='type02'>도서산간 추가배송비 {showPriceText(shippingInfo.addShippingPrice2)}</p>
            )}
          </div>
        </S.RowView>
        <S.RowView className='item'>
          <span className='th'>배송기간</span>
          <div className='td'>
            <div className='type01'>
              <S.ToolTipView className='toolTipView02'>
                <p className='tipTitle'>{shippingInfo.expectedDeliveryDayText}</p>
                <NonModalTooltip
                  title='예상 배송일'
                  trigerColor={colors.icon4}
                  trigerType='!'
                  position='center'
                  showCloseButton={true}
                  defaultShown={false}
                  withDot={true}
                  items={[
                    '도착 예정일은 배송지 설정에 따라 달라질 수 있습니다',
                    '스토어 및 택배사 사정에 따라 실제 배송 완료일은 다를 수 있습니다',
                    '예상 배송일은 영업일 기준이며, 주말/공휴일은 계산에서 제외됩니다',
                  ]}
                />
              </S.ToolTipView>
            </div>
            <p className='type02'>{shippingInfo.expectedArrivalPeriodText}</p>
          </div>
        </S.RowView>
        {shippingInfo.deliveryTimePercentageList.map((item, index) => (
          <S.RowView
            key={index}
            className='item deliverBar'
          >
            <span className='th'>{item.deliveryTimeText}</span>
            <div className='td'>
              <div className='barWrap'>
                <span className='bar'>
                  <S.DeliverBarPercent width={`${item.percentage}%`} />
                </span>
                <span className='percent'>{item.percentage}%</span>
              </div>
            </div>
          </S.RowView>
        ))}
        <S.DeliverInfo>
          <strong>이 상품의 배송기간</strong> 영업일 기준, 주말/공휴일 제외
        </S.DeliverInfo>
        {goodsInfo.returnCareYn && (
          <S.ReturnCare>
            <S.ToolTipView className='toolTipView02'>
              <p className='tipTitle'>
                리턴케어상품은
                <span className='higtlighter'>
                  <u>최초 1회 교환/반품 배송비가 무료에요</u>
                </span>
              </p>
              <NonModalTooltip
                title='리턴케어상품'
                trigerColor={colors.icon4}
                trigerType='!'
                position='center'
                showCloseButton={true}
                defaultShown={false}
                withDot={true}
                items={[
                  '리턴케어상품 태그가 있다면 주문 건당 최초 1회 교환/반품 배송비가 무료입니다',
                  '단, 교환/반품의 상품 상태에 따라 스토어에서 적용한 교환/반품 승인을 우선적으로 적용됩니다',
                  '판매자와 구매자가 동일하거나 이외 부정적인 방법으로 교환/반품이 이루어진 경우 무료 교환/반품이 불가합니다',
                  <>
                    <button
                      type='button'
                      className='linkTxt'
                    >
                      <u>리턴케어 혜택 자세히 보기</u>
                    </button>
                  </>,
                ]}
              />
            </S.ToolTipView>
            <p className='desc'>도서산간/제주도 배송비는 별도 부과되요</p>
          </S.ReturnCare>
        )}
      </S.ProdListInfoViewItem>
    </S.ProdListInfoView>
  );
};

export default ProductDileveryInfo;
