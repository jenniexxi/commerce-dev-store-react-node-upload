import { T } from '@commons';

import { showPriceText, showShippingPriceText } from '@utils/display';

import { OrderSummaryData } from '@apis/orderApi';

import Separator from '@commons/Separator';

import * as S from './_Order.style';

type Props = {
  summaryData?: OrderSummaryData;
};

const OrderSummary = ({ summaryData }: Props) => {
  return (
    <S.OrderSummaryContainer>
      <S.SectionTitleWrap>
        <T.Headline2B>결제 금액</T.Headline2B>
      </S.SectionTitleWrap>
      <S.OrderSummaryItem>
        <dt>총 상품 금액</dt>
        <dd>{showPriceText(summaryData?.goodsPaymentPrice)}</dd>
      </S.OrderSummaryItem>
      <S.OrderSummaryItem>
        <dt>총 할인 금액</dt>
        <dd className='discount'>-{showPriceText(summaryData?.discountPrice)}</dd>
        <S.OrderSummaryItemDep>
          <S.OrderSummaryItem>
            <dt>즉시할인</dt>
            <dd>-{showPriceText(summaryData?.immediateDiscountPrice)}</dd>
          </S.OrderSummaryItem>
          <S.OrderSummaryItem>
            <dt>쿠폰할인</dt>
            <dd>-{showPriceText(summaryData?.couponDiscountPrice)}</dd>
          </S.OrderSummaryItem>
        </S.OrderSummaryItemDep>
      </S.OrderSummaryItem>

      {summaryData?.pay010MileageUseYn && (
        <S.OrderSummaryItem>
          <dt>라운드페이포인트 사용</dt>
          <dd>-{showPriceText(summaryData?.usePay010Mileage)}</dd>
        </S.OrderSummaryItem>
      )}
      <Separator
        $height={1}
        $mv={16}
      />

      <S.OrderSummaryItem>
        <dt>총 배송비</dt>
        <dd>{showShippingPriceText(summaryData?.shippingPrice)}</dd>
        <S.OrderSummaryItemDep>
          <S.OrderSummaryItem>
            <dt>기본 배송비</dt>
            <dd>{showShippingPriceText(summaryData?.shippingPaymentPrice)}</dd>
          </S.OrderSummaryItem>
          <S.OrderSummaryItem>
            <dt>지역 추가 배송비</dt>
            <dd>{showShippingPriceText(summaryData?.addShippingPrice)}</dd>
          </S.OrderSummaryItem>
        </S.OrderSummaryItemDep>
      </S.OrderSummaryItem>
      <Separator
        $height={1}
        $mv={16}
      />
      <S.OrderSummaryTotal>
        <dt>총 결제 금액</dt>
        <dd>{showPriceText(summaryData?.pgPaymentPrice)}</dd>
        {summaryData?.pay010MileageUseYn && (
          <S.OrderSummaryItemDep>
            <S.OrderSummaryItem>
              <dt>적립예정 라운드페이포인트</dt>
              <dd>{showPriceText(summaryData?.totalDepositExpectedPay010Mileage)}</dd>
            </S.OrderSummaryItem>
          </S.OrderSummaryItemDep>
        )}
      </S.OrderSummaryTotal>
    </S.OrderSummaryContainer>
  );
};

export default OrderSummary;
