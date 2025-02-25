import { DetailsContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
};

const ProductTag = ({ goodsInfo, goodsId }: Props) => {
  const tags = goodsInfo?.searchKeywordList ?? [];

  return (
    <S.ProdTag>
      <S.SecTitle className='secTitle'>관련 태그</S.SecTitle>
      {tags.length > 0 ? (
        <S.ProdTagList>
          {tags.map((tag, index) => (
            <button
              key={index}
              type='button'
            >
              #{tag}
            </button>
          ))}
        </S.ProdTagList>
      ) : (
        <p>관련 태그가 없습니다.</p>
      )}
    </S.ProdTag>
  );
};

export default ProductTag;
