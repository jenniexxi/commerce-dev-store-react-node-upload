import { DisplayGoodsSortTypeCode, GoodsDisplaySalesStatusKey } from '@type';

import { APIResponse, axiosInstance } from './api';
import { Badge, Code, Price } from './apiCommonType';
import { GoodsInfo } from './goodsApi';
import { DisplayUrl } from './urls';

export type SalesListData = {
  content: GoodsInfo[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type SalesListResp = APIResponse & {
  data: SalesListData;
};

export type SearchInfo = {
  searchKeyword: string;
  searchKeywordLinkUrl: string;
  searchRecentlyList: string[];
  recommendationKeywordList: string[];
};
export type SearchInfoResp = APIResponse & {
  data: SearchInfo;
};

type CategoryList = {
  categoryStoreId: number;
  name: string;
  childCategorySize: number;
  cnt: number;
  categoryList: CategoryList[];
};
type BrandList = {
  brandId: number;
  brandName: string;
  cnt: number;
};

export type SearchResultList = {
  goodsSortTypeEnumList: Code<DisplayGoodsSortTypeCode>;
  categoryList: CategoryList[];
  brandList: BrandList[];
};
export type SearchResultListResp = APIResponse & {
  data: SearchResultList;
};

export type SearchListGoodsContent = {
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  recommendPrice: Price;
  paymentPrice: Price;
  saleRate: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  adultYn: boolean;
  delYn: boolean;
  badgeList: Badge[];
};

export type SearchGoodsResult = {
  content: SearchListGoodsContent[];
  page: number;
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type SearchGoodsResultResp = APIResponse & { data: SearchGoodsResult };
export type SearchAutoCompleteResp = APIResponse & {
  data: {
    keyword: string;
    highLight?: string;
  }[];
};

const DisplayAPI = {
  getSalesList: (page: number, size: number, goodsSortTypeEnum: DisplayGoodsSortTypeCode): Promise<SalesListData> => {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      goodsAutoTypeEnum: goodsSortTypeEnum.toString(),
    });

    return axiosInstance
      .get(DisplayUrl.salesList + '?' + query.toString())
      .then((resp) => resp.data.data)
      .catch((e) => {
        console.error('API Error:', e);
      });
  },
  searchInfo: (): Promise<SearchInfoResp> => {
    return axiosInstance
      .get(DisplayUrl.searchInfo)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  searchResultList: (keyword: string): Promise<SearchResultListResp> => {
    const query = new URLSearchParams({
      keyword,
    });
    return axiosInstance
      .get(DisplayUrl.searchResultList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  saveRecentSearchKeyword: (body: { searchTextList: string[] }): Promise<APIResponse> => {
    return axiosInstance
      .post(DisplayUrl.saveRecentSearchKeyword, body)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  deleteRecentSearchKeyword: (body: { searchTextList: string[] }): Promise<APIResponse> => {
    return axiosInstance
      .delete(DisplayUrl.deleteRecentSearchKeyword, { data: body })
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  searchGoodsResult: (queryParam: {
    page: number;
    size: number;
    searchTextMain: string;
    goodsSortTypeEnum: DisplayGoodsSortTypeCode;
    searchTextSub?: string;
    categoryStoreId?: string;
    brandIdList?: string;
  }): Promise<SearchGoodsResult> => {
    const query = new URLSearchParams({
      page: queryParam.page.toString(),
      size: queryParam.size.toString(),
      searchTextMain: queryParam.searchTextMain,
      goodsSortTypeEnum: queryParam.goodsSortTypeEnum,
      ...(queryParam.searchTextSub && { searchTextSub: queryParam.searchTextSub }),
      ...(queryParam.categoryStoreId && { categoryStoreId: queryParam.categoryStoreId }),
      ...(queryParam.brandIdList && { brandIdList: queryParam.brandIdList }),
    });

    return axiosInstance
      .get(DisplayUrl.searchGoodsResult + '?' + query.toString())
      .then((resp) => resp.data.data)
      .catch((e) => console.log(e));
  },
  searchAutoComplete: (keyword: string): Promise<SearchAutoCompleteResp> => {
    const query = new URLSearchParams({
      keyword,
    });
    return axiosInstance
      .get(DisplayUrl.searchAutoComplete + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  getMainDisplayInfo: (): Promise<void> => {
    return axiosInstance.get(DisplayUrl.getMainDisplayInfo).then((resp) => resp.data);
  },
};

export default DisplayAPI;
