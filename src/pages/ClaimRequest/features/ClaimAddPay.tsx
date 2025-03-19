import { useEffect, useRef, useState } from 'react';

import { Tooltip } from '@components';
import { useQuery } from '@tanstack/react-query';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { useRRound } from '@hooks/useRRoundPay';

import { colors } from '@styles/theme';

import { showPriceText } from '@utils/display';
import R from '@utils/resourceMapper';

import { RefundInfoInquiryRespCommon } from '@apis/claimApi';
import SystemAPI from '@apis/systemApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './ClaimFeatures.style';

type ClaimAddPayProps = {
  refundInfo: RefundInfoInquiryRespCommon;
  title: string;
};

const ClaimAddPay = ({ refundInfo, title }: ClaimAddPayProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { error, initialize, initializePayment, renderPaymentUI, updatePaymentUI, requestPayment } = useRRound();

  const hfPaymentInstance = useRef(null);

  const { data: paymentReqInfo } = useQuery({
    queryKey: ['paymentReqInfo'],
    queryFn: () => SystemAPI.getPaymentRequireInfo(),
  });

  useEffect(() => {
    if (paymentReqInfo?.success) {
      const initSDK = async () => {
        try {
          // API에서 shopId 가져오기

          // SDK 초기화
          await initialize({
            shopId: paymentReqInfo.data.hectoPg.shopId,
            mode: 'development',
          });

          setIsInitialized(true);
        } catch (err) {
          console.error('SDK 초기화 실패:', err);
        }
      };

      initSDK();
    }
  }, [paymentReqInfo, initialize]);

  useEffect(() => {
    if (!paymentReqInfo?.success) return;

    if (!isInitialized) return;

    const setupPayment = async () => {
      try {
        const paymentsInstance = await initializePayment({
          payToken: paymentReqInfo.data.hectoPg.payToken,
          payPrice: 0,
          deliveryFee: refundInfo?.addPaymentPrice.number,
          method: ['ALL'],
        });
        hfPaymentInstance.current = paymentsInstance;
        // 결제 UI 렌더링
        const paymentMethod = await renderPaymentUI(paymentsInstance, '#payment-container');

        // 결제수단 선택 이벤트 리스닝
        paymentMethod.event('SELECT_PAYMENTS_METHOD', (method: string) => {});
      } catch (err) {
        console.error('결제 초기화 실패:', err);
      }
    };

    setupPayment();
  }, [paymentReqInfo, refundInfo, isInitialized, initializePayment, renderPaymentUI]);

  return (
    <>
      <S.OhDetailSecAddWrap>
        <S.TopSumm>
          <S.DetailAddTitle>
            <h2>추가결제 내역</h2>
          </S.DetailAddTitle>
          <S.DescText>{title} 신청 시 별도로 발생하는 추가결제 배송비 정보입니다.</S.DescText>
        </S.TopSumm>
        <S.RefundInfoContainer>
          <S.RefundInfoBox>
            <S.RefundInfoSumm>
              <S.InfoGroup>
                {title} 배송비
                <NonModalTooltip
                  title={`${title} 배송비`}
                  trigerColor={colors.icon4}
                  trigerType='?'
                  position='center'
                  showCloseButton={true}
                  defaultShown={false}
                  withDot={false}
                  items={[
                    title === '취소' ? (
                      '취소 이전 배송비 보다 취소 이후 배송비가 높을 경우 추가로 부과해야 하는 배송비입니다.'
                    ) : title === '교환' ? (
                      <>
                        교환 시 추가로 발생되는 배송비입니다. <br />
                        귀책사유에 따라 비용이 부과될 수 있습니다.
                      </>
                    ) : (
                      <>
                        반품 신청 시 발생하는 배송 비용입니다. <br />
                        귀책사유에 따라 비용이 부과될 수 있습니다.
                      </>
                    ),
                  ]}
                />
              </S.InfoGroup>
              <S.InfoPriceGroup>{showPriceText(refundInfo?.sumAddPaymentClaimShippingPrice)}</S.InfoPriceGroup>
            </S.RefundInfoSumm>
            {title === '반품' && (
              <S.RefundInfoDetail>
                <li>
                  <span>반품 배송비</span>
                  <span>{showPriceText(refundInfo?.addPaymentClaimShippingPrice)}</span>
                </li>
                <li>
                  <span>제주/도서산간 배송비</span>
                  <span>{showPriceText(refundInfo?.addPaymentClaimAddShippingPrice)}</span>
                </li>
              </S.RefundInfoDetail>
            )}
          </S.RefundInfoBox>
          {title === '반품' && (
            <>
              <S.RefundInfoBox>
                <S.RefundInfoSumm>
                  <S.InfoGroup>
                    추가 배송비
                    <NonModalTooltip
                      title='추가 배송비'
                      trigerColor={colors.icon4}
                      trigerType='?'
                      position='center'
                      showCloseButton={true}
                      defaultShown={false}
                      withDot={false}
                      items={[
                        `${title} 이전 배송비 보다 ${title} 이후 잔여상품에 대한 배송비가 높거나, 묶음으로 주문하신 주문상품 전체가 반품되는 시점에 발생되는 주문 배송 비용입니다. 귀책 사유에 따라 비용이 부과될 수 있습니다.`,
                      ]}
                    />
                  </S.InfoGroup>
                  <S.InfoPriceGroup>{showPriceText(refundInfo?.addShippingPrice)}</S.InfoPriceGroup>
                </S.RefundInfoSumm>
                <S.RefundInfoDetail>
                  {/* {refundInfo?.changeShippingPrice && refundInfo?.changeShippingPrice.number !== 0 && <></>} */}
                  <li>
                    <span>변동 배송비</span>
                    <span>
                      {refundInfo?.changeShippingPrice.number === 0
                        ? '0원'
                        : showPriceText(refundInfo?.changeShippingPrice)}
                    </span>
                  </li>
                  <li>
                    <span>
                      묶음배송 최초 배송비
                      <NonModalTooltip
                        title='묶음배송 최초 배송비 안내'
                        trigerColor={colors.icon4}
                        trigerType='?'
                        position='center'
                        showCloseButton={true}
                        defaultShown={false}
                        withDot={false}
                        items={[
                          `같은 묶음배송 주문의 남아있는 가장 마지막 상품을 ${title} 처리하실 경우 이전 주문 금액이 전체 환불되며, 같은 묶음 배송 주문의 처음 발생한 배송비를 청구합니다.`,
                        ]}
                      />
                    </span>
                    <span>{showPriceText(refundInfo?.addFirstShippingPrice)}</span>
                  </li>
                </S.RefundInfoDetail>
              </S.RefundInfoBox>
              <S.RefundInfoBox>
                <S.RefundInfoSumm>
                  <S.InfoGroupPayExpected>
                    추가결제 예정금액
                    <NonModalTooltip
                      title='추가결제 예정금액'
                      trigerColor={colors.icon4}
                      trigerType='?'
                      position='center'
                      showCloseButton={true}
                      defaultShown={false}
                      withDot={false}
                      items={[`${title} 신청을 위해 추가 납부하셔야 할 비용 총액이 표시됩니다.`]}
                    />
                  </S.InfoGroupPayExpected>
                  <S.InfoPriceGroupPayExpected>
                    {showPriceText(refundInfo?.addPaymentPrice)}
                  </S.InfoPriceGroupPayExpected>
                </S.RefundInfoSumm>
              </S.RefundInfoBox>
            </>
          )}
        </S.RefundInfoContainer>
        <S.DescSumm>
          {title === '교환' && <li>교환 배송비는 판매자가 교환상품 최종 승인 후 변경될 수 있습니다.</li>}
          <li>
            추가 결제내역은 <span>추가결제 예정조회</span>에서도 확인하실 수 있습니다.
          </li>
        </S.DescSumm>
      </S.OhDetailSecAddWrap>
      <S.OhDetailSecWrap>
        <S.DetailAddTitle>
          <h2>추가 결제 정보 입력</h2>
        </S.DetailAddTitle>
        <S.AddPayInfoContainer>
          <S.PayInfoBox id={'payment-container'} />
          <S.DescSumm>
            <li>
              결제수단 중 신용카드 및 실시간 계좌이체, 간편결제는 자동 환불 처리되며 기타 결제수단을 통해 결제하신
              고객님은 환불수단에 입력된 환불계좌로 송금 처리됩니다.
            </li>
          </S.DescSumm>
        </S.AddPayInfoContainer>
      </S.OhDetailSecWrap>
    </>
  );
};

export default ClaimAddPay;
