import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ToggleIconButton from '@components/toggleIconButton/ToggleIconButton';

import { colors } from '@styles/theme';

import { numberWithCommas, showPriceText } from '@utils/display';
import R from '@utils/resourceMapper';

import favoritesApi from '@apis/favoritesApi';

import * as S from './ProdItem.style';

type ProdItemProps = {
  index: number;
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  discount: number;
  price: number;
  score: number;
  reviewCount: number;
  isFavorite: boolean;
  favoriteGoodsIdEncrypt?: string;
};

const ProdItem = ({
  index,
  goodsId,
  imageFilesUrl,
  brandName,
  displayGoodsName,
  discount,
  price,
  score,
  reviewCount,
  isFavorite: initialFavorite,
  favoriteGoodsIdEncrypt,
}: ProdItemProps) => {
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [encryptedId, setEncryptedId] = useState(favoriteGoodsIdEncrypt || '');

  useEffect(() => {
    setIsFavorite(initialFavorite);
    setEncryptedId(favoriteGoodsIdEncrypt || '');
  }, [initialFavorite, favoriteGoodsIdEncrypt]);

  // 관심 상품 등록
  const { mutate: addFavoriteGoods } = useMutation({
    mutationFn: () => favoritesApi.postFavoriteGoods(goodsId),
    onSuccess: (data) => {
      if (data.success) {
        setEncryptedId(data.data);
        setIsFavorite(true);
        queryClient.invalidateQueries({ queryKey: ['getFavoriteGoodsMe'] });
      }
    },
  });

  //  관심 상품 삭제
  const { mutate: removeFavoriteGoods } = useMutation({
    mutationFn: () => favoritesApi.deleteFavoriteGoods([encryptedId]),
    onSuccess: () => {
      setIsFavorite(false);
      setEncryptedId('');
      queryClient.invalidateQueries({ queryKey: ['getFavoriteGoodsMe'] });
    },
  });

  return (
    <S.ProdItem className='prodItem'>
      <S.ProdItemImage className='img'>
        <img
          src={imageFilesUrl}
          alt={`${displayGoodsName} 이미지`}
        />
        <ToggleIconButton
          onImg={R.svg.icoHeartOn}
          offImg={R.svg.icoHeartOff}
          onTintColor={colors.secondary1}
          offTintColor={colors.white}
          isToggled={isFavorite}
          onToggle={(toggled) => {
            if (toggled) {
              addFavoriteGoods();
            } else {
              removeFavoriteGoods();
            }
          }}
          className='btnLike'
        />
      </S.ProdItemImage>
      <S.ProdItemCont>
        <span className='store'>{brandName}</span>
        <p className='title'>{displayGoodsName}</p>
        <S.RowView className='price'>
          <span className='discount'>{discount}%</span>
          <span className='priceTxt'>{showPriceText({ number: price, currencyCode: '원' })}</span>
        </S.RowView>
        <S.RowView className='review'>
          <span className='score'>{score}</span>
          <span className='count'>
            리뷰 {reviewCount >= 1000000 ? '+' + numberWithCommas(999999) : numberWithCommas(reviewCount)}
          </span>
        </S.RowView>
      </S.ProdItemCont>
    </S.ProdItem>
  );
};

export default ProdItem;
