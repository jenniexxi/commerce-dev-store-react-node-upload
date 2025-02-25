import { useQuery } from '@tanstack/react-query';

import favoritesApi from '@apis/favoritesApi';

import ProdItem from './ProdItem';
import * as S from './ProdItem.style';

type ProdItemListProps = {
  items: {
    goodsId: number;
    imageFilesUrl: string;
    brandName: string;
    displayGoodsName: string;
    discount: number;
    price: number;
    score: number;
    reviewCount: number;
  }[];
  columnType?: 'col02' | 'col03';
};

const ProdItemList = ({ items, columnType = 'col03' }: ProdItemListProps) => {
  const { data: favoriteGoodsMeData } = useQuery({
    queryKey: ['getFavoriteGoodsMe'],
    queryFn: () => favoritesApi.getFavoriteGoodsMe({ page: 0, size: 1000 }),
  });

  const favoriteGoodsList = favoriteGoodsMeData?.data?.content || [];

  const updatedItems = items.map((item) => {
    const favoriteItem = favoriteGoodsList.find((fav) => String(fav.goodsInfo.goodsId) === String(item.goodsId));

    return {
      ...item,
      isFavorite: !!favoriteItem,
      favoriteGoodsIdEncrypt: favoriteItem?.favoriteGoodsIdEncrypt ?? '',
    };
  });

  return (
    <S.PordItemList className={columnType}>
      {updatedItems.map((item, index) => (
        <ProdItem
          key={index}
          index={index}
          {...item}
          isFavorite={Boolean(item.isFavorite)}
        />
      ))}
    </S.PordItemList>
  );
};

export default ProdItemList;
