import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
// import { useNavigate } from 'react-router-dom';
import { Input, Modal, Selector } from '@components';
import { Button } from '@components';
import { useQuery } from '@tanstack/react-query';
import { DELIVERY_REQUEST } from '@type';

import { useDeliveryStore } from '@stores/useDeliveryStore';
import { useOrderStore } from '@stores/useOrderStore';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import buyersApi, { DeliveryAddress, Encrypt } from '@apis/buyersApi';

import * as S from './_Order.style';

type Props = {};

const DelivieryInfo = ({}: Props) => {
  const navigate = useNavigate();
  const {
    deliveryRequestReason,
    setDeliveryRequestReason,
    deliveryRequest,
    setDeliveryRequest,
    selectedAddr,
    setSelectedAddr,
  } = useDeliveryStore();
  const { setAddress } = useOrderStore();
  // 쿼리
  const { data: addressCount } = useQuery({
    queryKey: ['getMyAddressCount'],
    queryFn: () => buyersApi.getMyAddressCount(),
  });

  const { data: addressData } = useQuery({
    queryKey: ['getMyAddresses'],
    queryFn: () => buyersApi.getMyAddresses(),
    enabled: addressCount && addressCount?.data !== 0,
  });

  useEffect(() => {
    if (!selectedAddr) {
      setSelectedAddr(
        addressData?.data?.filter((address: DeliveryAddress & Encrypt) => address.defaultYn === true)[0] ?? undefined,
      );
    }
  }, [addressData]);

  useEffect(() => {
    if (selectedAddr) {
      setAddress({
        name: selectedAddr.receiverName,
        contactNumber: selectedAddr.receiverCellPhone,
        zipCode: selectedAddr.zipCode,
        address: selectedAddr.receiverAddress,
        addressDetail: selectedAddr.receiverAddressDetail,
        shippingMessage:
          deliveryRequest?.code === 'ORDER.SHIPPING_REQUEST.DIRECT' ? deliveryRequestReason : deliveryRequest?.codeName,
        shippingName: selectedAddr.name,
        basicYn: selectedAddr.defaultYn,
      });
    }
  }, [selectedAddr]);

  const mangeAddress = () => {
    navigate(PAGE_WITHOUT_FOOTER_ROUTES.MANAGE_ADDRESS.path);
  };
  const hasNoAddress = addressCount?.data === 0;

  return (
    <>
      {hasNoAddress ? (
        <S.AddressContainer>
          <T.Body2_NormalM $mb={16}>배송지를 등록해 주세요.</T.Body2_NormalM>
          <Button
            title='배송지 등록'
            btnType='primary'
            size='xsm'
            onClick={mangeAddress}
          />
        </S.AddressContainer>
      ) : (
        <S.ExistingAddressCard key={selectedAddr?.buyerAddressIdEncrypt}>
          <S.AddressHeader>
            <S.AddressInfo>
              <T.Body1_NormalB $mr={8}>
                {selectedAddr?.receiverName}({selectedAddr?.name})
              </T.Body1_NormalB>

              {selectedAddr?.defaultYn && (
                <S.DefaultBadge>
                  <T.Caption2_NormalM $color={colors.text4}>기본배송지</T.Caption2_NormalM>
                </S.DefaultBadge>
              )}
            </S.AddressInfo>
            <Button
              onClick={mangeAddress}
              title='변경'
              size='xsm'
              btnType='tertiary'
            />
          </S.AddressHeader>
          <T.Body2_NormalM>{selectedAddr?.receiverCellPhone}</T.Body2_NormalM>
          <T.Body2_Normal
            $color={colors.text4}
            $mb={16}
          >
            {selectedAddr?.receiverAddress} {selectedAddr?.receiverAddressDetail}
          </T.Body2_Normal>

          <Selector
            placeholder='배송요청사항을 선택해 주세요.'
            defaultValue={deliveryRequest}
            options={DELIVERY_REQUEST}
            onChange={setDeliveryRequest}
            isBottomPopup={true}
          />
          {deliveryRequest?.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
            <S.DirectInputWrapper>
              <Input
                name='directInput'
                value={deliveryRequestReason}
                onChange={(e) => setDeliveryRequestReason(e.target.value)}
                maxLength={30}
                placeholder='배송요청사항을 입력해주세요 (30자 이내)'
                height='md'
              />
            </S.DirectInputWrapper>
          )}
        </S.ExistingAddressCard>
      )}
    </>
  );
};

export default DelivieryInfo;
