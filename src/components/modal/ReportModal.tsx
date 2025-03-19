import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ReportsReason } from '@type';

import Checkbox from '@components/checkbox/Checkbox';
import { addToast } from '@components/toast/Toast';

import GoodsQnasAPI, { ReportsBody } from '@apis/goodsQnasApi';

import Modal from './Modal';
import * as S from './ReportModal.style';

type Props = {
  isVisible: boolean;
  onHide: () => void;
  bbsTargetEncryptId: string;
  bbsTypeEnum: string;
};

const ReportModal = ({ isVisible, onHide, bbsTargetEncryptId, bbsTypeEnum }: Props) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [reason, setReason] = useState('');

  const { data: reportInfo } = useQuery({
    queryKey: ['reportInfo', bbsTargetEncryptId, bbsTypeEnum],
    queryFn: () => GoodsQnasAPI.getReport(bbsTargetEncryptId, bbsTypeEnum),
  });

  const { mutate: reportGoodsRequest } = useMutation({
    mutationFn: ({ bbsTargetEncryptId, body }: { bbsTargetEncryptId: string; body: ReportsBody }) =>
      GoodsQnasAPI.postReports({ bbsTargetEncryptId, body }),
    onSuccess: (response) => {
      console.log('리뷰/상품 문의 글 신고 처리 성공:', response);
      addToast('신고글이 등록되었어요');
      onHide();
    },
    onError: (error) => {
      console.error('리뷰/상품 문의 글 신고 처리 실패:', error);
    },
  });

  const isRegisterEnabled =
    selectedType.length > 0 && (selectedType.includes(ReportsReason.Other) ? reason.trim().length >= 10 : true);

  const handleRegister = () => {
    const body: ReportsBody = {
      reason: reason.trim(),
      reportTypeEnum: selectedType.join(','),
      bbsTypeEnum,
    };

    reportGoodsRequest({ bbsTargetEncryptId, body });
  };

  if (isVisible) {
    return (
      <Modal
        onHide={onHide}
        type='full'
        title='작성글 신고하기'
        fixedArea={
          <S.TwoButtonWrap
            leftTitle='취소하기'
            rightTitle='등록하기'
            rightDisabled={!isRegisterEnabled}
            rightonClick={() => handleRegister()}
            leftonClick={() => onHide()}
          />
        }
      >
        <S.ReportContsWrap>
          <S.ReportTitle>신고 대상 ID 및 내용</S.ReportTitle>
          <S.NickBoxArea>
            <S.NickBox>
              <img
                src=''
                alt=''
              />
              <span>{reportInfo?.data?.nickname}</span>
            </S.NickBox>
            <p>{reportInfo?.data?.text}</p>
          </S.NickBoxArea>
        </S.ReportContsWrap>
        <S.ReportReasonWrap>
          <S.ReportTitle>
            신고 사유<span>중복 선택 가능해요</span>
          </S.ReportTitle>
          <S.ReasonList>
            {reportInfo?.data.bbsReportTypeEnum.map((item) => (
              <li key={item.code}>
                <Checkbox
                  id={item.code}
                  name={item.code}
                  value={item.codeName}
                  chkType='outline'
                  fontType='body1_normal'
                  checked={selectedType.includes(item.code)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedType((prev) => [...prev, item.code]);
                    } else {
                      setSelectedType((prev) => prev.filter((type) => type !== item.code));
                    }
                  }}
                />
              </li>
            ))}
          </S.ReasonList>
          {selectedType.includes(ReportsReason.Other) && (
            <S.TextAreaConts>
              <S.TextArea
                placeholder='추가로 신고하자고하는 내용을 작성해주세요. 단, 신고 내용 외에 개인 정보(연락처, 주소 등)는 입력하지 않도록 유의해주세요.'
                value={reason}
                maxLength={1000}
                onChange={(e) => {
                  setReason(e.target.value.trimStart());
                }}
              />
              <S.NumberCountBox>
                <S.NumberCount>{reason.length}</S.NumberCount>1000
              </S.NumberCountBox>
            </S.TextAreaConts>
          )}
        </S.ReportReasonWrap>
        <S.NoticeList>
          <li>신고내용은 운영자 검토 후 내부 정책에 의해 조치될 예정입니다.</li>
        </S.NoticeList>
      </Modal>
    );
  } else {
    return null;
  }
};

export default ReportModal;
