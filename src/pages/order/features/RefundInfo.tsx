import { useEffect, useState } from 'react';

import { T } from '@commons';
import { Button, Checkbox, Input, Selector } from '@components';
import { useMutation } from '@tanstack/react-query';
import { BankCode } from '@type';

import { showModal } from '@components/modal/ModalManager';

import { useOrderStore } from '@stores/useOrderStore';

import { colors } from '@styles/theme';

import { Code } from '@apis/apiCommonType';
import { RefundBankInfo } from '@apis/orderApi';
import SystemAPI, { CheckAccountReq } from '@apis/systemApi';

import Separator from '@commons/Separator';

import * as S from './_Order.style';

type Props = {
  bank?: RefundBankInfo;
  bankListEnum?: Code<BankCode>[];
};
const RefundInfo = ({ bank, bankListEnum }: Props) => {
  const { payment, setPayment, setBankEnum, setBankAccountHolder, setBankAccountNumber } = useOrderStore();

  const [saveRefundInfo, setSaveRefundInfo] = useState(true);
  const [selectBank, setSelectBank] = useState<Code<BankCode>>();
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccoutNumber] = useState('');
  const [enableAccountCheck, setEnableAccountCheck] = useState(false);
  const [inputBankInfom, setInputBankInfo] = useState(false);

  const { mutate: checkAccount } = useMutation({
    mutationFn: (body: CheckAccountReq) => SystemAPI.postCheckAccount(body),
    onSuccess: (resp) => {
      if (resp.success) {
        showModal.text('본인계좌인증이 완료되었습니다');
        setBankEnum(selectBank!);
        setBankAccountHolder(accountHolder);
        setBankAccountNumber(accountNumber);
        setPayment({ ...payment, bankUseAgainYn: saveRefundInfo });
        setEnableAccountCheck(false);
      } else {
        showModal.text('본인계좌인증에 실패했습니다', { content: '계좌정보를 다시 확인 주세요.' });
      }
    },
  });

  useEffect(() => {
    if (!selectBank || accountHolder === '' || accountNumber.length < 7) {
      setEnableAccountCheck(false);
    } else {
      setEnableAccountCheck(true);
    }
  }, [selectBank, accountHolder, accountNumber]);

  useEffect(() => {
    if (bank?.bankEnum) {
      setInputBankInfo(false);
    } else {
      setInputBankInfo(true);
    }
  }, [bank]);

  const checkRefundAccount = () => {
    checkAccount({ bankEnum: selectBank!, bankAccountNumber: accountNumber, bankAccountHolder: accountHolder });
  };
  return (
    <>
      <S.RefundInfoContainer>
        <S.SectionTitleWrap>
          <T.Headline2B>환불계좌</T.Headline2B>
        </S.SectionTitleWrap>

        {!inputBankInfom ? (
          <S.AccountInfoView>
            <S.BankInfoView>
              <T.Body1_NormalB $mb={4}>{bank?.bankEnum?.codeName}</T.Body1_NormalB>
              <T.Body1_NormalM>{bank?.bankAccountNumber}</T.Body1_NormalM>
            </S.BankInfoView>
            <Button
              btnType='tertiary'
              size='xsm'
              title='변경'
            />
          </S.AccountInfoView>
        ) : (
          <S.RefundInfoView>
            <Selector
              placeholder={'은행선택'}
              defaultValue={selectBank}
              options={
                bankListEnum?.map((item) => {
                  return { label: item.codeName, value: item };
                }) || []
              }
              onChange={(value) => {
                setSelectBank(value);
              }}
            />
            <S.AccountView>
              <Input
                name='accoutHolder'
                placeholder='예금주'
                height='md'
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </S.AccountView>
            <S.AccountView>
              <Input
                name='accoutHolder'
                placeholder='계좌번호'
                height='md'
                value={accountNumber}
                inputMode='numeric'
                onChange={(e) => setAccoutNumber(e.target.value)}
              />
              <Button
                size='md'
                title='계좌 인증'
                onClick={checkRefundAccount}
                disabled={!enableAccountCheck}
              />
            </S.AccountView>
            <T.Caption1_Normal
              $color={colors.text5}
              $mt={8}
              $mb={16}
            >
              평생 계좌는 등록할 수 없습니다.
            </T.Caption1_Normal>
            <Checkbox
              id='saveAccount'
              name='saveAccount'
              value='다음에도 사용'
              fontType='body2_normalm'
              checked={saveRefundInfo}
              onChange={() => {
                setSaveRefundInfo(!saveRefundInfo);
              }}
            />
          </S.RefundInfoView>
        )}
      </S.RefundInfoContainer>
      <Separator $height={8} />
    </>
  );
};

export default RefundInfo;
