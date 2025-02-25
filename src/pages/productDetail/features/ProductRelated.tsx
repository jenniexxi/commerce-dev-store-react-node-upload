import ProdItem from '@components/prodItemList/ProdItem';

import { FavoriteGoods } from '@apis/favoritesApi';
import { DetailsContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;
  goodsInfo?: DetailsContent;
  favoriteGoodsList: FavoriteGoods['content'];
};

const ProductRelated = ({ goodsInfo, favoriteGoodsList }: Props) => {
  if (!goodsInfo) return;

  const relatedItems = goodsInfo.relationGoodsList.map((item, index) => {
    const favoriteItem = favoriteGoodsList.find((fav) => String(fav.goodsInfo.goodsId) === String(item.goodsId));

    return {
      index,
      goodsId: item.goodsId,
      imageFilesUrl: item.imageFilesUrl,
      brandName: item.brandName,
      displayGoodsName: item.displayGoodsName,
      discount: item.saleRate,
      price: item.paymentPrice.number,
      score: item.feedbackTotalScore,
      reviewCount: item.feedbackTotal,
      isFavorite: !!favoriteItem,
      favoriteGoodsIdEncrypt: favoriteItem?.favoriteGoodsIdEncrypt ?? '',
    };
  });

  return (
    <S.ProdListInfoViewNoMargin className='prodListInfoViewNoMargin'>
      <S.ProductDetailSectionTitle>연관 상품</S.ProductDetailSectionTitle>
      <S.ListScrollxContainer>
        {relatedItems.map((item) => (
          <ProdItem
            key={item.index}
            {...item}
            isFavorite={item.isFavorite}
          />
        ))}
      </S.ListScrollxContainer>
    </S.ProdListInfoViewNoMargin>
  );
};

export default ProductRelated;
