import { useEffect, useRef, useState } from 'react';

import { Tab } from '@components';

import { parseEscapeToHtml } from '@utils/display';

import { DetailsContent } from '@apis/goodsApi';

import ProductDetailTabQnA from './ProductDetailTabQnA';
import ProductDetailTabReview from './ProductDetailTabReview';
import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
  storeName: string;
};

const ProductDetailTab = ({ goodsInfo, goodsId, storeName }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLessThanLimit, setIsLessThanLimit] = useState(false);
  const detailContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!goodsInfo || !detailContentRef.current) return;

    setTimeout(() => {
      if (detailContentRef.current) {
        const contentHeight = detailContentRef.current.scrollHeight;
        setIsLessThanLimit(contentHeight <= 830);
      }
    }, 100);
  }, [goodsInfo]);

  if (!goodsInfo) return;

  const toggleDetailView = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderReviewTitle = () => {
    if (goodsInfo.feedbackTotal > 9999) {
      return `리뷰 9,999`;
    } else {
      return `리뷰 ${goodsInfo.feedbackTotal}`;
    }
  };

  const renderQnATitle = () => {
    if (goodsInfo.goodsQnaTotal > 9999) {
      return `상품문의 9,999`;
    } else {
      return `상품문의 ${goodsInfo.goodsQnaTotal}`;
    }
  };

  const tabsData = [
    {
      title: '상품상세',
      content: (
        <S.ProductDetail>
          <div className='detailViewInfo'>
            <p>
              판매자가 타 사이트 안내 및 현금 결제, 개인정보 유도 시 결제 및 입력하지 마시고 즉시 <u>고객센터</u>로
              신고해주세요.
            </p>
          </div>
          <div
            className='detailContent'
            ref={detailContentRef}
            style={{
              height: isLessThanLimit ? 'auto' : isExpanded ? 'auto' : '830px',
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{
              __html: parseEscapeToHtml(goodsInfo.goodsDetailHtml),
            }}
          />
          {!isLessThanLimit && (
            <S.ProductDetailMore className={isExpanded ? 'isExpanded' : ''}>
              <button
                type='button'
                onClick={toggleDetailView}
              >
                {isExpanded ? <span>상세정보 접기</span> : <span>상세정보 더보기</span>}
              </button>
            </S.ProductDetailMore>
          )}
        </S.ProductDetail>
      ),
    },
    {
      title: renderReviewTitle(),
      content: (
        <ProductDetailTabReview
          goodsId={goodsId}
          reviewSize={goodsInfo.feedbackTotal}
        />
      ),
    },
    {
      title: renderQnATitle(),
      content: (
        <ProductDetailTabQnA
          goodsId={goodsId}
          qnaSize={goodsInfo.goodsQnaTotal}
          goodsInfo={goodsInfo}
          storeName={storeName}
        />
      ),
    },
  ];

  return (
    <S.DetailInfo>
      <Tab
        tabs={tabsData}
        isStickyTab={false}
        height={48}
        className='detailTab'
      />
    </S.DetailInfo>
  );
};

export default ProductDetailTab;
