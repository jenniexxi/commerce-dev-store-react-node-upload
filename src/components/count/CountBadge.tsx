import * as S from './CountBadge.style';

interface CartBadgeProps {
  count: number;
}

const CountBadge = ({ count }: CartBadgeProps) => {
  if (count <= 0) return null;

  return <S.CountBadge>{count}</S.CountBadge>;
};

export default CountBadge;
