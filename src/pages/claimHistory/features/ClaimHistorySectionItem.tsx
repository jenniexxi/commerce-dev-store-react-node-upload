import { forwardRef } from 'react';

import { Button } from '@components';
import { useMutation } from '@tanstack/react-query';
import { AllOrderStates, MYPAGE_CLAIM_SORT_CODES } from '@type';

import { PAGE_ROUTES } from '@router/Routes';

import claimApi, { ClaimListContent } from '@apis/claimApi';

import ArrowTop from '@commons/ArrowTop';

import ClaimHistorySectionGoods from './ClaimHistorySectionGoods';
import * as S from './_ClaimHistory.style';

type Props = {
  content: ClaimListContent;
  updateList: () => void;
};

const ClaimHistorySectionItem = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { content, updateList } = props;

  const { mutate } = useMutation({
    mutationFn: ({
      type,
      orderClaimIdEncrypt,
    }: {
      type: 'cancel' | 'return' | 'exchange';
      orderClaimIdEncrypt: string;
    }) => claimApi.cancelClaim(type, orderClaimIdEncrypt),
    onSuccess: () => {
      updateList();
    },
  });
  const requestCancelCancel = () => {
    mutate({ type: 'cancel', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const requestCancelExchange = () => {
    mutate({ type: 'exchange', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const requestCancelReturn = () => {
    mutate({ type: 'return', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const getClaimType = () => {
    const claimType = content.goodsList[0].claimTypeEnum.code;
    if (claimType === MYPAGE_CLAIM_SORT_CODES.CANCEL) {
      return 'cancel';
    } else if (claimType === MYPAGE_CLAIM_SORT_CODES.EXCHANGE) {
      return 'exchange';
    } else {
      return 'return';
    }
  };
  const renderCalimCancleButton = () => {
    const itemState = content.goodsList
      .filter(
        (item) =>
          item.itemStatusEnum.code === AllOrderStates.Claim.CA ||
          item.itemStatusEnum.code === AllOrderStates.Claim.EA ||
          item.itemStatusEnum.code === AllOrderStates.Claim.RA,
      )
      .map((item) => item.itemStatusEnum.code)[0];
    if (itemState) {
      switch (itemState) {
        case AllOrderStates.Claim.CA:
          return (
            <Button
              title='취소철회'
              size='xsm'
              btnType='tertiary'
              width={'100%'}
              align='center'
              onClick={requestCancelCancel}
            />
          );
        case AllOrderStates.Claim.EA:
          return (
            <Button
              title='교환철회'
              size='xsm'
              btnType='tertiary'
              width={'100%'}
              align='center'
              onClick={requestCancelExchange}
            />
          );
        case AllOrderStates.Claim.RA:
        default:
          return (
            <Button
              title='반품철회'
              size='xsm'
              btnType='tertiary'
              width={'100%'}
              align='center'
              onClick={requestCancelReturn}
            />
          );
      }
    }
  };

  return (
    <S.ClaimHistorySectionContainer ref={ref}>
      <S.ClaimHistorySectionHeader
        to={PAGE_ROUTES.CLAIM_HISTORY_DETAIL.path}
        state={{ key: content.ordersIdEncrypt, type: getClaimType() }}
      >
        <div>
          <span>{content.claimRequestDate}</span>
          <span>{content.orderNumber}</span>
        </div>
        <ArrowTop />
      </S.ClaimHistorySectionHeader>
      {content.goodsList.map((item) => (
        <ClaimHistorySectionGoods
          key={item.orderItemIdEncrypt}
          goodsInfo={item}
        />
      ))}
      {renderCalimCancleButton()}
    </S.ClaimHistorySectionContainer>
  );
});

export default ClaimHistorySectionItem;
