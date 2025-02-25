import * as S from './StarRating.style';

type StarRatingProps = {
  score: number;
};

const StarRating = ({ score }: StarRatingProps) => {
  return (
    <S.StarRating>
      <span
        className='active'
        style={{ width: `${(score / 5) * 100}%` }}
      ></span>
    </S.StarRating>
  );
};

export default StarRating;
