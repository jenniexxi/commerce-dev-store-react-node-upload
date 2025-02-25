import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
// import { useNavigate } from 'react-router-dom';
import { Input, Modal, Selector } from '@components';
import { Button } from '@components';
import { useQuery } from '@tanstack/react-query';

import { type Option } from '@components/selector/Selector';

import { useDeliveryStore } from '@stores/useDeliveryStore';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import buyersApi, { DeliveryAddress, Encrypt, MyAddressCountResp, MyAddressResp } from '@apis/buyersApi';

import * as S from './_Order.style';

export const DELIVERY_REQUEST = [
  {
    label: '문 앞에 놓아주세요.',
    value: { code: 'ORDER.SHIPPING_REQUEST.FRONT_DOOR', codeName: '문 앞에 놓아주세요.' },
  },
  {
    label: '배송 전에 미리 연락 바랍니다.',
    value: { code: 'ORDER.SHIPPING_REQUEST.CALL_BEFORE_DELIVERY', codeName: '배송 전에 미리 연락 바랍니다.' },
  },
  {
    label: '부재 시 경비실에 맡겨 주세요.',
    value: { code: 'ORDER.SHIPPING_REQUEST.SECURITY_OFFICE', codeName: '부재 시 경비실에 맡겨 주세요.' },
  },
  {
    label: '부재 시 전화 주시거나 문자 남겨주세요.',
    value: { code: 'ORDER.SHIPPING_REQUEST.CALL_ABSENCE', codeName: '부재 시 전화 주시거나 문자 남겨주세요.' },
  },
  { label: '직접 입력', value: { code: 'ORDER.SHIPPING_REQUEST.DIRECT', codeName: '직접 입력' } },
];

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
    setSelectedAddr(
      addressData?.data?.filter((address: DeliveryAddress & Encrypt) => address.defaultYn === true)[0] ?? undefined,
    );
  }, [addressData]);

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
