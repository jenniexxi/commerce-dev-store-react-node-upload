import { AVAILABLE_INFO_FAIL_CODES } from './shopping.d';
import { BASE_EXCEPTION_CODES } from './system.type';

/** 배송비 정책 */
export const SHIPPING_POLICY_TYPE = {
  /** 무료 */
  FREE: 'SHIPPING_POLICY.POLICY.FREE',
  /** 유료 */
  PAY: 'SHIPPING_POLICY.POLICY.PAY',
  /** 조건 */
  CONDITION: 'SHIPPING_POLICY.POLICY.CONDITION',
  /** 수량 */
  QUANTITY: 'SHIPPING_POLICY.POLICY.QUANTITY',
  /** 2구간 */
  SECTION_2: 'SHIPPING_POLICY.POLICY.SECTION_2',
  /** 3구간 */
  SECTION_3: 'SHIPPING_POLICY.POLICY.SECTION_3',
} as const;

/** 배송비 정책 코드 */
export type ShippingPolicyTypeCode = (typeof SHIPPING_POLICY_TYPE)[keyof typeof SHIPPING_POLICY_TYPE];

// 배송권역코드 Enum
export const ADD_SHIPPING_PRICE_AREA_CODES = {
  /** 부가하지 않음 */
  NONE: 'SHIPPING_POLICY.ADD_SHIPPING_PRICE.NONE',
  /** 2권역 */
  SECTION_2: 'SHIPPING_POLICY.ADD_SHIPPING_PRICE.SECTION_2',
  /** 3권역 */
  SECTION_3: 'SHIPPING_POLICY.ADD_SHIPPING_PRICE.SECTION_3',
} as const;

export type AddShippingPriceAreaCode =
  (typeof ADD_SHIPPING_PRICE_AREA_CODES)[keyof typeof ADD_SHIPPING_PRICE_AREA_CODES];

/** 배송비 계산기준 */
const SHIPPING_CHARGE_STANDARD_TYPE = {
  /** 그룹내 최소값으로 부과(무료포함) */
  MIN: 'SHIPPING_POLICY_GROUP.CHARGE_STANDARD.MIN',
  /** 그룹내 최대값으로 부과 */
  MAX: 'SHIPPING_POLICY_GROUP.CHARGE_STANDARD.MAX',
} as const;

/** 상품 판매 상태 코드 */
export type ShippingChargeStandardTypeCode =
  (typeof SHIPPING_CHARGE_STANDARD_TYPE)[keyof typeof SHIPPING_CHARGE_STANDARD_TYPE];

// #region 노출 위치 설정 ENUM
const GOODS_NOTICE_DISPLAY_TYPE_CODES = {
  /** 상단 */
  TOP: 'GOODS_NOTICE.DISPLAY_TYPE.TOP',
  /** 하단 */
  BOTTOM: 'GOODS_NOTICE.DISPLAY_TYPE.BOTTOM',
  /** 상하단 */
  TOP_BOTTOM: 'GOODS_NOTICE.DISPLAY_TYPE.TOP_BOTTOM',
} as const;

export type GoodsNoticeDisplayTypeCodeEnum =
  (typeof GOODS_NOTICE_DISPLAY_TYPE_CODES)[keyof typeof GOODS_NOTICE_DISPLAY_TYPE_CODES];

/**
 * 상품 판매상태 코드 값
 */
export const GoodsSaleStatus = {
  /** 판매증 */
  OnSale: 'GOODS.SALE_STATUS.SALE',
  /** 일시품절 */
  SoldOut: 'GOODS.SALE_STATUS.OUT_OF_STOCK',
  /** 판매중지 */
  Stop: 'GOODS.SALE_STATUS.STOP',
} as const;

/**
 * 상품 판매상태
 */
export type GoodsSaleStatusKey = (typeof GoodsSaleStatus)[keyof typeof GoodsSaleStatus];

/** 후기 타입 */
export const FEEDBACK_TYPE = {
  /** 일반후기 */
  NORMAL: 'BBS.FEEDBACK_TYPE.NORMAL',
  /** 포토후기 */
  PHOTO: 'BBS.FEEDBACK_TYPE.PHOTO',
} as const;

export type FeedbackTypeCode = (typeof FEEDBACK_TYPE)[keyof typeof FEEDBACK_TYPE];

/** 후기 정렬 타입 */
export const FEEDBACK_SORT_TYPE = {
  /** 최신순 */
  CREATE_DATE: 'FEEDBACK.SORT_TYPE.CREATE_DATE',
  /** 평점 높은 순 */
  HIGH_SCORE: 'FEEDBACK.SORT_TYPE.HIGH_SCORE',
  /** 평점 낮은 순 */
  LOW_SCORE: 'FEEDBACK.SORT_TYPE.LOW_SCORE',
} as const;

