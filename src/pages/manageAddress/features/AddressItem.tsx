import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
import { useMutation } from '@tanstack/react-query';

import { showModal } from '@components/modal/ModalManager';

import { useDeliveryStore } from '@stores/useDeliveryStore';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import buyersApi, { DeliveryAddress, Encrypt } from '@apis/buyersApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './_Buyers.style';

type Props = {
  item: Encrypt & DeliveryAddress;
  refetch: () => void;
  isExist?: boolean;
  isExchange?: boolean;
};
const AddressItem = ({ item, refetch, isExist, isExchange }: Props) => {
  const { selectedAddr, setSelectedAddr, exchangeAddress, setExistingAddress, existingAddress, setExchangeAddress } =
    useDeliveryStore();
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (buyerAddressIdEncrypt: string) => buyersApi.deleteBuyers(buyerAddressIdEncrypt),
    onSuccess: () => {
      refetch();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (item.defaultYn) {
      setSelectedAddr(item);
    }
  }, [item]);

  const handleDelClick = (buyerAddressIdEncrypt: string) => {
    showModal.text('배송지를 삭제하시겠어요?', {
      content: '기본배송지로 자동 선택됩니다',
      buttonType: 'multi',
      leftTitle: '취소',
      rightTitle: '삭제하기',
      rightonClick: () => {
        deleteMutation(buyerAddressIdEncrypt);
      },
    });
  };
  return (
    <S.AddressItemContainer
      onClick={() => {
        navigate(-1);
        setSelectedAddr(item);
        if (isExist) {
          setExistingAddress({
            name: `${item.receiverName}(${item.name})`,
            contactNumber: item.receiverCellPhone,
            zipCode: item.zipCode,
            address: item.receiverAddress,
            addressDetail: item.receiverAddressDetail,
            shippingMessage: existingAddress?.shippingMessage || '',
          });
        }
        if (isExchange) {
          setExchangeAddress({
            name: `${item.receiverName}(${item.name})`,
            contactNumber: item.receiverCellPhone,
            zipCode: item.zipCode,
            address: item.receiverAddress,
            addressDetail: item.receiverAddressDetail,
            shippingMessage: exchangeAddress?.shippingMessage || '',
          });
        }
      }}
    >
      {item.buyerAddressIdEncrypt === selectedAddr?.buyerAddressIdEncrypt ? (
        <SvgIcon
          name={R.svg.icoCheckCircleFillOn}
          width={24}
          height={24}
        />
      ) : (
        <SvgIcon
          name={R.svg.icoCheckCircleFillOff}
          width={24}
          height={24}
        />
      )}
      <S.AddressInfo>
        <S.AddressName>
          <T.Body1_NormalB $mr={8}>
            {item.receiverName}
            {item.name !== '' && `(${item.name})`}
          </T.Body1_NormalB>
          {item.defaultYn && (
            <div>
              <T.Caption2_NormalM $color={colors.text4}>기본배송지</T.Caption2_NormalM>
            </div>
          )}
        </S.AddressName>
        <T.Body2_NormalM
          $mt={4}
          $mb={8}
        >
          {item.receiverCellPhone}
        </T.Body2_NormalM>
        <T.Body2_Normal
          $color={colors.text4}
          $mb={8}
        >
          {item.receiverAddress} {item.receiverAddressDetail}
        </T.Body2_Normal>
        <S.ControlBtnWrap>
          <S.ControlBtn>
            <T.Body3_NormalM $color={colors.primary_text2}>수정</T.Body3_NormalM>
          </S.ControlBtn>
          {!item.defaultYn && (
            <>
              <span />
              <S.ControlBtn onClick={() => handleDelClick(item.buyerAddressIdEncrypt)}>
                <T.Body3_NormalM $color={colors.text6}>삭제</T.Body3_NormalM>
              </S.ControlBtn>
            </>
          )}
        </S.ControlBtnWrap>
      </S.AddressInfo>
    </S.AddressItemContainer>
  );
};

export default AddressItem;
