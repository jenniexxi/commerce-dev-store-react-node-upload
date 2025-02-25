import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Modal, Selector } from '@components';
import { DELIVERY_REQUEST, MYPAGE_SORT_CODES } from '@type';

import MobileInput, { MobileNumber } from '@components/input/MobileInput';
import { showModal } from '@components/modal/ModalManager';

import { PAGE_ROUTES } from '@router/Routes';

import { Code } from '@apis/apiCommonType';

import * as S from '../ClaimRequest.style';
import { UserAddrInfo } from '../ExchangeOrder/ExchangeOrder';

type RequestType = 'collect' | 'delivery'; // collect: 수거요청사항, delivery: 배송요청사항

type Props = {
  title: string;
  type: RequestType;
  userAddrInfo: UserAddrInfo;
  onChangeValue: (value: UserAddrInfo) => void;
  collectDesc?: boolean;
  deliveryDesc?: boolean;
};

const ClaimAddr = ({ title, type, collectDesc, deliveryDesc, userAddrInfo, onChangeValue }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onChangeAddrValue = (key: keyof UserAddrInfo, value: string | MobileNumber | Code<string>) => {
    const updatedInfo = { ...userAddrInfo, [key]: value };
    onChangeValue(updatedInfo);
  };

  const handleAddressComplete = (data: any): void => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onChangeValue({
      ...userAddrInfo,
      zipCode: data.zonecode,
      address: fullAddress,
    });

    handleModalClose();
  };

  const onChangeDeliveryRequest = (value: string | Code<string>) => {
    onChangeAddrValue('deliveryRequestEnum', value);
  };

  const checkIslandShip = () => {
    showModal.text(
      '제주/도서산간 지역 배송 불가인 상품이 포함되어 있습니다. 교환 취소 또는 주소를 다시 입력해주세요.',
      {
        buttonType: 'multi',
        leftType: 'tertiary',
        leftTitle: '교환취소',
        rightTitle: '주소지 변경',
        leftonClick: () =>
          navigate(PAGE_ROUTES.MYPAGE_ORDER_HISTORY.path, {
            state: { key: MYPAGE_SORT_CODES.ALL_ORDER },
          }),
        rightonClick: handleModalOpen,
      },
    );
  };

  return (
    <>
      <button onClick={checkIslandShip}>주소 찾기(도서산간 지역)</button>
      <S.ItemPart>
        <S.SubTitle>{title}</S.SubTitle>
        <S.ItemConts>
          <S.ItemBox>
            <label htmlFor='name'>이름(필수)</label>
            <input
              type='text'
              placeholder='홍길동'
              value={userAddrInfo.name}
              onChange={(e) => onChangeAddrValue('name', e.target.value)}
            />
          </S.ItemBox>
          <S.ItemBox>
            <label htmlFor='addr'>주소(필수)</label>
            <S.ItemGroup>
              <input
                type='text'
                value={userAddrInfo.zipCode}
                disabled={true}
              />
              <Button
                size='xsm'
                btnType='tertiary'
                title='주소 찾기'
                onClick={handleModalOpen}
              />
            </S.ItemGroup>
            <input
              type='text'
              value={userAddrInfo.address}
              disabled={true}
            />
            <input
              type='text'
              value={userAddrInfo.detailAddress}
              onChange={(e) => onChangeAddrValue('detailAddress', e.target.value)}
            />
          </S.ItemBox>
          <S.ItemBox>
            <label htmlFor='phone'>휴대폰번호(필수)</label>
            <S.MoGroup>
              <MobileInput onChangeValue={(value) => onChangeAddrValue('phonenumber', value)} />
            </S.MoGroup>
          </S.ItemBox>
          {type === 'collect' ? (
            <S.ItemBox>
              <label htmlFor='request'>수거요청사항</label>
              <input
                type='text'
                placeholder='배송 메시지를 입력해주세요. (30자 이내)'
                maxLength={30}
                onChange={(e) => onChangeAddrValue('deliveryRequestEnum', e.target.value)}
              />
              {collectDesc && (
                <S.CollectDesc>
                  상품 수거지 주소지에 따라 별도의 배송비가 추가 청구될 수 있습니다. (ex. 제주 및 도서산간)
                </S.CollectDesc>
              )}
            </S.ItemBox>
          ) : (
            <S.ItemBox>
              <label htmlFor='request'>배송요청사항</label>
              <Selector
                placeholder={'배송 요청사항을 선택해주세요'}
                // defaultValue={claimReasonEnum}
                defaultValue={userAddrInfo.deliveryRequestEnum || ''}
                options={DELIVERY_REQUEST}
                onChange={(value) => onChangeDeliveryRequest(value)}
              />
              {typeof userAddrInfo.deliveryRequestEnum === 'object' &&
                userAddrInfo.deliveryRequestEnum.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
                  <Input
                    name='reason'
                    value={userAddrInfo.reason || ''}
                    onChange={(e) => onChangeAddrValue('reason', e.target.value)}
                  />
                )}
              {deliveryDesc && (
                <S.DeliveryDesc>
                  교환상품을 수령할 주소지에 따라 별도의 배송비가 추가 청구될 수 있습니다. (ex. 제주 및 도서산간)
                </S.DeliveryDesc>
              )}
            </S.ItemBox>
          )}
        </S.ItemConts>
      </S.ItemPart>
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='center'
          showCloseBtn={false}
        >
          <DaumPostcode
            onComplete={handleAddressComplete}
            autoClose={false}
          />
        </Modal>
      )}
    </>
  );
};

export default ClaimAddr;
