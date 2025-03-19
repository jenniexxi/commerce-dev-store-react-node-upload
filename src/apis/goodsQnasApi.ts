import { GoodsDisplaySalesStatusKey, GoodsQnaAnswerStatusCode, GoodsReportsReasonKey, ReportsReasonKey } from '@type';

import { APIResponse, axiosInstance } from './api';
import { Code, Price } from './apiCommonType';
import { GoodsQnasUrl, ReportUrl } from './urls';

export type GoodsQnasInquiryBodyGet = {
  page: number;
  size: number;
  myGoodsQnaYn?: boolean;
  bbsTypeId?: string;
  openYn?: boolean;
  statusEnum?: string;
};

export type GoodsQnasInquiryBody = {
  bbsTypeId: number;
  title: string;
  contents: string;
  openYn?: boolean;
  receiveAlertYn?: boolean;
};

export type GoodsQnasInquiryMeContent = {
  goodsQnaIdEncrypt: string;
  goodsId: number;
  displayStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  adultYn: boolean;
  imageFilesUrl: string;
  storeName: string;
  displayGoodsName: string;
  brandName: string;
  bbsTypeTitle: string;
  statusEnum: Code<GoodsQnaAnswerStatusCode>;
  title: string;
  contents: string;
  openYn: boolean;
  receiveAlertYn: boolean;
  createDatetime: string;
  answerList: {
    goodsQnaAnswerIdEncrypt: string;
    text: string;
    createDatetime: string;
  }[];
};

export type GetGoodsContent = {
  goodsQnaIdEncrypt: string;
  bbsTypeTitle: string;
  statusEnum: Code<GoodsQnaAnswerStatusCode>;
  title: string;
  contents: string;
  createBuyerLoginId: string;
  openYn: boolean;
  createDatetime: string;
  answerList: {
    goodsQnaAnswerIdEncrypt: string;
    text: string;
    createDatetime: string;
  }[];
};

export type GetGoodsQnasResp = APIResponse & {
  data: {
    content: GetGoodsContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type GoodsQnasInquiryMeResp = APIResponse & {
  data: {
    content: GoodsQnasInquiryMeContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type GetGoodsQnaListResp = APIResponse & {
  data: {
    bbsTypeList: {
      bbsTypeId: number;
      bbsTypeTitle: string;
    }[];
  };
};

export type GetReportResp = APIResponse & {
  data: {
    reqId: number;
    bbsTypeEnum: string;
    text: string;
    nickname: string;
    sellerYn: boolean;
    bbsReportTypeEnum: Code<ReportsReasonKey>[];
  };
};

export type ReportsBody = {
  reason: string;
  reportTypeEnum: string;
  bbsTypeEnum: string;
};

export type GoodsReportsBody = {
  reportReasonList: {
    reason: string;
    reportTypeEnum: string;
  }[];
  encryptFileId: string;
};

export type GetGoodsReportResp = APIResponse & {
  data: {
    goodsId: number;
    companyId: number;
    storeName: string;
    goodsName: string;
    price: Price;
    priceRate: number;
    goodsReportTypeEnumList: Code<GoodsReportsReasonKey>[];
  };
};

const GoodsQnasAPI = {
  /**
   * getGoodsQnaList : 상품 문의 화면 정보 조회
   * getGoodsQnas: 상품 문의 조회
   * postGoodsQnas: 상품 문의 등록
   * getGoodsQnasMeInquiry: 나의 상품 문의 조회
   * updateGoodsQnas : 상품 문의 수정
   * deleteGoodsQnas : 상품 문의 삭제
   *
   * getReport : 리뷰/상품 문의 글 신고 팝업
   * postReports : 리뷰/상품 문의 글 신고
   * getGoodsReport : 상품 신고 팝업
   * postGoodsReports : 상품 신고 
   */
  getGoodsQnaList: (): Promise<GetGoodsQnaListResp> => {
    return axiosInstance
      .get(GoodsQnasUrl.getGoodsQnaList())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getGoodsQnas: (goodsId: string, query: GoodsQnasInquiryBodyGet): Promise<GetGoodsQnasResp> => {
    const queryParam = new URLSearchParams();

    queryParam.set('page', query.page.toString());
    queryParam.set('size', query.size.toString());

    if (query.myGoodsQnaYn !== undefined) {
      queryParam.set('myGoodsQnaYn', String(query.myGoodsQnaYn));
    }

    if (query.bbsTypeId) {
      queryParam.set('bbsTypeId', query.bbsTypeId);
    }

    if (query.openYn !== undefined) {
      queryParam.set('openYn', String(query.openYn));
    }

    if (query.statusEnum) {
      queryParam.set('statusEnum', query.statusEnum);
    }

    return axiosInstance
      .get(GoodsQnasUrl.getGoodsQnas(goodsId) + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  postGoodsQnas: ({ goodsId, body }: { goodsId: number; body: GoodsQnasInquiryBody }): Promise<APIResponse> => {
    return axiosInstance
      .post(GoodsQnasUrl.postGoodsQnas(goodsId), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsQnasMeInquiry: ({
    page,
    size,
    bbsTypeId,
    startDate,
    endDate,
    answerHoldYn,
    answerDoneYn,
  }: {
    page: number;
    size: number;
    bbsTypeId?: number;
    startDate: string;
    endDate: string;
    answerHoldYn?: boolean;
    answerDoneYn?: boolean;
  }): Promise<GoodsQnasInquiryMeResp> => {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(bbsTypeId && { bbsTypeId: bbsTypeId.toString() }),
      startDate,
      endDate,
      ...(answerHoldYn !== undefined && { answerHoldYn: answerHoldYn.toString() }),
      ...(answerDoneYn !== undefined && { answerDoneYn: answerDoneYn.toString() }),
    });

    return axiosInstance
      .get(GoodsQnasUrl.getGoodsQnasMe + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  updateGoodsQnas: (goodsQnaIdEncrypt: string, body: GoodsQnasInquiryBody): Promise<APIResponse> => {
    const url = GoodsQnasUrl.putGoodsQnasUpdate(goodsQnaIdEncrypt);
    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  deleteGoodsQnas: (goodsQnaIdEncrypt: string): Promise<APIResponse> => {
    const url = GoodsQnasUrl.deleteGoodsQnas(goodsQnaIdEncrypt);
    return axiosInstance
      .delete(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getReport: (bbsTargetEncryptId: string, bbsTypeEnum: string): Promise<GetReportResp> => {
    const queryParam = new URLSearchParams({
      bbsTypeEnum,
    });
    return axiosInstance
      .get(ReportUrl.getReports(bbsTargetEncryptId) + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  postReports: ({
    bbsTargetEncryptId,
    body,
  }: {
    bbsTargetEncryptId: string;
    body: ReportsBody;
  }): Promise<APIResponse> => {
    return axiosInstance
      .post(ReportUrl.postReports(bbsTargetEncryptId), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsReport: (goodsId: string): Promise<GetGoodsReportResp> => {
    return axiosInstance
      .get(ReportUrl.getGoodsReport(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  postGoodsReports: ({ goodsId, body }: { goodsId: string; body: GoodsReportsBody }): Promise<APIResponse> => {
    return axiosInstance
      .post(ReportUrl.postGoodsReports(goodsId), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default GoodsQnasAPI;
