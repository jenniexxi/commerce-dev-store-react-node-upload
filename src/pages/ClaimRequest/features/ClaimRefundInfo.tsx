import { PaymentMethodCode, paymentMethodCode } from '@type';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { showPriceText } from '@utils/display';

import { Code } from '@apis/apiCommonType';
import { CancelRefundInfoInquiryResp } from '@apis/claimApi';
import { OrderRefundAccountResp } from '@apis/orderApi';

import * as S from './ClaimFeatures.style';

type ClaimRefundInfoProps = {
  refundInfo?: CancelRefundInfoInquiryResp;
  paymentMethodEnum?: Code<PaymentMethodCode>;
  orderRefundAccountInfo?: OrderRefundAccountResp;
  title: string;
};

const ClaimRefundInfo = ({ refundInfo, paymentMethodEnum, orderRefundAccountInfo, title }: ClaimRefundInfoProps) => {
  return (
    <>
      <S.OhDetailTitleTy2>
        <h2>{title} 환불 정보</h2>
        <S.DescText>{title} 신청 시 환불되는 금액 정보입니다.</S.DescText>
      </S.OhDetailTitleTy2>
      <S.RefundInfoContainer>
        <S.RefundInfoBox>
          <S.RefundInfoSumm>
            <S.InfoGroup>
              {title} 신청 금액
              <NonModalTooltip
                title={`${title} 신청 금액`}
                trigerColor={colors.icon4}
                trigerType='?'
                position='center'
                showCloseButton={true}
                defaultShown={false}
                withDot={false}
                items={[
                  <S.ToolTipContents key='tooltip-content'>
                    {title} 신청 시 환불되는 상품 금액입니다.
                    <br />
                    부분 {title} 신청을 하실 경우 발생되는 변동 배송 비용에 따라 추가 비용이 발생합니다.
                  </S.ToolTipContents>,
                ]}
              />
            </S.InfoGroup>
            <S.InfoPriceGroup>{showPriceText(refundInfo?.data?.applicationRefundPrice)}</S.InfoPriceGroup>
          </S.RefundInfoSumm>
          <S.RefundList>
            <li>
              <span>상품 결제금액</span>
              <span>{showPriceText(refundInfo?.data.refundGoodsPaymentPrice)}</span>
            </li>
            <li>
              <span>쇼핑지원금 사용</span>
              <span>{showPriceText(refundInfo?.data.useMileage)}</span>
            </li>
            <li>
              <span>010PAY 포인트 사용</span>
              <span>{showPriceText(refundInfo?.data.usePay010Mileage)}</span>
            </li>
          </S.RefundList>
        </S.RefundInfoBox>
        <S.RefundInfoBox>
          <S.RefundInfoSumm>
            <S.InfoGroup>
              변동 배송비
              <NonModalTooltip
                title='변동 배송비'
                trigerColor={colors.icon4}
                trigerType='?'
                position='center'
                showCloseButton={true}
                defaultShown={false}
                withDot={false}
                items={[
                  <S.ToolTipContents key='tooltip-content'>
                    부분 {title}를 신청하실 경우, 신청하신 {title} 상품을 제외한 잔여 주문에 따라 부과되는 배송비입니다.
                    신청 전 배송비보다 신청 후 배송비가 클 경우 초과금에 대한 내역에 추가 결제 내역에 청구됩니다.
                  </S.ToolTipContents>,
                ]}
              />
            </S.InfoGroup>
            <S.InfoPriceGroup>{showPriceText(refundInfo?.data.changeShippingPrice)}</S.InfoPriceGroup>
          </S.RefundInfoSumm>
          <S.RefundList>
            <li>
              <span>{title} 신청 전 배송비</span>
              <span>{showPriceText(refundInfo?.data.beforeShippingPrice)}</span>
            </li>
            <li>
              <span>{title} 신청 후 배송비</span>
              <span>{showPriceText(refundInfo?.data.afterShippingPrice)}</span>
            </li>
          </S.RefundList>
        </S.RefundInfoBox>
        <S.RefundInfoBox>
          <S.RefundInfoSumm>
            <S.InfoGroup>
              환불 예정 금액
              <NonModalTooltip
                title='환불 예정 금액'
                trigerColor={colors.icon4}
                trigerType='?'
                position='center'
                showCloseButton={true}
                defaultShown={false}
                withDot={false}
                items={[
                  <S.ToolTipContents key='tooltip-content'>
                    {title}가 완료될 경우 실제 환불되는 비용입니다. 변동 배송비의 {title} 신청 전 배송비가 {title} 신청
                    후 배송비보다 높을 경우 해당 금액이 환불 금액에 포함됩니다.
                  </S.ToolTipContents>,
                ]}
              />
            </S.InfoGroup>
            <S.InfoPriceGroup>{showPriceText(refundInfo?.data.refundPrice)}</S.InfoPriceGroup>
          </S.RefundInfoSumm>
          <S.RefundList>
            <li>
              <span>상품 결제금액</span>
              <span>{showPriceText(refundInfo?.data.pgPaymentPrice)}</span>
            </li>
            <li>
              <span>쇼핑지원금 환불</span>
              <span>{showPriceText(refundInfo?.data.refundUseMileage)}</span>
            </li>
            <li>
              <span>010PAY 포인트 환불</span>
              <span>{showPriceText(refundInfo?.data.refundUsePay010Mileage)}</span>
            </li>
            <li>
              <span>변동 배송비</span>
              <span>{showPriceText(refundInfo?.data.changeShippingPrice)}</span>
            </li>
          </S.RefundList>
        </S.RefundInfoBox>
        <S.RefundInfoBox>
          <S.RefundInfoSumm>
            <S.InfoGroup>결제수단 (상품 구매 시)</S.InfoGroup>
            <S.InfoPriceGroup>
              {paymentMethodEnum?.code === paymentMethodCode.FREE ? '없음' : paymentMethodEnum?.codeName}
            </S.InfoPriceGroup>
          </S.RefundInfoSumm>
        </S.RefundInfoBox>
        {orderRefundAccountInfo?.success && orderRefundAccountInfo?.data.bankEnum && (
          <S.RefundInfoBox>
            <S.RefundInfoSumm>
              <S.InfoGroup>환불계좌</S.InfoGroup>
              <S.InfoPriceGroup>{orderRefundAccountInfo?.data.bankEnum.codeName}</S.InfoPriceGroup>
            </S.RefundInfoSumm>
            <S.UserRefundInfo>
              <S.RefundList>
                <li>
                  <span>예금주</span>
                  <span>{orderRefundAccountInfo?.data.bankAccountHolder}</span>
                </li>
                <li>
                  <span>계좌번호</span>
                  <span>{orderRefundAccountInfo?.data.bankAccountNumber}</span>
                </li>
              </S.RefundList>
            </S.UserRefundInfo>
          </S.RefundInfoBox>
        )}
        <S.DescInfo>
          <li>
            결제수단 중 신용카드 및 실시간 계좌이체, 간편결제는 자동 환불 처리되며 기타 결제수단을 통해 결제하신
            고객님은 환불수단에 입력된 환불계좌로 송금 처리됩니다.
          </li>
        </S.DescInfo>
      </S.RefundInfoContainer>
    </>
  );
};

export default ClaimRefundInfo;
