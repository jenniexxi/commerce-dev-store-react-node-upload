import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import IconButton from '@components/button/IconButton';
import ToggleIconButton from '@components/toggleIconButton/ToggleIconButton';

import { colors } from '@styles/theme';

import { numberWithCommas } from '@utils/display';
import R from '@utils/resourceMapper';

import favoritesApi from '@apis/favoritesApi';
import { CompanyStore } from '@apis/favoritesApi';
import { DetailsContent, GoodsInfo } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsId: number;
  storeBest?: GoodsInfo[];
  companyStore?: CompanyStore;
};

const ProductStoreBest = ({ goodsInfo, storeBest, companyStore }: Props) => {
  const queryClient = useQueryClient();

  const [isStoreFavorite, setIsStoreFavorite] = useState(false);
  const [favoriteStoreId, setFavoriteStoreId] = useState('');

  const [isStoreAlert, setIsStoreAlert] = useState(false);
  const [favoriteStoreAlertId, setFavoriteStoreAlertId] = useState('');

  useEffect(() => {
    setIsStoreFavorite(!!companyStore?.favoriteStoreIdEncrypt);
    setFavoriteStoreId(companyStore?.favoriteStoreIdEncrypt || '');
    setIsStoreAlert(!!companyStore?.favoriteStoreAlertIdEncrypt);
    setFavoriteStoreAlertId(companyStore?.favoriteStoreAlertIdEncrypt || '');
  }, [companyStore]);

  const { mutate: addFavoriteStore } = useMutation({
    mutationFn: () => favoritesApi.postFavoriteStore(companyStore?.companyStoreId || 0),
    onSuccess: (data) => {
      if (data.success) {
        setFavoriteStoreId(data.data);
        setIsStoreFavorite(true);
        queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
      }
    },
  });

  const { mutate: removeFavoriteStore } = useMutation({
    mutationFn: () => favoritesApi.deleteFavoriteStore([favoriteStoreId]),
    onSuccess: () => {
      setFavoriteStoreId('');
      setIsStoreFavorite(false);
      queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
    },
  });

  const { mutate: addFavoriteStoreAlert } = useMutation({
    mutationFn: () => favoritesApi.postFavoriteStoreAlert(companyStore?.companyStoreId || 0),
    onSuccess: (data) => {
      if (data.success) {
        setFavoriteStoreAlertId(data.data);
        setIsStoreAlert(true);
        queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
      }
    },
  });

  const { mutate: removeFavoriteStoreAlert } = useMutation({
    mutationFn: () => favoritesApi.deleteFavoriteStoreAlert(favoriteStoreAlertId),
    onSuccess: () => {
      setFavoriteStoreAlertId('');
      setIsStoreAlert(false);
      queryClient.invalidateQueries({ queryKey: ['getFavoriteStore'] });
    },
  });

  if (!goodsInfo || !storeBest || !companyStore) return;

  const shareProduct = () => {};

  return (
    <S.PordStoreBest>
      <S.PordStoreBestInfo>
        <span className='logo'>
          <img
            src={companyStore.storeImageUrl}
            alt=''
          />
        </span>
        <div className='info'>
          <span className='brand'>{companyStore.storeName}</span>
          <p className='count'>관심 고객 {numberWithCommas(companyStore.storeFavoriteCnt)}</p>
        </div>
        <div className='btnWrap'>
          <ToggleIconButton
            onImg={R.svg.icoBellNormalOn}
            offImg={R.svg.icoBellNormalOff}
            onTintColor={colors.secondary1}
            offTintColor={colors.icon4}
            isToggled={isStoreAlert}
            onToggle={(toggled) => {
              if (toggled) {
                console.log('스토어 알림 ON');
                addFavoriteStoreAlert();
              } else {
                console.log('스토어 알림 OFF');
                removeFavoriteStoreAlert();
              }
            }}
          />

          <ToggleIconButton
            onImg={R.svg.icoHeartOn}
            offImg={R.svg.icoHeartOff}
            onTintColor={colors.secondary1}
            offTintColor={colors.icon4}
            isToggled={isStoreFavorite}
            onToggle={(toggled) => {
              if (toggled) {
                addFavoriteStore();
              } else {
                removeFavoriteStore();
              }
            }}
          />
          <IconButton
            img={R.svg.icoShare}
            onClick={shareProduct}
            tintColor={colors.icon4}
          />
        </div>
      </S.PordStoreBestInfo>
      <S.PordStoreBestItem>
        <p className='title'>
          <strong>{companyStore.storeName}</strong>에서 가장 인기 있는 상품
        </p>
        <ul className='itemBox'>
          {storeBest.slice(0, 6).map((item, index) => {
            const hasDiscount = item.saleRate && item.saleRate >= 3;
            const hasSalePrice = item.paymentPrice?.number;
            const hasRecommendPrice = item.recommendPrice?.number;
            return (
              <li
                className='item'
                key={index}
              >
                <img
                  src={item.imageFilesUrl}
                  alt={item.displayGoodsName}
                />
                <div className='pordInfo'>
                  <p className='pordTitle'>{item.displayGoodsName}</p>
                  <p className='pordPrice'>
                    {hasDiscount && <strong className='discount'>{item.saleRate}%</strong>}
                    {hasSalePrice
                      ? `${numberWithCommas(item.paymentPrice.number)}원`
                      : hasRecommendPrice
                        ? `${numberWithCommas(item.recommendPrice.number)}원`
                        : null}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </S.PordStoreBestItem>
    </S.PordStoreBest>
  );
};

export default ProductStoreBest;
