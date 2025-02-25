import { Button } from '@components';
import { CLAIM_TYPE_CODES } from '@type';

import { numberWithCommas } from '@utils/display';

import { AddPaymentList } from '@apis/orderApi';

import * as S from '../OrderHistoryDetail.style';

type PopupDelayProps = {
  addtionalPayDetails: AddPaymentList[];
};

const PopupAdditionalPay = ({ addtionalPayDetails }: PopupDelayProps) => {
  return (
    <S.HistoryPopContainer>
      {addtionalPayDetails.map((item, index) => {
        return (
          <S.AddPayPannel key={`${item}-${index}`}>
            <S.TitleBox>
              <h3>추가결제 완료일</h3>
              <S.DescDate>{item.paymentDate}</S.DescDate>
            </S.TitleBox>
            <S.ContsPart>
              {item.goodsList.map((goods, idx) => (
                <S.PaymentList key={`${goods.displayGoodsName}-${idx}`}>
                  <div>{goods.brandName} - 추후 확인!!!!</div>
                  <div>{goods.displayGoodsName}</div>
                  <div>
                    {goods.goodsOption} | {goods.buyCnt}개
                  </div>
                </S.PaymentList>
              ))}
              <S.PayInfoBox>
                <dl>
                  <dt>추가결제 구분</dt>
                  <dd>
                    {item.claimTypeEnum.code === CLAIM_TYPE_CODES.Cancel
                      ? '취소'
                      : item.claimTypeEnum.code === CLAIM_TYPE_CODES.Exchange
                        ? '교환'
                        : '반품'}
                    배송비
                  </dd>
                </dl>
                <dl>
                  <dt>결제금액</dt>
                  <dd>{numberWithCommas(item.pgPaymentPrice.number)}</dd>
                </dl>
                <dl>
                  <dt>결제수단</dt>
                  <dd>{item.paymentMethodEnum.codeName}</dd>
                </dl>
                <S.BtnBox>
                  <Button
                    title='영수증 조회'
                    btnType='secondary'
                    size='md'
                    onClick={() => console.log()}
                  />
                </S.BtnBox>
              </S.PayInfoBox>
            </S.ContsPart>
          </S.AddPayPannel>
        );
      })}
    </S.HistoryPopContainer>
  );
};

export default PopupAdditionalPay;
