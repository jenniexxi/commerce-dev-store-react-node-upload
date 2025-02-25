import { useEffect, useState } from 'react';

import { Button } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ToggleIconButton from '@components/toggleIconButton/ToggleIconButton';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import favoritesApi, { FavoriteGoods } from '@apis/favoritesApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsId: number;
  favoriteGoodsList: FavoriteGoods['content'];
  onClickButton: () => void;
};

const BottomButton = ({ goodsId, favoriteGoodsList, onClickButton }: Props) => {
  const queryClient = useQueryClient();

  const favoriteItem = favoriteGoodsList.find((fav) => String(fav.goodsInfo.goodsId) === String(goodsId));

  const [isFavorite, setIsFavorite] = useState(!!favoriteItem);
  const [encryptedId, setEncryptedId] = useState(favoriteItem?.favoriteGoodsIdEncrypt || '');

  useEffect(() => {
    setIsFavorite(!!favoriteItem);
    setEncryptedId(favoriteItem?.favoriteGoodsIdEncrypt || '');
  }, [favoriteGoodsList, favoriteItem]);

  // 찜하기 추가
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

  // 찜하기 삭제
  const { mutate: removeFavoriteGoods } = useMutation({
    mutationFn: () => favoritesApi.deleteFavoriteGoods([encryptedId]),
    onSuccess: () => {
      setIsFavorite(false);
      setEncryptedId('');
      queryClient.invalidateQueries({ queryKey: ['getFavoriteGoodsMe'] });
    },
  });

  return (
    <S.BottomButtonContainer>
      <ToggleIconButton
        onImg={R.svg.icoHeartOn}
        offImg={R.svg.icoHeartOff}
        onTintColor={colors.secondary1}
        offTintColor={colors.icon4}
        isToggled={isFavorite}
        onToggle={(toggled) => {
          if (toggled) {
            addFavoriteGoods();
          } else {
            removeFavoriteGoods();
          }
        }}
        className='bottmBtnLike'
      />
      <Button
        title='구매하기'
        width='100%'
        align='center'
        onClick={onClickButton}
      />
    </S.BottomButtonContainer>
  );
};

export default BottomButton;