export type FeedbackSortTypeCode = (typeof FEEDBACK_SORT_TYPE)[keyof typeof FEEDBACK_SORT_TYPE];

/** 후기 등록 실패 에러 코드 */
const POST_FEEDBACK_ERROR_CODES = {
  EXIST: 'FEEDBACK.MYPAGE_FEEDBACK.EXIST', // 해당 상품에 대한 후기 작성 이력이 있을 경우
} as const;

export type PostFeedbackErrorCode = (typeof POST_FEEDBACK_ERROR_CODES)[keyof typeof POST_FEEDBACK_ERROR_CODES];

/** 후기 수정 실패 에러 코드 */
const PUT_FEEDBACK_ERROR_CODES = {
  NEED_IMAGE: 'FEEDBACK.MYPAGE_FEEDBACK.NEED_IMAGE', // 이미지 전체 삭제 후 수정 불가
} as const;

export type PutFeedbackErrorCode = (typeof PUT_FEEDBACK_ERROR_CODES)[keyof typeof PUT_FEEDBACK_ERROR_CODES];

const RESTOCK_ALERT_ERROR_CODES = {
  /** 상품의 재고 정보 변경 */
  GOODS_STOCK: 'GOODS_RESTOCK_ALERT.EXCEPTION.GOODS_STOCK',
  /** 상품 노출 여부 변경 (노출, 미노출) */
  GOODS_DISPLAY: 'GOODS_RESTOCK_ALERT.EXCEPTION.GOODS_DISPLAY',
  /** 상품 노출 상태 변경 (판매중지, 종료) */
  GOODS_DISPLAY_STATUS: 'GOODS_RESTOCK_ALERT.EXCEPTION.GOODS_DISPLAY_STATUS',
  /** 이미 재입고 신청 중 */
  ALREADY_REQUEST: 'GOODS_RESTOCK_ALERT.EXCEPTION.ALREADY_REQUEST',
} as const;

const GET_GOODS_RESTOCK_ALERT_ERROR_CODES = {
  GOODS_STOCK: RESTOCK_ALERT_ERROR_CODES.GOODS_STOCK,
} as const;

export type GetGoodsRestockAlertErrorCode =
  (typeof GET_GOODS_RESTOCK_ALERT_ERROR_CODES)[keyof typeof GET_GOODS_RESTOCK_ALERT_ERROR_CODES];

const POST_GOODS_RESTOCK_ALERT_ERROR_CODES = RESTOCK_ALERT_ERROR_CODES;

export type PostGoodsRestockAlertErrorCode =
  (typeof POST_GOODS_RESTOCK_ALERT_ERROR_CODES)[keyof typeof POST_GOODS_RESTOCK_ALERT_ERROR_CODES];

/**
 * 미니카트 - 저장 및 수정 실패
 */
export type CartOnPutErrorCode = (typeof AVAILABLE_INFO_FAIL_CODES)[keyof typeof AVAILABLE_INFO_FAIL_CODES];

/**
 * 미니카트 - 저장 및 수정 실패
 */

export const MinicartErrorCode = {
  IsOptionSelect: AVAILABLE_INFO_FAIL_CODES.IS_OPTION_SELECT, // 옵션 선택 여부
  SaleStockLack: AVAILABLE_INFO_FAIL_CODES.SALE_STOCK_LACK, // 판매가능 재고 보다 부족한 경우
  BuyMaxBuyCntExcess: AVAILABLE_INFO_FAIL_CODES.BUY_MAX_BUY_CNT_EXCESS, // 1인 최대 구매수량 초과
  MaxBuyCntExcess: AVAILABLE_INFO_FAIL_CODES.MAX_BUY_CNT_EXCESS, // 1회 최대 구매수량 초과
  MinBuyCntExcess: AVAILABLE_INFO_FAIL_CODES.MIN_BUY_CNT_EXCESS, // 최소 구매수량 미만
  NotGoodsSaleStatus: AVAILABLE_INFO_FAIL_CODES.NOT_GOODS_SALE_STATUS, // 상품 판매 불가 상태
  NonBuyerBuyMaxBuyCntCondition: AVAILABLE_INFO_FAIL_CODES.NON_BUYER_BUY_MAX_BUY_CNT_CONDITION, // 비회원 1인 최대 구매 수량 조건 상품 이용불가
} as const;
