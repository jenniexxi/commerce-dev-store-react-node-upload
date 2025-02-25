import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import { OrderSummaryResp } from '@apis/orderApi';

import * as S from './_Order.style';

type Props = {
  summaryData?: OrderSummaryResp['data'];
};

const OrderSummary = ({ summaryData }: Props) => {
  return (
    <S.OrderSummaryContainer>
      <S.OrderSummaryItem>
        <dt>총 상품 금액</dt>
        <dd>
          {numberWithCommas(summaryData?.goodsPaymentPrice.number)}
          {currencyCodeToCurrency(summaryData?.goodsPaymentPrice.currencyCode ?? '')}
        </dd>
      </S.OrderSummaryItem>
      <S.OrderSummaryItem>
        <dt>총 할인 금액</dt>
        <dd>
          {numberWithCommas(summaryData?.discountPrice.number)}
          {currencyCodeToCurrency(summaryData?.discountPrice.currencyCode ?? '')}
        </dd>
        <S.OrderSummaryItemDep>
          <S.OrderSummaryItem>
            <dt>즉시할인</dt>
            <dd>
              {numberWithCommas(summaryData?.immediateDiscountPrice.number)}
              {currencyCodeToCurrency(summaryData?.immediateDiscountPrice.currencyCode ?? '')}
            </dd>
          </S.OrderSummaryItem>
          <S.OrderSummaryItem>
            <dt>쿠폰할인</dt>
            <dd>
              {numberWithCommas(summaryData?.couponDiscountPrice.number)}
              {currencyCodeToCurrency(summaryData?.couponDiscountPrice.currencyCode ?? '')}
            </dd>
          </S.OrderSummaryItem>
        </S.OrderSummaryItemDep>
      </S.OrderSummaryItem>
      <S.OrderSummaryItem>
        <dt>쇼핑지원금 사용</dt>
        <dd></dd>
      </S.OrderSummaryItem>
      <S.OrderSummaryItem>
        <dt>010PAY 포인트 사용</dt>
        <dd></dd>
      </S.OrderSummaryItem>
      <S.OrderSummaryItem>
        <dt>총 배송비</dt>
        <dd>
          {numberWithCommas(summaryData?.shippingPrice.number)}
          {currencyCodeToCurrency(summaryData?.shippingPrice.currencyCode ?? '')}
        </dd>
        <S.OrderSummaryItemDep>
          <S.OrderSummaryItem>
            <dt>기본 배송비</dt>
            <dd>
              {numberWithCommas(summaryData?.shippingPaymentPrice.number)}
              {currencyCodeToCurrency(summaryData?.shippingPaymentPrice.currencyCode ?? '')}
            </dd>
          </S.OrderSummaryItem>
          <S.OrderSummaryItem>
            <dt>지역 추가 배송비</dt>
            <dd>
              {numberWithCommas(summaryData?.addShippingPrice.number)}
              {currencyCodeToCurrency(summaryData?.addShippingPrice.currencyCode ?? '')}
            </dd>
          </S.OrderSummaryItem>
        </S.OrderSummaryItemDep>
      </S.OrderSummaryItem>
      <S.OrderSummaryTotal>
        <dt>총 결제 금액</dt>
        <dd>
          {numberWithCommas(summaryData?.pgPaymentPrice.number)}
          {currencyCodeToCurrency(summaryData?.pgPaymentPrice.currencyCode ?? '')}
        </dd>
      </S.OrderSummaryTotal>
    </S.OrderSummaryContainer>
  );
};

export default OrderSummary;
