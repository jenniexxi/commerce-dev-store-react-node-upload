import { T } from '@commons';
import { ADD_PAYMENT_METHOD_CODES } from '@type';

import { showPriceText } from '@utils/display';

import { ClaimOrderDetail } from '@apis/claimApi';

import * as S from './_ClaimHistoryDetail.style';

type Props = {
  claimInfo: ClaimOrderDetail;
  title: string;
};

const ClaimHistoryDetailPriceInfo = ({ claimInfo, title }: Props) => {
  return (
    <>
      <S.SectionContainer>
        <T.Body1_NormalB>{title}주소</T.Body1_NormalB>
        <T.Body1_Normal>상품 수거지 주소</T.Body1_Normal>
        <S.RowView>
          <S.AddressLeftItem>이름</S.AddressLeftItem>
          <T.Body2_Normal>{claimInfo.collectAddress.name}</T.Body2_Normal>
        </S.RowView>
        <S.RowView>
          <S.AddressLeftItem>주소</S.AddressLeftItem>
          <T.Body2_Normal>
            [{claimInfo.collectAddress.zipCode}]{claimInfo.collectAddress.address}
            {claimInfo.collectAddress.addressDetail}
          </T.Body2_Normal>
        </S.RowView>
        <S.RowView>
          <S.AddressLeftItem>휴대폰번호</S.AddressLeftItem>
          <T.Body2_Normal>{claimInfo.collectAddress.contactNumber}</T.Body2_Normal>
        </S.RowView>
        <S.RowView>
          <S.AddressLeftItem>배송요청사항</S.AddressLeftItem>
          <T.Body2_Normal>{claimInfo.collectAddress.shippingMessage}</T.Body2_Normal>
        </S.RowView>
      </S.SectionContainer>
      <S.SectionContainer>
        <T.Body1_NormalB>{title}환불 정보</T.Body1_NormalB>
        <T.Caption1_Normal>{title} 신청 시 환불되는 금액 정보입니다.</T.Caption1_Normal>
        <S.RowViewBetween>
          <T.Body1_NormalB>{title} 신청 금액</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.applicationRefundPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>상품 결제금액</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.refundGoodsPaymentPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>쇼핑지원금 사용</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.useMileage)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>010PAY 포인트 사용</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.usePay010Mileage)}</T.Body2_Normal>
        </S.RowViewBetween>
      </S.SectionContainer>
      <S.SectionContainer>
        <S.RowViewBetween>
          <T.Body1_NormalB>변동 배송비</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.changeShippingPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>반품 신청 전 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.beforeShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>반품 신청 후 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.afterShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
      </S.SectionContainer>
      <S.SectionContainer>
        <S.RowViewBetween>
          <T.Body1_NormalB>환불 예정 금액</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.refundPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>상품 결제 금액</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.refundGoodsPaymentPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>쇼핑지원금 환불</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.refundUseMileage)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>010PAY 포인트 환불</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.refundUsePay010Mileage)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>변동 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.changeShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
      </S.SectionContainer>
      <S.SectionContainer>
        <T.Body1_NormalB>결제수단 (상품 구매 시)</T.Body1_NormalB>
        <T.Body1_Normal>{claimInfo.payment.paymentMethodEnum.codeName}</T.Body1_Normal>
        {claimInfo.payment.refundBank && (
          <S.RowViewBetween>
            <T.Body1_NormalB>환불계좌</T.Body1_NormalB>
            <T.Body1_Normal>
              {claimInfo.payment.refundBank.bankEnum.codeName} {claimInfo.payment.refundBank.bankAccountNumber}{' '}
              {claimInfo.payment.refundBank.bankAccountHolder}
            </T.Body1_Normal>
          </S.RowViewBetween>
        )}
      </S.SectionContainer>
      <S.SectionContainer>
        <T.Body1_NormalB>추가 결제 내역</T.Body1_NormalB>
        <T.Caption1_Normal>{title} 신청 시 별도로 발생하는 추가결제 배송비 정보입니다.</T.Caption1_Normal>
        <S.RowViewBetween>
          <T.Body1_NormalB>{title} 배송비</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.sumAddPaymentClaimShippingPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>{title} 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.addPaymentClaimShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>제주/도서산간 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.addPaymentClaimAddShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>

        <S.RowViewBetween>
          <T.Body1_NormalB>추가 배송비</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.addPaymentPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>변동 배송비</T.Body2_Normal>
          <T.Body2_Normal>{showPriceText(claimInfo.claim.addChangeShippingPrice)}</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body2_Normal>묶음배송 최초 배송비</T.Body2_Normal>
          <T.Body2_Normal>요건 뭘까??</T.Body2_Normal>
        </S.RowViewBetween>
        <S.RowViewBetween>
          <T.Body1_NormalB>추가 결제 예정금액</T.Body1_NormalB>
          <T.Body1_NormalB>{showPriceText(claimInfo.claim.addPaymentPrice)}</T.Body1_NormalB>
        </S.RowViewBetween>
      </S.SectionContainer>
      <S.SectionContainer>
        <T.Body1_NormalB>추가 결제 정보</T.Body1_NormalB>
        <S.RowViewBetween>
          <T.Body1_NormalB>결제수단</T.Body1_NormalB>
          <T.Body1_Normal>{claimInfo.addPayment.paymentMethodEnum.codeName}</T.Body1_Normal>
          {claimInfo.addPayment.paymentMethodEnum.code === ADD_PAYMENT_METHOD_CODES.TRANSFER_ACCOUNT && (
            <S.RowViewBetween>
              <T.Body1_NormalB>결제 정보</T.Body1_NormalB>
              <T.Body1_Normal>
                {claimInfo.addPayment.bank.bankName} {claimInfo.addPayment.bank.bankAccountNumber}{' '}
                {claimInfo.addPayment.bank.bankHolder}
              </T.Body1_Normal>
            </S.RowViewBetween>
          )}
        </S.RowViewBetween>
      </S.SectionContainer>
    </>
  );
};

export default ClaimHistoryDetailPriceInfo;
