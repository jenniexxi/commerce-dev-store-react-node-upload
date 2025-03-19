import { useState } from 'react';

import { T } from '@commons';
import { Modal } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GOODS_QNA_ANSWER_STATUS_CODES } from '@type';
import dayjs from 'dayjs';

import TextButton from '@components/button/TextButton';
import { hideModal, showModal } from '@components/modal/ModalManager';
import ReportModal from '@components/modal/ReportModal';
import { addToast } from '@components/toast/Toast';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import GoodsQnasAPI, { GoodsQnasInquiryMeContent } from '@apis/goodsQnasApi';

import ProductInquiry from '../ProductInquiry';
import * as S from '../ProductInquiry.style';

type InquiryItemProps = {
  item: GoodsQnasInquiryMeContent;
  refetch: () => void;
};

const InquiryItem = ({ item, refetch }: InquiryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [bbsTargetEncryptId, setBbsTargetEncryptId] = useState('');

  const { data: goodsQnaListInfo } = useQuery({
    queryKey: ['goodsQnaListInfo'],
    queryFn: () => GoodsQnasAPI.getGoodsQnaList(),
  });

  const { mutate: deleteGoodsQnasMeInquiry } = useMutation({
    mutationFn: (goodsQnaIdEncrypt: string) => GoodsQnasAPI.deleteGoodsQnas(goodsQnaIdEncrypt),
    onSuccess: () => {
      console.log('상품 문의 삭제 성공');
      addToast('작성한 상품 문의가 삭제되었어요');
      refetch();
    },
    onError: (error) => {
      console.log('상품 문의 삭제 실패', error);
    },
  });

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleDeclare = (bbsTargetEncryptId: string) => {
    setBbsTargetEncryptId(bbsTargetEncryptId);
    setShowReportModal(true);
  };

  const bbsTypeId =
    goodsQnaListInfo?.data.bbsTypeList.filter((item) => item.bbsTypeTitle === '상품문의')[0]?.bbsTypeId || 0;

  return (
    <>
      <S.StatusGroup>
        <S.StatusBox>
          <T.Body3_NormalB
            $color={
              item.statusEnum?.code === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE ? colors.primary_text1 : colors.text5
            }
            $mr={8}
          >
            {item.statusEnum?.codeName}
          </T.Body3_NormalB>
          <S.DateInquiry>{dayjs(item.createDatetime).format('YYYY.MM.DD')}</S.DateInquiry>
        </S.StatusBox>
        <S.BtnBox>
          <TextButton
            title='수정'
            color={colors.primary_text2}
            onClick={() => handleUpdate()}
          />
          <TextButton
            title='삭제'
            onClick={() => {
              let modalId = '';
              modalId = showModal.text('작성한 상품문의를 삭제하시겠습니까?', {
                buttonType: 'multi',
                leftTitle: '취소하기',
                rightTitle: '삭제하기',
                leftonClick: () => hideModal(modalId),
                rightonClick: () => {
                  deleteGoodsQnasMeInquiry(item.goodsQnaIdEncrypt);
                  hideModal(modalId);
                },
              });
            }}
          />
        </S.BtnBox>
      </S.StatusGroup>
      <S.GoodsGroup>
        <img
          src={item.imageFilesUrl}
          alt={item.displayGoodsName}
        />
        <S.TextBox>
          <S.StoreName>{item.brandName}</S.StoreName>
          <S.GoodsName>{item.displayGoodsName}</S.GoodsName>
        </S.TextBox>
      </S.GoodsGroup>
      <S.QnaGroup>
        <S.InquiryContents>
          <S.TitSvgIcon
            name={R.svg.icoQuestion}
            width={12}
            height={14}
          />
          <S.GoodsContents $expanded={isExpanded}>{item.contents}</S.GoodsContents>
        </S.InquiryContents>
        {isExpanded && (
          <S.AnswerContents>
            <S.TitSvgIcon
              name={R.svg.icoAnswer}
              width={12}
              height={14}
            />
            {item.answerList.length > 0 ? (
              item.answerList.map((answer) => (
                <S.AnswerBox>
                  <T.Body2_Normal>{answer.text}</T.Body2_Normal>
                  <S.DateInfoBox>
                    <S.AnswerDate>{dayjs(answer.createDatetime).format('YYYY.MM.DD')}</S.AnswerDate>
                    <TextButton
                      title='신고'
                      onClick={() => handleDeclare(answer.goodsQnaAnswerIdEncrypt)}
                    />
                  </S.DateInfoBox>
                </S.AnswerBox>
              ))
            ) : (
              <S.AnswerBox>
                <p>
                  판매자가 확인 후 답변 예정입니다.
                  <br />
                  잠시만 기다려주세요!
                </p>
              </S.AnswerBox>
            )}
          </S.AnswerContents>
        )}
      </S.QnaGroup>
      {isExpanded ? (
        <S.AnswerSvgIcon
          name={isExpanded ? R.svg.icoChevronUp : R.svg.icoChevronDown}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      ) : (
        <S.DateGroup>
          <S.AnswerSvgIcon
            name={isExpanded ? R.svg.icoChevronUp : R.svg.icoChevronDown}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </S.DateGroup>
      )}
      <ReportModal
        isVisible={showReportModal}
        onHide={() => setShowReportModal(false)}
        bbsTypeEnum='REPORT.BBS_TYPE.GOODS_QNA_ANSWER'
        bbsTargetEncryptId={bbsTargetEncryptId}
      />
      {showUpdateModal && (
        <Modal
          onHide={() => setShowUpdateModal(false)}
          type='full'
          title='상품 문의 수정하기'
        >
          <ProductInquiry
            goodsId={item.goodsId}
            goodsInfo={{
              originImageFilesUrl: item.imageFilesUrl,
              storeName: item.storeName,
              displayName: item.displayGoodsName,
            }}
            bbsTypeId={bbsTypeId}
            onClose={() => setShowUpdateModal(false)}
            isModify={true}
            inquiryData={item}
            refetch={refetch}
          />
        </Modal>
      )}
    </>
  );
};

export default InquiryItem;
