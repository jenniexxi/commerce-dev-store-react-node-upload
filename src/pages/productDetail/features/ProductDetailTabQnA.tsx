import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, Checkbox, Modal, Togglebox } from '@components';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { GOODS_QNA_ANSWER_STATUS_CODES, GoodsQnaAnswerStatusCode } from '@type';

import ProductInquiry from '@pages/productInquiry/ProductInquiry';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import { DetailsContent } from '@apis/goodsApi';
import GoodsQnasAPI, { GetGoodsQnasResp } from '@apis/goodsQnasApi';

import SvgIcon from '@commons/SvgIcon';

import ProductInquiryDetailItem from './ProductInquiryDetailItem';
import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;
  qnaSize: number;
  goodsInfo: DetailsContent;
  storeName: string;
};

const ProductDetailTabQnA = ({ goodsId, qnaSize, goodsInfo, storeName }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyInquiryToggle, setIsMyInquiryToggle] = useState(false);
  const [isSecretMsg, setIsSecretMsg] = useState(false);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<GoodsQnaAnswerStatusCode | undefined>(undefined);

  const { data: goodsQnaListInfo } = useQuery({
    queryKey: ['goodsQnaListInfo'],
    queryFn: () => GoodsQnasAPI.getGoodsQnaList(),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<GetGoodsQnasResp>({
    queryKey: ['productInquiryInfo', goodsId, isMyInquiryToggle, isSecretMsg, selectedTab],
    queryFn: ({ pageParam = 0 }) =>
      GoodsQnasAPI.getGoodsQnas(goodsId.toString(), {
        page: pageParam as number,
        size: 10,
        myGoodsQnaYn: isMyInquiryToggle,
        // ...(isSecretMsg && { openYn: isSecretMsg }),
        statusEnum: selectedTab,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.content.length === 10) {
        return allPages.length;
      }
      return undefined;
    },
  });
  const bbsTypeId =
    goodsQnaListInfo?.data.bbsTypeList.filter((item) => item.bbsTypeTitle === '상품문의')[0]?.bbsTypeId || 0;
  const inquiries = data?.pages.flatMap((page) => page.data.content) || [];

  const handleOpenInquiryModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.ProductDetail>
      <S.CautionList>
        <S.CautionTitle>직거래 유도 주의 안내</S.CautionTitle>
        <S.CautionInfo>
          <li>상품 결제 취소 후 문자 등을 활용하여 현금 입금 및 타 사이트 결제를 유도할 경우 절대 입금하지마세요.</li>
          <li>상품 문의 작성 시 비밀번호를 포함한 개인정보 입력을 유도할 경우 절대 입력하지 마세요.</li>
          <li>
            판매자가 타 사이트 안내 및 현금 결제, 개인정보 유도 시 결제 및 입력하지 마시고 즉시{' '}
            <Link to='/'>고객센터</Link>로 신고해주세요.
          </li>
        </S.CautionInfo>
      </S.CautionList>
      <S.WriteInquiry>
        <S.WriteInquiryTit>상품에 대해 궁금한 것이 있으신가요?</S.WriteInquiryTit>
        <p>문의하신 내용에 대해서 판매자가 확인 후 답변을 드려요.</p>
        <Button
          title={'상품 문의 작성하기'}
          rightIcon={<img src={R.svg.icoChevronRight} />}
          btnType='tertiary'
          onClick={handleOpenInquiryModal}
          width='100%'
          align='center'
        />
      </S.WriteInquiry>
      <S.InquiryListWrap>
        <S.InquiryTab>
          <ul>
            <S.TabItem
              $isActive={selectedTab === undefined}
              onClick={() => setSelectedTab(undefined)}
            >
              전체
            </S.TabItem>
            <S.TabItem
              $isActive={selectedTab === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE}
              onClick={() => setSelectedTab(GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_DONE)}
            >
              답변완료
            </S.TabItem>
            <S.TabItem
              $isActive={selectedTab === GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_HOLD}
              onClick={() => setSelectedTab(GOODS_QNA_ANSWER_STATUS_CODES.ANSWER_HOLD)}
            >
              답변예정
            </S.TabItem>
          </ul>
          <S.MyInquiryTab>
            <S.TabTit>내 상품문의 보기</S.TabTit>
            <Togglebox
              id='string'
              value='myGoodsView'
              name='myGoodsView'
              checked={isMyInquiryToggle}
              onChange={(checked) => setIsMyInquiryToggle(checked)}
            />
          </S.MyInquiryTab>
        </S.InquiryTab>
        <S.SecretMsg>
          <Checkbox
            id='secretMsg'
            name='secretMsg'
            value='비밀글 제외'
            fontType='body2_normal'
            checked={isSecretMsg}
            onChange={setIsSecretMsg}
          />
        </S.SecretMsg>
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((item) => {
            return (
              <ProductInquiryDetailItem
                key={item.createBuyerLoginId}
                item={item}
                bbsTypeId={bbsTypeId}
                goodsId={goodsId}
                goodsInfo={goodsInfo}
                storeName={storeName}
                refetch={refetch}
              />
            );
          })
        ) : (
          <S.NoDataWrap>
            <SvgIcon
              name={R.svg.icoExclamationCircleFill}
              tintColor={colors.status_disabled}
              width={64}
              height={64}
            />
            <p>작성된 상품문의가 없어요</p>
          </S.NoDataWrap>
        )}
      </S.InquiryListWrap>
      {hasNextPage && (
        <S.BtnBox>
          <Button
            btnType='tertiary'
            title={'상품 Q&A 10개 더보기'}
            onClick={() => fetchNextPage()}
            width='100%'
            align='center'
          />
        </S.BtnBox>
      )}
      {isModalOpen && (
        <Modal
          type='full'
          title='상품 문의 작성하기'
          onHide={handleCloseModal}
        >
          <ProductInquiry
            goodsId={goodsId}
            onClose={handleCloseModal}
            bbsTypeId={bbsTypeId}
            goodsInfo={{
              originImageFilesUrl: goodsInfo.originImageFilesUrl,
              storeName: storeName,
              displayName: goodsInfo.displayGoodsName,
            }}
            refetch={refetch}
          />
        </Modal>
      )}
    </S.ProductDetail>
  );
};

export default ProductDetailTabQnA;
