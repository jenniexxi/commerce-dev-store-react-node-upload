import { APIResponse, axiosInstance } from './api';
import { GoodsInfo } from './goodsApi';
import { FavoritesUrl } from './urls';

type GoodsResp = APIResponse & {
  data: Goods;
};
export type Goods = {
  list: {
    goodsId: number;
    favoriteGoodsIdEncrypt: string;
  }[];
};

type FavoriteGoodsQuery = {
  page: number;
  size: number;
};

type FavoriteGoodsResp = APIResponse & {
  data: FavoriteGoods;
};

export type FavoriteGoods = {
  content: {
    favoriteGoodsIdEncrypt: string;
    goodsInfo: GoodsInfo;
  }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

type postStringResp = APIResponse & {
  data: string;
};

type CompanyStoreResp = APIResponse & {
  data: CompanyStore;
};
export type CompanyStore = {
  companyStoreId: number;
  storeName: string;
  storeImageUrl: string;
  favoriteStoreIdEncrypt: string;
  favoriteStoreAlertIdEncrypt: string;
  storeFavoriteCnt: number;
};

type FavoriteStoreQuery = {
  page: number;
  size: number;
};

type FavoriteStoreResp = APIResponse & {
  data: FavoriteStore;
};

export type FavoriteStore = {
  content: {
    favoriteStoreIdEncrypt: string;
    storeName: string;
    storeImageUrl: string;
    storeFavoriteCnt: number;
  }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
const favoritesApi = {
  getFavoriteGoods: (goodsIdList: string): Promise<GoodsResp> => {
    return axiosInstance
      .get(FavoritesUrl.getFavoriteGoods, {
        params: { goodsIdList },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postFavoriteGoods: (goodsId: number): Promise<postStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteGoods, { goodsId })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteGoods: (favoriteGoodsIdEncrypt: string[]): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteGoods, {
        data: { favoriteGoodsIdEncryptList: favoriteGoodsIdEncrypt },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteGoodsMe: (query: FavoriteGoodsQuery): Promise<FavoriteGoodsResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(FavoritesUrl.getFavoriteGoodsMe + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteStore: (companyStoreId: number): Promise<CompanyStoreResp> => {
    return axiosInstance
      .get(FavoritesUrl.getFavoriteStore(companyStoreId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postFavoriteStore: (companyStoreId: number): Promise<postStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteStore, { companyStoreId })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteStore: (favoriteStoreIdEncryptList: string[]): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteStore, {
        data: { favoriteStoreIdEncryptList: favoriteStoreIdEncryptList },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteStoreMe: (query: FavoriteStoreQuery): Promise<FavoriteStoreResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(FavoritesUrl.getFavoriteStoreMe + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  postFavoriteStoreAlert: (companyStoreId: number): Promise<postStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteStoreAlert(companyStoreId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteStoreAlert: (favoriteStoreAlertIdEncrypt: string): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteStoreAlert(favoriteStoreAlertIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
};

export default favoritesApi;
