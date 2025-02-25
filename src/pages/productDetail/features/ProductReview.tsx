import { T } from '@commons';

import { FeedbackContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  reviewInfo?: FeedbackContent[];
};
const ProductReview = ({ reviewInfo = [] }: Props) => {
  if (!reviewInfo) return;

  const ReviewItem = ({ item }: { item: FeedbackContent }) => {
    return (
      <S.ReviewItemContainer>
        <S.ReviewTextContainer>
          <S.RowView></S.RowView>
          <S.ReviewText>{item.text}</S.ReviewText>
        </S.ReviewTextContainer>
      </S.ReviewItemContainer>
    );
  };
  return (
    <S.ProdListInfoView>
      <T.Body1_Normal>4점 이상 리뷰가 %에요</T.Body1_Normal>
      <S.ReviewListContainer>
        {reviewInfo.map((item) => (
          <ReviewItem item={item} />
        ))}
      </S.ReviewListContainer>
    </S.ProdListInfoView>
  );
};

export default ProductReview;
