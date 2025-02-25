import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ImageViewer, Modal, SwiperCarousel } from '@components';
import { useQuery } from '@tanstack/react-query';
import { FEEDBACK_SORT_TYPE } from '@type';

import IconButton from '@components/button/IconButton';
import CountBadge from '@components/count/CountBadge';
import { hideModal, showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import favoritesAPI from '@apis/favoritesApi';
import GoodsAPI from '@apis/goodsApi';
import MyPageAPI from '@apis/mypageApi';
import shoppingCartApi from '@apis/shoppingCartApi';

import { RECENT_CLICK_GOODSID_KEY } from '@constants/constants';

import * as S from './ProductDetail.style';
import BottomButton from './features/BottomButton';
import ProductAnnouncement from './features/ProductAnnouncement';
import ProductBanner from './features/ProductBanner';
import ProductBuyModal from './features/ProductBuyModal';
import ProductDetailTab from './features/ProductDetailTab';
import ProductDileveryInfo from './features/ProductDileveryInfo';
import ProductFeedbackAboveFour from './features/ProductFeedbackAboveFour';
import ProductInfo from './features/ProductInfo';
import ProductPointInfo from './features/ProductPointInfo';
import ProductRecommended from './features/ProductRecommended';
import ProductRelated from './features/ProductRelated';
import ProductStoreBest from './features/ProductStoreBest';
import ProductTag from './features/ProductTag';
import ProductVideo from './features/ProductVideo';

export type ItemProp = {
  name: string;
  minCount?: number;
  quantity: number;
  price: number;
  goodsId?: number;
  goodsOptionId?: number;
};

export const ProductDetail = () => {
  const { goodsId = '' } = useParams<{ goodsId: string }>();

  const [selectOption, setSelectOption] = useState<number>(-1);
  const [buyItems, setBuyItems] = useState<ItemProp[]>([]);
  const [showImageView, setShowImageView] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const navigate = useNavigate();
  const buyModalId = useRef('');

  useHeader('', {
    showRightButton: true,
    rightElement: (
      <>
        <IconButton
          onClick={() => {}}
          img={R.svg.icoSearch}
        />
        <div>
          <IconButton
            onClick={() => {
              navigate(PAGE_WITHOUT_FOOTER_ROUTES.SHOPPINGCART.path);
            }}
            img={R.svg.icoShoppingbag}
          />
          <CountBadge count={9} />
        </div>
      </>
    ),
  });

  const { data: myPage } = useQuery({ queryKey: ['mypageMain'], queryFn: () => MyPageAPI.getMyPageMainInfo() });

  const { data } = useQuery({
    queryKey: ['getGoods', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoods(Number(goodsId));
    },
  });

  const { data: price } = useQuery({
    queryKey: ['getGoodsPrice', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsPrice(Number(goodsId));
    },
  });

  const { data: feedbackAboveFour } = useQuery({
    queryKey: ['getGoodsFeedbackAboveFour', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsFeedbackAboveFour(Number(goodsId));
    },
  });

  const { data: RelationVideo } = useQuery({
    queryKey: ['getGoodsRelationVideo', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsRelationVideo(Number(goodsId));
    },
  });

  const { data: Recommended } = useQuery({
    queryKey: ['getGoodsRecommended', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsRecommended(Number(goodsId));
    },
  });

  const { data: StoreBest } = useQuery({
    queryKey: ['getGoodsStoreBest', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsStoreBest(Number(goodsId));
    },
  });

  const { data: Announcement } = useQuery({
    queryKey: ['getGoodsAnnouncement', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getGoodsAnnouncement(Number(goodsId));
    },
  });

  // const { data: favoriteGoods } = useQuery({
  //   queryKey: ['getFavoriteGoods', goodsId.toString()],
  //   queryFn: () => favoritesApi.getFavoriteGoods(goodsId.toString()),
  // });

  const { data: favoriteGoodsMeData } = useQuery({
    queryKey: ['getFavoriteGoodsMe'],
    queryFn: () => favoritesAPI.getFavoriteGoodsMe({ page: 0, size: 1000 }),
  });

  const favoriteGoodsList = favoriteGoodsMeData?.data?.content || [];

  const { data: companyStore } = useQuery({
    queryKey: ['getFavoriteStore', data],
    queryFn: () => {
      return favoritesAPI.getFavoriteStore(data?.data.companyStoreId || 0);
    },
    enabled: data?.data?.companyStoreId !== undefined,
  });

  const { data: reviewData } = useQuery({
    queryKey: ['goodsReview', Number(goodsId)],
    queryFn: () =>
      GoodsAPI.getGoodsFeedback(Number(goodsId), {
        page: '0',
        size: '10',
        feedbackSortTypeEnum: FEEDBACK_SORT_TYPE.HIGH_SCORE,
      }),
  });

  const { data: miniCartData } = useQuery({
    queryKey: ['getMiniCartItem', Number(goodsId)],
    queryFn: () => {
      return shoppingCartApi.getMiniCartList(Number(goodsId));
    },
    enabled: !!data,
  });

  useEffect(() => {
    if (goodsId) {
      // eslint-disable-next-line no-undef
      localStorage.setItem(RECENT_CLICK_GOODSID_KEY, goodsId);
    }
  }, [goodsId]);

  useEffect(() => {
    if (data) {
      const additionalImages = data.data?.addImageFilesUrlList || [];
      setImageList([data.data?.originImageFilesUrl, ...additionalImages]);
    }
  }, [data]);

  const selectOptionId = useCallback((id: number) => {
    setSelectOption(id);
  }, []);

  const handleBuyItemsUpdate = useCallback((newItems: ItemProp[]) => {
    setBuyItems(newItems);
  }, []);

  const getInitialItems = useCallback((): ItemProp[] => {
    if (buyItems.length > 0) return buyItems;

    if (miniCartData?.data.optionNameList && miniCartData?.data.optionNameList.length === 0) {
      return [
        {
          name: data?.data.displayGoodsName || '',
          minCount: data?.data.minBuyCnt || 1,
          quantity: data?.data.minBuyCnt || 1,
          price: price?.data.salePrice.number || 0,
          goodsId: parseInt(goodsId),
        },
      ];
    }
    return [];
  }, [buyItems, miniCartData, data, goodsId]);

  const clickBuyButton = () => {
    const initialItems = getInitialItems();
    buyModalId.current = showModal.custom(
      <ProductBuyModal
        goodsId={parseInt(goodsId)}
        miniCartData={miniCartData}
        selectOptionId={selectOptionId}
        buyItem={initialItems}
        navigate={navigate}
        hideBuyModal={hideBuyModal}
        onItemsUpdate={handleBuyItemsUpdate}
        initialSelectOption={selectOption}
      />,
      {
        type: 'bottomSheet',
        showCloseBtn: true,
        radius: 0,
        backDropColor: '#00000030',
        closeBtnPosition: { right: 5, top: 5, size: 26 },
      },
    );
  };

  const hideBuyModal = useCallback(() => {
    hideModal(buyModalId.current);
    buyModalId.current = '';
  }, []);

  if (!goodsId) return;

  return (
    <S.ProductDetailContainer>
      <S.ProdListThumbBox>
        <SwiperCarousel
          slidesPerView={1}
          isPagination={true}
          pagination={{
            type: 'bullets',
            clickable: true,
          }}
        >
          {imageList.map((item) => (
            <S.ProdListThumb
              key={item}
              src={item}
              width='100%'
            />
          ))}
        </SwiperCarousel>
        <S.ImageViewButton>
          <IconButton
            img={R.svg.icoArrowMaximise}
            onClick={() => setShowImageView(true)}
            tintColor={colors.white}
          />
        </S.ImageViewButton>
      </S.ProdListThumbBox>
      <ProductInfo
        goodsId={parseInt(goodsId)}
        goodsInfo={data?.data}
        goodsPriceInfo={price?.data}
        companyStore={companyStore?.data}
      />
      <ProductPointInfo
        goodsId={parseInt(goodsId)}
        goodsInfo={data?.data}
        goodsPriceInfo={price?.data}
        myPageInfo={myPage?.data}
      />
      <ProductDileveryInfo
        goodsId={parseInt(goodsId)}
        goodsInfo={data?.data}
        shippingInfo={data?.data?.shippingInfo}
      />
      <ProductFeedbackAboveFour goodsFeedbackAboveFour={feedbackAboveFour?.data} />
      <ProductBanner
        goodsId={parseInt(goodsId)}
        goodsInfo={data?.data}
      />
      <ProductVideo
        goodsInfo={data?.data}
        relationVideo={RelationVideo?.data}
      />
      <ProductRelated
        goodsId={parseInt(goodsId)}
        goodsInfo={data?.data}
        favoriteGoodsList={favoriteGoodsList}
      />
      <ProductDetailTab
        goodsInfo={data?.data}
        goodsId={Number(goodsId)}
      />
      <ProductTag
        goodsInfo={data?.data}
        goodsId={parseInt(goodsId)}
      />
      <ProductRecommended
        goodsId={parseInt(goodsId)}
        recommended={Recommended?.data}
        favoriteGoodsList={favoriteGoodsList}
      />

      <ProductStoreBest
        goodsInfo={data?.data}
        goodsId={parseInt(goodsId)}
        storeBest={StoreBest?.data}
        companyStore={companyStore?.data}
      />
      <ProductAnnouncement
        goodsInfo={data?.data}
        goodsId={parseInt(goodsId)}
        announcement={Announcement?.data}
      />
      <BottomButton
        goodsId={parseInt(goodsId)}
        favoriteGoodsList={favoriteGoodsList}
        onClickButton={clickBuyButton}
      />
      {showImageView && (
        <Modal
          type='full'
          onHide={() => setShowImageView(false)}
          title='상세이미지'
        >
          <ImageViewer imageList={imageList} />
        </Modal>
      )}
    </S.ProductDetailContainer>
  );
};

export default ProductDetail;
