import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { T } from '@commons';
import { Button, Selector } from '@components';
import { useQuery } from '@tanstack/react-query';
import { DELIVERY_REQUEST } from '@type';

import AddAddressModal from '@components/modal/AddAddressModal';

import { useDeliveryStore } from '@stores/useDeliveryStore';

import { useHeader } from '@hooks/useHeader';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import BuyersApi, { DeliveryAddress, Encrypt } from '@apis/buyersApi';

import Separator from '@commons/Separator';
import SvgIcon from '@commons/SvgIcon';

import * as S from './ManageAddress.style';
import AddressItem from './features/AddressItem';

type Props = {};

const ManageAddress = ({}: Props) => {
  const [showNewModal, setShowNewModal] = useState(false);

  const { setDeliveryRequest, deliveryRequest, deliveryRequestReason, setDeliveryRequestReason } = useDeliveryStore();

  useHeader('배송지 목록', { showHeader: true });

  const {
    state,
  }: {
    state: {
      changeDeliveryRequest: boolean;
    };
  } = useLocation();

  // Query
  const { data: addressesData, refetch } = useQuery({
    queryKey: ['getMyAddresses'],
    queryFn: () => BuyersApi.getMyAddresses(),
  });

  const sortedAddresses = addressesData?.data
    ?.slice()
    .sort((a: Encrypt & DeliveryAddress, b: Encrypt & DeliveryAddress) => {
      if (a.defaultYn === b.defaultYn) return 0;
      return a.defaultYn ? -1 : 1;
    });

  return (
    <S.Container>
      {state?.changeDeliveryRequest ? (
        <>
          <S.DeliveryRequestWrap>
            <T.Body1_NormalB $mb={16}>배송요청사항 변경</T.Body1_NormalB>
            <Selector
              options={DELIVERY_REQUEST}
              onChange={(value) => setDeliveryRequest(value)}
              placeholder='배송요청사항을 선택해주세요'
            />
            {typeof deliveryRequest === 'object' && deliveryRequest.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
              <S.DeliveryInputWrap>
                <S.DeliveryRequestInput
                  name='reason'
                  maxLength={30}
                  value={deliveryRequestReason}
                  placeholder={`배송요청사항을입력해주세요.\n(30자 이내)`}
                  onChange={(e) => setDeliveryRequestReason(e.target.value)}
                />
                <T.Caption1_Normal $color={colors.icon4}>
                  {deliveryRequestReason.length} <span>/</span> 30
                </T.Caption1_Normal>
              </S.DeliveryInputWrap>
            )}
          </S.DeliveryRequestWrap>
          <Separator $height={8} />
          <S.DeliveryRequestTitleWrap>
            <T.Body1_NormalB
              $mb={16}
              $ml={16}
            >
              배송지 변경
            </T.Body1_NormalB>
            <Button
              width='100%'
              align='center'
              title='배송지 신규 등록'
              btnType='tertiary'
              leftIcon={
                <SvgIcon
                  name={R.svg.icoPlus}
                  width={20}
                  height={20}
                />
              }
              onClick={() => {
                setShowNewModal(true);
              }}
            />
          </S.DeliveryRequestTitleWrap>
        </>
      ) : (
        <>
          <S.AddAddrWrap>
            <Button
              width='100%'
              align='center'
              title='배송지 신규 등록'
              btnType='tertiary'
              leftIcon={
                <SvgIcon
                  name={R.svg.icoPlus}
                  width={20}
                  height={20}
                />
              }
              onClick={() => {
                setShowNewModal(true);
              }}
            />
          </S.AddAddrWrap>
          <Separator $height={8} />
        </>
      )}

      {sortedAddresses?.length === 0 ? (
        <></>
      ) : (
        <S.AddrListWrap>
          {sortedAddresses?.map((item) => (
            <AddressItem
              item={item}
              refetch={refetch}
            />
          ))}
        </S.AddrListWrap>
      )}
      <AddAddressModal
        isVisible={showNewModal}
        onHide={() => setShowNewModal(false)}
        refetch={refetch}
      />
    </S.Container>
  );
};

export default ManageAddress;
