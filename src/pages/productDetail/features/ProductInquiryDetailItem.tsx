import { useRef, useState } from 'react';

import { T } from '@commons';
import { Modal } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GOODS_QNA_ANSWER_STATUS_CODES, GOODS_REPORT_STATUS_CODES, GoodsReportStatusCode } from '@type';
import dayjs from 'dayjs';

import TextButton from '@components/button/TextButton';
import { hideModal, showModal } from '@components/modal/ModalManager';
import ReportModal from '@components/modal/ReportModal';
import { addToast } from '@components/toast/Toast';

import ProductInquiry from '@pages/productInquiry/ProductInquiry';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import { DetailsContent } from '@apis/goodsApi';
import GoodsQnasAPI, { GetGoodsContent } from '@apis/goodsQnasApi';

import * as S from './_ProductDetail.style';

type InquiryItemProps = {
  item: GetGoodsContent;
  goodsInfo: DetailsContent;
  storeName: string;
  goodsId: number;
  bbsTypeId: number;
  refetch: () => void;
};

const ProductInquiryDetailItem = ({ item, goodsId, goodsInfo, storeName, bbsTypeId, refetch }: InquiryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const bbsTypeEnumRef = useRef<GoodsReportStatusCode>(GOODS_REPORT_STATUS_CODES.GOODS_QNA);
  const bbsTargetEncryptIdRef = useRef('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const handleDeclare = (bbsTypeEnum: GoodsReportStatusCode, bbsTargetEncryptId: string) => {
    bbsTypeEnumRef.current = bbsTypeEnum;
    bbsTargetEncryptIdRef.current = bbsTargetEncryptId;
    setShowReportModal(true);
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  return (
    <S.InquiryItemWrap key={item.createBuyerLoginId}>
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
          <S.BuyerId>{item.createBuyerLoginId}</S.BuyerId>
        </S.StatusBox>
        <S.DateBox>
          <S.DateInquiry>{dayjs(item.createDatetime).format('YYYY.MM.DD')}</S.DateInquiry>
          <TextButton
            title='신고'
            onClick={() => handleDeclare(GOODS_REPORT_STATUS_CODES.GOODS_QNA, item.goodsQnaIdEncrypt)}
          />
        </S.DateBox>
      </S.StatusGroup>
      <S.QnaGroup>
        <S.InquiryContents>
          {item.openYn ? (
            <S.TitSvgIcon
              name={R.svg.icoQuestion}
              width={16}
              height={16}
            />
          ) : (
            <S.TitSvgIcon
              name={R.svg.icoLock}
              width={12}
              height={14}
            />
          )}
          <S.GoodsContents $expanded={isExpanded}>{item.contents}</S.GoodsContents>
        </S.InquiryContents>
        {isExpanded && (
          <>
            <S.AnswerContents>
              <S.TitSvgIcon
                name={R.svg.icoAnswer}
                width={12}
                height={14}
              />
              {item.answerList.length > 0 ? (
                item.answerList.map((answer) => (
                  <>
                    <S.AnswerBox>
                      <T.Body2_Normal>{answer.text}</T.Body2_Normal>
                      <S.DateInfoBox>
                        <S.AnswerDate>{dayjs(answer.createDatetime).format('YYYY.MM.DD')}</S.AnswerDate>
                        <TextButton
                          title='신고'
                          onClick={() =>
                            handleDeclare(GOODS_REPORT_STATUS_CODES.GOODS_QNA_ANSWER, answer.goodsQnaAnswerIdEncrypt)
                          }
                        />
                      </S.DateInfoBox>
                    </S.AnswerBox>
                  </>
                ))
              ) : (
                <S.AnswerBox>
                  <T.Body2_Normal>
                    판매자가 확인 후 답변 예정입니다.
                    <br />
                    잠시만 기다려주세요!
                  </T.Body2_Normal>
                </S.AnswerBox>
              )}
            </S.AnswerContents>
          </>
        )}
      </S.QnaGroup>
      {isExpanded ? (
        <>
          <S.AnswerSvgIcon
            $expanded={isExpanded}
            name={isExpanded ? R.svg.icoChevronUp : R.svg.icoChevronDown}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <S.TextBoxWrap>
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
          </S.TextBoxWrap>
        </>
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
        bbsTypeEnum={bbsTypeEnumRef.current}
        bbsTargetEncryptId={bbsTargetEncryptIdRef.current}
      />
      {showUpdateModal && (
        <Modal
          onHide={() => setShowUpdateModal(false)}
          type='full'
          title='상품 문의 수정하기'
        >
          <ProductInquiry
            goodsId={goodsId}
            goodsInfo={{
              originImageFilesUrl: goodsInfo.originImageFilesUrl,
              storeName: storeName,
              displayName: goodsInfo.displayGoodsName,
            }}
            bbsTypeId={bbsTypeId}
            onClose={() => setShowUpdateModal(false)}
            isModify={true}
            inquiryData={{
              ...item,
              goodsId,
              displayStatusEnum: goodsInfo.displaySaleStatusEnum,
              adultYn: false,
              imageFilesUrl: goodsInfo.originImageFilesUrl,
              storeName,
              displayGoodsName: goodsInfo.displayGoodsName,
              brandName: '',
              receiveAlertYn: false,
            }}
            refetch={refetch}
          />
        </Modal>
      )}
    </S.InquiryItemWrap>
  );
};

export default ProductInquiryDetailItem;
