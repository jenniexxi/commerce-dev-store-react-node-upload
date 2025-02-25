import { Button } from '@components';
import { useMutation } from '@tanstack/react-query';
import { AllOrderStates } from '@type';

import claimApi, { ClaimOrderDetail } from '@apis/claimApi';

import ClaimHistorySectionGoods from './ClaimHistorySectionGoods';
import * as S from './_ClaimHistoryDetail.style';

type Props = {
  claimInfo: ClaimOrderDetail;
  updateList: () => void;
};

const ClaimHistorySectionItem = ({ claimInfo, updateList }: Props) => {
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
    mutate({ type: 'cancel', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const requestCancelExchange = () => {
    mutate({ type: 'exchange', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const requestCancelReturn = () => {
    mutate({ type: 'return', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const renderCalimCancleButton = () => {
    const itemState = claimInfo.goodsList
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
              onClick={requestCancelCancel}
            />
          );
        case AllOrderStates.Claim.EA:
          return (
            <Button
              title='교환철회'
              size='xsm'
              btnType='tertiary'
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
              onClick={requestCancelReturn}
            />
          );
      }
    }
  };

  return (
    <S.ClaimHistorySectionContainer>
      <S.ClaimHistorySectionHeader>
        <div>
          <span>{claimInfo.order.claimRequestDate}</span>
          <span>{claimInfo.order.orderNumber}</span>
        </div>
        {renderCalimCancleButton()}
      </S.ClaimHistorySectionHeader>
      {claimInfo.goodsList.map((item) => (
        <ClaimHistorySectionGoods
          key={item.orderItemIdEncrypt}
          goodsInfo={item}
        />
      ))}
    </S.ClaimHistorySectionContainer>
  );
};

export default ClaimHistorySectionItem;
