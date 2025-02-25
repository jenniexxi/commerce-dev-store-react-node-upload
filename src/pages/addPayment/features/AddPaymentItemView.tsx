import { forwardRef } from 'react';

import { T } from '@commons';
import { Button } from '@components';
import { PAYMENT_STATUS_CODES } from '@type';
import dayjs from 'dayjs';

import { showPriceText } from '@utils/display';

import { AddPaymentItem } from '@apis/claimApi';

import * as S from './_AddPayment.style';

type Props = {
  content: AddPaymentItem;
};
const AddPaymentItemView = forwardRef<HTMLLIElement, Props>((props: Props, ref) => {
  const { content } = props;

  const paymentAddPayment = () => {};
  return (
    <S.Container ref={ref}>
      <T.Headline1M>추가결제 생성일 {dayjs(content.claimRequestDate).format('YYYY.MM.DD')}</T.Headline1M>
      <S.ItemContainer>
        <S.RowView>
          <S.LeftItemText>주문번호</S.LeftItemText>
          <T.Body1_Normal>{content.orderNumber}</T.Body1_Normal>
        </S.RowView>
        <S.Border />
        <S.RowView>
          <S.LeftItemText>추가결제 구분</S.LeftItemText>
          <T.Body1_Normal>{content.claimTypeEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <S.LeftItemText>결제금액</S.LeftItemText>
          <T.Body1_Normal>{showPriceText(content.paymentPrice)}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <S.LeftItemText>결제수단</S.LeftItemText>
          <T.Body1_Normal>{content.paymentMethodEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <S.LeftItemText>결제상태</S.LeftItemText>
          <T.Body1_Normal>{content.paymentStatusEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        {content.paymentStatusEnum.code === PAYMENT_STATUS_CODES.PAYMENT_WAIT && (
          <Button
            title='결제하기'
            width='100%'
            align='center'
            onClick={paymentAddPayment}
          />
        )}
      </S.ItemContainer>
    </S.Container>
  );
});

export default AddPaymentItemView;
