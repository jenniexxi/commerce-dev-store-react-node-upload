import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { GoodsReportsReason } from '@type';

import Button from '@components/button/Button';
import Checkbox from '@components/checkbox/Checkbox';
import { addToast } from '@components/toast/Toast';

import { showPriceText } from '@utils/display';
import R from '@utils/resourceMapper';

import GoodsQnasAPI, { GoodsReportsBody } from '@apis/goodsQnasApi';

import SvgIcon from '@commons/SvgIcon';

import Modal from './Modal';
import * as S from './ReportModal.style';

type Props = {
  isVisible: boolean;
  onHide: () => void;
  goodsId: string;
};

const ReportGoodsModal = ({ isVisible, onHide, goodsId }: Props) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [reason, setReason] = useState('');

  const { data: reportGoodsInfo } = useQuery({
    queryKey: ['reportGoodsInfo', goodsId],
    queryFn: () => GoodsQnasAPI.getGoodsReport(goodsId),
  });

  const { mutate: reportGoodsRequest } = useMutation({
    mutationFn: ({ goodsId, body }: { goodsId: string; body: GoodsReportsBody }) =>
      GoodsQnasAPI.postGoodsReports({ goodsId, body }),
    onSuccess: (response) => {
      console.log('상품 정보 신고 처리 성공:', response);
      addToast('신고글이 등록되었어요');
      onHide();
    },
    onError: (error) => {
      console.error('상품 정보 신고 처리 실패:', error);
    },
  });

  const isRegisterEnabled =
    selectedType.length > 0 && (selectedType.includes(GoodsReportsReason.OTHER) ? reason.trim().length >= 10 : true);

  const handleRegister = () => {
    const body: GoodsReportsBody = {
      reportReasonList: selectedType.map((item) => {
        if (item === GoodsReportsReason.OTHER) {
          return { reason, reportTypeEnum: item };
        } else {
          return { reason: '', reportTypeEnum: item };
        }
      }),
      encryptFileId: '',
    };

    reportGoodsRequest({ goodsId, body });
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
          <S.ReportTitle>신고 상품</S.ReportTitle>
          <S.GoodsPart>
            <S.GoodsImg
              src=''
              alt=''
            />
            <S.GoodsInfo>
              <S.GoodsStore>{reportGoodsInfo?.data.storeName}</S.GoodsStore>
              <S.GoodsDisplay>{reportGoodsInfo?.data.goodsName}</S.GoodsDisplay>
              <S.GoodsPrice>
                <S.Rate>{reportGoodsInfo?.data.priceRate}%</S.Rate>
                <S.Price>{showPriceText(reportGoodsInfo?.data.price)}</S.Price>
              </S.GoodsPrice>
            </S.GoodsInfo>
          </S.GoodsPart>
        </S.ReportContsWrap>
        <S.GoodsReportReasonWrap>
          <S.ReportTitle>
            신고 사유<span>중복 선택 가능해요</span>
          </S.ReportTitle>
          <S.ReasonList>
            {reportGoodsInfo?.data?.goodsReportTypeEnumList?.map((item) => (
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
          {selectedType.includes(GoodsReportsReason.OTHER) && (
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
          <Button
            title='사진 등록하기'
            btnType='tertiary'
            width='100%'
            align='center'
            leftIcon={
              <SvgIcon
                name={R.svg.icoPlus}
                width={20}
                height={20}
              />
            }
            style={selectedType.includes(GoodsReportsReason.OTHER) ? { marginTop: '1.6rem' } : {}}
          />
          <S.PreviewWrap>
            <S.ImagePreview>
              <S.PreviewImage
                src=''
                alt=''
              />
              <S.DeleteButton onClick={() => console.log('a')}>
                <SvgIcon
                  name={R.svg.icoCloseCircleOpacity}
                  alt='삭제'
                  width={20}
                  height={20}
                />
              </S.DeleteButton>
            </S.ImagePreview>
            <S.ImagePreview>
              <S.PreviewImage
                src=''
                alt=''
              />
              <S.DeleteButton onClick={() => console.log('a')}>
                <SvgIcon
                  name={R.svg.icoCloseCircleOpacity}
                  alt='삭제'
                  width={20}
                  height={20}
                />
              </S.DeleteButton>
            </S.ImagePreview>
          </S.PreviewWrap>
        </S.GoodsReportReasonWrap>
        <S.NoticeList>
          <li>사진은 1개만 등록 가능합니다.</li>
          <li>허위 또는 판매자의 정당한 판매에 방해를 목적으로 한 신고에 대한 법적 책임은 신고자에게 있습니다.</li>
          <li>처리 결과는 별도로 전달드리지 않습니다.</li>
        </S.NoticeList>
      </Modal>
    );
  } else {
    return null;
  }
};

export default ReportGoodsModal;
