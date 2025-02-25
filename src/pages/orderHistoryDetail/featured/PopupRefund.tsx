import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import { ClaimList } from '@apis/orderApi';

import * as S from '../OrderHistoryDetail.style';

type PopupRefundProps = {
  claimDetails: ClaimList[];
  claimType: 'cancel' | 'return';
};

const PopupRefund = ({ claimDetails, claimType }: PopupRefundProps) => {
  const popTitle = claimType === 'cancel' ? '취소' : '반품';

  return (
    <S.HistoryPopWrapper>
      <h2>{popTitle} 환불내역</h2>
      <S.HistoryPopContainer>
        {claimDetails.map((item, index) => {
          return (
            <S.RefundPannel key={`${item}-${index}`}>
              <S.TitleBox>
                <h3>환불 처리일자</h3>
                <S.DescDate>{item.paymentDate}</S.DescDate>
              </S.TitleBox>
              <S.ContsPart>
                <div>
                  <div>shop name</div>
                  <div>{item.goodsNameList}</div>
                  <div>option | 개수</div>
                </div>
                <div>
                  <dl>
                    <dt>총 환불금액</dt>
                    <dd>
                      {numberWithCommas(item.pgPaymentPrice.number)}
                      {currencyCodeToCurrency(item.pgPaymentPrice.currencyCode)}
                    </dd>
                  </dl>
                  <dl>
                    <dt>쇼핑지원금 환불</dt>
                    <dd>추후 확인할 부분!!!!!</dd>
                  </dl>
                  <dl>
                    <dt>010PAY 포인트 환불</dt>
                    <dd>
                      {numberWithCommas(item.refundUseMileage.number)}
                      {currencyCodeToCurrency(item.refundUseMileage.currencyCode)}
                    </dd>
                  </dl>
                </div>
              </S.ContsPart>
            </S.RefundPannel>
          );
        })}
      </S.HistoryPopContainer>
    </S.HistoryPopWrapper>
  );
};

export default PopupRefund;
