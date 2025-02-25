import { useEffect, useState } from 'react';

import DaumPostcode from 'react-daum-postcode';
import { useForm } from 'react-hook-form';

import { Button, Checkbox, Input, Modal, Selector } from '@components';

import { CreateBuyersBody, DeliveryAddress, Encrypt } from '@apis/buyersApi';

import * as S from './_Buyers.style';

type BuyersFormProps = {
  isUpdateMode: boolean;
  initialData?: DeliveryAddress & Encrypt;
  onSubmit: (data: CreateBuyersBody) => void;
  addressCount?: number;
};

const BuyersForm = ({ isUpdateMode, initialData, onSubmit, addressCount }: BuyersFormProps) => {
  const [isChecked, setIsChecked] = useState(initialData?.defaultYn || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<CreateBuyersBody>({
    defaultValues: initialData,
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (initialData?.receiverCellPhone) {
      const [prefix, mid, suffix] = initialData.receiverCellPhone.split('-');
      return { prefix, mid, suffix };
    }
    return {
      prefix: '010',
      mid: '',
      suffix: '',
    };
  });

  const receiverAddress = watch('receiverAddress');

  useEffect(() => {
    // receiverAddress 값이 변경되면 clearErrors 호출
    if (receiverAddress) {
      clearErrors('receiverAddress');
    }
  }, [receiverAddress, clearErrors]);

  useEffect(() => {
    clearErrors('receiverCellPhone');
  }, [phoneNumber, clearErrors]);

  const address_count = addressCount ?? 0; // nullish coalescing

  const handleCheckboxChange = (checked: boolean) => {
    // 배송지가 하나일 때는 체크박스 상태 변경 불가
    if (address_count <= 1) return;

    setIsChecked(checked);
    setValue('defaultYn', checked);
  };

  const handlePhoneChange = (part: 'prefix' | 'mid' | 'suffix', value: string) => {
    if (!/^\d*$/.test(value)) return;

    setPhoneNumber((prev) => {
      const newPhoneNumber = { ...prev, [part]: value };
      setValue('receiverCellPhone', `${newPhoneNumber.prefix}-${newPhoneNumber.mid}-${newPhoneNumber.suffix}`);
      return newPhoneNumber;
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
    setValue('zipCode', data.zonecode);
    setValue('receiverAddress', fullAddress);
    setIsModalOpen(false);
  };

  const completeForm = (data: CreateBuyersBody) => {
    if (!data.receiverCellPhone || data.receiverCellPhone.length < 11) {
      setError('receiverCellPhone', { message: '번호를 입력해 주세요!' });
      return;
    }

    onSubmit(data);
  };
  return (
    <>
      <S.FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(completeForm)();
        }}
      >
        <S.FormGroup>
          <S.Label>
            받는 분 <S.Required>*</S.Required>
          </S.Label>
          <Input
            name='receiverName'
            useForm={true}
            register={register}
            watch={watch}
            errors={errors}
            rules={{ required: '받는 분은 필수 입력 항목입니다.' }}
            placeholder='받으실 분의 이름을 입력하세요'
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>
            주소 <S.Required>*</S.Required>
          </S.Label>
          <S.AddressInputGroup>
            <Input
              name='zipCode'
              useForm={true}
              register={register}
              watch={watch}
              errors={errors}
              placeholder='우편번호'
              readOnly
            />
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleModalOpen();
                }}
                title='주소찾기'
                size='md'
              />
            </div>
          </S.AddressInputGroup>
          <Input
            name='receiverAddress'
            useForm={true}
            register={register}
            watch={watch}
            errors={errors}
            rules={{ required: '주소는 필수 입력 항목입니다.' }}
            placeholder='주소'
            readOnly
          />
          <Input
            name='receiverAddressDetail'
            useForm={true}
            register={register}
            watch={watch}
            errors={errors}
            placeholder='상세 주소를 입력하세요'
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>
            연락처 <S.Required>*</S.Required>
          </S.Label>
          <S.PhoneInputGroup>
            <Selector<string>
              options={[
                { label: '010', value: '010' },
                { label: '011', value: '011' },
                { label: '016', value: '016' },
                { label: '017', value: '017' },
                { label: '018', value: '018' },
                { label: '019', value: '019' },
              ]}
              defaultValue={phoneNumber.prefix}
              onChange={(value) => handlePhoneChange('prefix', value)}
              width={80}
            />
            <span>-</span>
            <Input
              name='phoneMiddle'
              value={phoneNumber.mid}
              onChange={(e) => handlePhoneChange('mid', e.target.value)}
              maxLength={4}
              width={80}
            />
            <span>-</span>
            <Input
              name='phoneLast'
              value={phoneNumber.suffix}
              onChange={(e) => handlePhoneChange('suffix', e.target.value)}
              maxLength={4}
              width={80}
            />
          </S.PhoneInputGroup>
          {errors.receiverCellPhone?.message && <>{errors.receiverCellPhone?.message}</>}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>배송지명</S.Label>
          <Input
            name='name'
            useForm={true}
            register={register}
            watch={watch}
            errors={errors}
            placeholder='배송지명을 입력해주세요 (예: 집, 회사)'
          />
        </S.FormGroup>

        <S.CheckboxWrapper>
          <Checkbox
            id='defaultYn'
            name='defaultYn'
            value='기본배송지로 선택'
            checked={address_count <= 1 ? true : isChecked}
            onChange={handleCheckboxChange}
            disabled={address_count <= 1}
          />
        </S.CheckboxWrapper>

        <S.ButtonGroup>
          <Button
            title={isUpdateMode ? '배송지 수정' : '저장'}
            size='lg'
            type='submit'
            align='center'
          />
        </S.ButtonGroup>
      </S.FormContainer>
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

export default BuyersForm;
