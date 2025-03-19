import { useEffect, useState } from 'react';

import { T } from '@commons';
import { Checkbox, Input, Radio, Selector } from '@components';
import { CASH_RECEIPT_TYPE, IDENTITY_TYPE } from '@type';

import { RadioItem } from '@components/radio/Radio';

import { useOrderStore } from '@stores/useOrderStore';

import { CashReceipt } from '@apis/orderApi';

import Separator from '@commons/Separator';

import * as S from './_Order.style';

type Props = {
  cashReceipt?: CashReceipt;
};
const radioItems: RadioItem<string>[] = [
  { id: 'receipt1', label: '신청', value: 'apply', radioGroup: 'group1' },
  { id: 'receipt2', label: '미신청', value: 'pass', radioGroup: 'group1' },
];

const PrivateReceiptType = [
  { label: '휴대폰 번호', value: { code: IDENTITY_TYPE.CASH_RECEIPT_IDENTITY_PHONE_NUMBER, codeName: '휴대폰 번호' } },
  {
    label: '현금영수증 카드번호',
    value: { code: IDENTITY_TYPE.CASH_RECEIPT_IDENTITY_CASH_RECEIPT_CARD, codeName: '현금영수증 카드번호' },
  },
];

const CashReceiptInfo = ({ cashReceipt }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>('apply');

  const [saveReceiptInfo, setSaveReceiptInfo] = useState(true);

  const [error, setError] = useState('');

  const {
    payment,
    setPayment,
    setCashReceiptYn,
    purposeEnum,
    setPurposeEnum,
    identityTypeEnum,
    setIdentityTypeEnum,
    identity,
    setIdentity,
  } = useOrderStore();

  useEffect(() => {
    if (cashReceipt) {
      setIdentity(cashReceipt.identity);
      setIdentityTypeEnum(cashReceipt.identityTypeEnum);
      setPurposeEnum(cashReceipt.purposeEnum);
    }
  }, [cashReceipt]);
  useEffect(() => {
    setPayment({ ...payment, bankUseAgainYn: saveReceiptInfo });
  }, [saveReceiptInfo]);

  useEffect(() => {
    if (selectedValue === 'apply') {
      setCashReceiptYn(true);
      if (!cashReceipt) {
        setIdentityTypeEnum({ code: IDENTITY_TYPE.CASH_RECEIPT_IDENTITY_PHONE_NUMBER, codeName: '휴대폰 번호' });
        setPurposeEnum({ code: CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_DEDUCTION, codeName: '개인 소득공제' });
      }
    } else {
      setIdentity('');
      setIdentityTypeEnum(undefined);
      setPurposeEnum(undefined);
      setCashReceiptYn(false);
    }
  }, [selectedValue]);

  return (
    <>
      <S.CashReceiptContainer>
        <S.SectionTitleWrap>
          <T.Headline2B>현금영수증</T.Headline2B>
          <S.SectionTitleRight>
            {radioItems.map((item) => (
              <Radio
                key={item.id}
                id={item.id}
                value={item.value}
                label={item.label}
                name={item.radioGroup}
                selectedValue={selectedValue}
                fontType='body2_normalm'
                onChange={setSelectedValue}
              />
            ))}
          </S.SectionTitleRight>
        </S.SectionTitleWrap>
        {selectedValue === 'apply' ? (
          <>
            <S.TypeSelector>
              <S.ReceiptType
                $isSelected={purposeEnum?.code !== CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_PROOF}
                onClick={() =>
                  setPurposeEnum({ code: CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_DEDUCTION, codeName: '개인 소득공제' })
                }
              >
                <span>개인 소득공제</span>
              </S.ReceiptType>
              <S.ReceiptType
                $isSelected={purposeEnum?.code === CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_PROOF}
                onClick={() =>
                  setPurposeEnum({ code: CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_PROOF, codeName: '개인 소득공제' })
                }
              >
                <span>사업자 증빙용</span>
              </S.ReceiptType>
            </S.TypeSelector>
            {purposeEnum?.code !== CASH_RECEIPT_TYPE.CASH_RECEIPT_PURPOSE_PROOF ? (
              <S.ReceiptInfoContainer>
                <Selector
                  options={PrivateReceiptType}
                  defaultValue={{ code: IDENTITY_TYPE.CASH_RECEIPT_IDENTITY_PHONE_NUMBER, codeName: '휴대폰 번호' }}
                  onChange={(value) => {
                    setIdentityTypeEnum(value);
                  }}
                />
                <Input
                  name='receitNumber'
                  height='md'
                  placeholder={
                    identityTypeEnum?.code !== IDENTITY_TYPE.CASH_RECEIPT_IDENTITY_CASH_RECEIPT_CARD
                      ? '휴대폰 번호'
                      : '현금영수증 카드번호'
                  }
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  resetValue={() => {
                    setIdentity('');
                  }}
                  error={error}
                />
              </S.ReceiptInfoContainer>
            ) : (
              <S.ReceiptInfoContainer>
                <Input
                  name='receitNumber'
                  height='md'
                  placeholder={'사업자 등록번호'}
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  resetValue={() => {
                    setIdentity('');
                  }}
                  error={error}
                />
              </S.ReceiptInfoContainer>
            )}
            <Checkbox
              id='saveReceiptInfo'
              name='saveReceiptInfo'
              value='다음에도 사용'
              fontType='body2_normalm'
              checked={saveReceiptInfo}
              onChange={() => {
                setSaveReceiptInfo(!saveReceiptInfo);
              }}
            />
          </>
        ) : (
          <></>
        )}
      </S.CashReceiptContainer>
      <Separator $height={8} />
    </>
  );
};

export default CashReceiptInfo;
