import { useEffect, useState } from 'react';

import { T } from '@commons';
import { Button } from '@components';

import GoodsAPI from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;
  qnaSize: number;
};
const ProductDetailTabQnA = ({ goodsId, qnaSize }: Props) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    getQnAList();
  }, []);

  const getQnAList = () => {
    GoodsAPI.getGoodsQnA(goodsId, { page: page.toString(), size: '10' }).then((resp) => resp.data);
  };

  const getNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <S.ProductDetail>
      {qnaSize === 0 ? (
        <S.EmptyView>
          <T.Body1_NormalM>작성한 Q&A가 없습니다.</T.Body1_NormalM>
        </S.EmptyView>
      ) : (
        <>
          <Button
            btnType='tertiary'
            title={'10개 더보기'}
            onClick={getNextPage}
          />
        </>
      )}
    </S.ProductDetail>
  );
};

export default ProductDetailTabQnA;
