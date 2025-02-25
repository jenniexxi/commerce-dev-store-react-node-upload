import { APIResponse, axiosInstance } from './api';
import { BuyersUrl } from './urls';

/**
 * 배송지 식별자 타입
 */
export type Encrypt = {
  /** 배송지 고유 식별자 */
  buyerAddressIdEncrypt: string;
};

/**
 * 배송지 정보 타입
 */
export type DeliveryAddress = {
  /** 기본 배송지 여부 */
  defaultYn: boolean;
  /** 수령인 이름 */
  receiverName: string;
  /** 배송지명 */
  name: string;
  /** 우편번호 */
  zipCode: string;
  /** 건물 코드 */
  buildingCode: string;
  /** 기본 주소 */
  receiverAddress: string;
  /** 상세 주소 */
  receiverAddressDetail: string;
  /** 수령인 연락처 */
  receiverCellPhone: string;
};

/**
 * 배송지 생성 요청 바디 타입
 */
export type CreateBuyersBody = {
  /** 수령인 이름 */
  receiverName: string;
  /** 배송지 주소 */
  receiverAddress: string;
  /** 수령인 연락처 */
  receiverCellPhone: string;
  /** 기본 배송지 여부 */
  defaultYn?: boolean;
  /** 배송지명 */
  name?: string;
  /** 우편번호 */
  zipCode?: string;
  /** 건물 코드 */
  buildingCode?: string;
  /** 상세 주소 */
  receiverAddressDetail?: string;
};

/** 배송지 생성 응답 타입 */
export type BuyersCreateResp = APIResponse & {
  data: object;
};

/** 배송지 조회 응답 타입 */
export type BuyersResp = APIResponse & {
  data: DeliveryAddress[];
};

/** 배송지 수정 응답 타입 */
export type UpdateBuyersResp = APIResponse & {
  data: object;
};

/** 배송지 삭제 응답 타입 */
export type DeleteBuyersResp = APIResponse & {
  data: object;
};

/** 내 배송지 목록 조회 응답 타입 */
export type MyAddressResp = APIResponse & {
  data: (Encrypt & DeliveryAddress)[];
};

/** 내 배송지 개수 조회 응답 타입 */
export type MyAddressCountResp = APIResponse & {
  data: number;
};

/**
 * 배송지 관련 API 함수 모음
 */
const buyersApi = {
  /**
   * 새로운 배송지를 등록합니다
   * @param {CreateBuyersBody} body - 배송지 생성 정보
   * @returns {Promise<BuyersCreateResp>} 배송지 생성 결과
   */
  createBuyers: (body: CreateBuyersBody): Promise<BuyersCreateResp> => {
    const url = BuyersUrl.createBuyers;
    return axiosInstance
      .post(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지 정보를 조회합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @returns {Promise<BuyersResp>} 배송지 정보
   */
  getBuyers: (buyerAddressIdEncrypt: string): Promise<BuyersResp> => {
    const url = BuyersUrl.getBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지 정보를 수정합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @param {CreateBuyersBody} body - 수정할 배송지 정보
   * @returns {Promise<UpdateBuyersResp>} 수정 결과
   */
  updateBuyers: (buyerAddressIdEncrypt: string, body: CreateBuyersBody): Promise<UpdateBuyersResp> => {
    const url = BuyersUrl.updateBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지를 삭제합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @returns {Promise<DeleteBuyersResp>} 삭제 결과
   */
  deleteBuyers: (buyerAddressIdEncrypt: string): Promise<DeleteBuyersResp> => {
    const url = BuyersUrl.deleteBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .delete(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 사용자의 모든 배송지 목록을 조회합니다
   * @returns {Promise<MyAddressResp>} 배송지 목록
   */
  getMyAddresses: (): Promise<MyAddressResp> => {
    const url = BuyersUrl.getMyAddress;
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 사용자의 배송지 개수를 조회합니다
   * @returns {Promise<MyAddressCountResp>} 배송지 개수
   */
  getMyAddressCount: (): Promise<MyAddressCountResp> => {
    const url = BuyersUrl.getMyAddressCount;
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default buyersApi;
