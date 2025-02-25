import StarRating from '@components/starRating/StarRating';

import { formatStarRating } from '@utils/display';

import { FeedbackAboveFourContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsFeedbackAboveFour?: FeedbackAboveFourContent;
};
const ProductFeedbackAboveFour = ({ goodsFeedbackAboveFour }: Props) => {
  if (!goodsFeedbackAboveFour) return;

  return (
    <S.ProductFeedbackAboveFour className='secTopLine'>
      <S.SecTitle className='secTitle'>
        4점 이상 리뷰가 <strong>{goodsFeedbackAboveFour.percentageOfFeedbacksAboveFour}%</strong>에요
      </S.SecTitle>
      <ul className='itemList'>
        {goodsFeedbackAboveFour.feedbackAboveFourList.map((feedback, index) => (
          <li
            key={index}
            className='item'
          >
            <button
              type='button'
              className='link'
            ></button>
            <div className='left'>
              <div className='reviewRating'>
                <StarRating score={feedback.score} />
                <span className='count'>{formatStarRating(feedback.score)}</span>
              </div>
              <p className='txt'>
                <strong>{feedback.feedbackTypeEnum.codeName}</strong>
                {feedback.text}
              </p>
            </div>
            {feedback.feedbackTypeEnum.code === 'BBS.FEEDBACK_TYPE.PHOTO' && (
              <div className='right'>
                {feedback.photoUrl && (
                  <span className='imgBox photo'>
                    <img
                      src={feedback.photoUrl}
                      alt='리뷰 사진'
                      loading='lazy'
                    />
                  </span>
                )}
                {feedback.videoUrl && (
                  <span className='imgBox video'>
                    <video muted>
                      <source
                        src={feedback.videoUrl}
                        type='video/mp4'
                      />
                    </video>
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </S.ProductFeedbackAboveFour>
  );
};

export default ProductFeedbackAboveFour;
