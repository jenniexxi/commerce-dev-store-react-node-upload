import { useEffect, useState } from 'react';

import DaumPostcode, { Address } from 'react-daum-postcode';

import { T } from '@commons';
import { useMutation } from '@tanstack/react-query';

import Button from '@components/button/Button';
import TwoButton from '@components/button/TwoButton';
import Checkbox from '@components/checkbox/Checkbox';
import Input from '@components/input/Input';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import buyersApi, { CreateBuyersBody, DeliveryAddress } from '@apis/buyersApi';

import SvgIcon from '@commons/SvgIcon';

import * as S from './AddAddressModal.style';
import Modal from './Modal';

type Props = {
  isVisible: boolean;
  onHide: () => void;
  refetch: () => void;
};
const AddAddressModal = ({ isVisible, onHide, refetch }: Props) => {
  const [title, setTitle] = useState('주소 찾기');
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>();
  const [detailAddr, setDetailAddr] = useState('');
  const [showPlaceNameInput, setShowPlaceNameInput] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [showMobileNumber, setShowMobileNumber] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [defaultPlace, setDefaultPlace] = useState(true);
  const [receiverError, setReceiverError] = useState('');
  const [mobileError, setMobileError] = useState('');

  // Mutations
  const { mutate: createNewAddress } = useMutation({
    mutationFn: (data: CreateBuyersBody) => buyersApi.createBuyers(data),
    onSuccess: () => {
      refetch();
      onHide();
      resetAddress();
    },
  });

  useEffect(() => {
    if (step === 1) {
      setTitle('주소 찾기');
    } else if (step === 2) {
      setTitle('상세 주소 입력하기');
    } else if (step === 3) {
      setTitle('상세 정보 입력하기');
    }
  }, [step]);

  useEffect(() => {
    if (receiverError !== '' && receiverName !== '') {
      setReceiverError('');
    }
  }, [receiverName]);

  useEffect(() => {
    if (mobileError !== '' && mobileNumber !== '') {
      setMobileError('');
    }
  }, [mobileNumber]);

  const createAddress = () => {
    if (receiverName === '') {
      setReceiverError('이름을 확인해주세요');
      return;
    }

    if (mobileNumber === '') {
      setMobileError('휴대폰 번호를 확인해주세요');
      return;
    }

    const body: CreateBuyersBody = {
      receiverName: receiverName,
      receiverAddress: address?.roadAddress || '',
      receiverCellPhone: mobileNumber,
      defaultYn: defaultPlace,
      name: placeName,
      zipCode: address?.zonecode || '',
      receiverAddressDetail: detailAddr,
    };

    createNewAddress(body);
  };

  const resetAddress = () => {
    setStep(1);
    setAddress(undefined);
    setDetailAddr('');
    setShowPlaceNameInput(false);
    setPlaceName('');
    setReceiverName('');
    setShowMobileNumber(false);
    setMobileNumber('');
    setDefaultPlace(true);
    setReceiverError('');
    setMobileError('');
  };
  if (isVisible) {
    return (
      <Modal
        onHide={() => {
          onHide();
          resetAddress();
        }}
        type='full'
        title={title}
        fixedArea={
          <S.ButtonWrapper>
            {step === 2 && (
              <Button
                title={'확인'}
                width='100%'
                align='center'
                onClick={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <TwoButton
                leftTitle='취소'
                rightTitle='등록하기'
                leftSize={4}
                rightSize={6}
                rightonClick={createAddress}
                leftonClick={onHide}
              />
            )}
          </S.ButtonWrapper>
        }
      >
        {step === 1 && (
          <DaumPostcode
            onComplete={(data: Address) => {
              setAddress(data);
              setStep(2);
            }}
            autoClose={false}
          />
        )}
        {(step === 2 || step === 3) && (
          <S.AddrModalContainer>
            {step === 3 && (
              <S.Step3ReceiverName>
                <T.Body2_NormalM $mb={8}>
                  받는 분 <span>*</span>
                </T.Body2_NormalM>
                <Input
                  error={receiverError}
                  name='receiverName'
                  height='md'
                  placeholder='이름을 입력해주세요'
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  resetValue={() => {
                    setReceiverName('');
                  }}
                  onBlur={() => {
                    setShowMobileNumber(true);
                  }}
                />
                {showMobileNumber && (
                  <>
                    <T.Body2_NormalM
                      $mb={8}
                      $mt={24}
                    >
                      휴대폰 번호 <span>*</span>
                    </T.Body2_NormalM>
                    <Input
                      error={mobileError}
                      name='receiverName'
                      height='md'
                      placeholder='휴대폰 번호를 입력해주세요'
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      resetValue={() => {
                        setMobileNumber('');
                      }}
                    />
                  </>
                )}
              </S.Step3ReceiverName>
            )}
            <S.ChangeAddrView>
              <T.Body2_NormalM>
                주소 <span>*</span>
              </T.Body2_NormalM>
              <Button
                title='주소 찾기'
                btnType='secondary'
                size='xsm'
                onClick={resetAddress}
              />
            </S.ChangeAddrView>
            <T.Body2_NormalM $mb={2}>{address?.zonecode}</T.Body2_NormalM>
            <T.Body1_NormalM $mb={12}>{address?.roadAddress}</T.Body1_NormalM>
            <Input
              name='detailAddr'
              height='md'
              placeholder='상세주소를 입력해 주세요'
              value={detailAddr}
              onChange={(e) => setDetailAddr(e.target.value)}
              resetValue={() => {
                setDetailAddr('');
              }}
            />
            <S.DeliveryPlaceName>
              <T.Body2_NormalM $mb={8}>배송지명</T.Body2_NormalM>
              <S.PlaceNameBtnContainer>
                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(false);
                    setPlaceName('우리집');
                  }}
                  $isSelected={placeName === '우리집'}
                >
                  <SvgIcon
                    name={R.svg.icoHome}
                    tintColor={placeName === '우리집' ? colors.text1 : colors.text3}
                  />
                  <T.Body3_NormalM>우리집</T.Body3_NormalM>
                </S.PlaceNameBtn>
                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(false);
                    setPlaceName('회사');
                  }}
                  $isSelected={placeName === '회사'}
                >
                  <SvgIcon
                    name={R.svg.icoCompany}
                    tintColor={placeName === '회사' ? colors.text1 : colors.text3}
                  />
                  <T.Body3_NormalM>회사</T.Body3_NormalM>
                </S.PlaceNameBtn>

                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(true);
                    setPlaceName('');
                  }}
                  $isSelected={showPlaceNameInput}
                >
                  <T.Body3_NormalM>직접입력</T.Body3_NormalM>
                </S.PlaceNameBtn>
              </S.PlaceNameBtnContainer>
              {showPlaceNameInput && (
                <>
                  <div style={{ marginTop: 8 }} />
                  <Input
                    name='placeName'
                    height='md'
                    placeholder='배송지 별명을 지어주세요'
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    resetValue={() => setPlaceName('')}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <div style={{ marginTop: 16 }} />
                  <Checkbox
                    id='defaultPlace'
                    name='defaultPlace'
                    value='기본배송지로 선택'
                    fontType='body2_normal'
                    checked={defaultPlace}
                    onChange={setDefaultPlace}
                  />
                </>
              )}
            </S.DeliveryPlaceName>
          </S.AddrModalContainer>
        )}
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default AddAddressModal;
