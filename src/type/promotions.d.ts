// 쿠폰 도메인 공통 에러 코드
const CouponCommonErrorCodes = {
  /** 세션 없는 case(비로그인) */
  NoSession: 'COUPON.VALIDATION_CHECK.NO_SESSION',
} as const;

type CouponCommonErrorCode = (typeof CouponCommonErrorCodes)[keyof typeof CouponCommonErrorCodes];

const DownloadCouponErrorCodes = {
  ...CouponCommonErrorCodes,
  /** 이미 발급된 쿠폰 */
  Duplication: 'COUPON.VALIDATION_CHECK.DUPLICATION',
  /** 발급 기간이 만료된 쿠폰 */
  Expiration: 'COUPON.VALIDATION_CHECK.EXPIRATION',
  /** 존재하지 않는 쿠폰 */
  NotExist: 'COUPON.VALIDATION_CHECK.NOT_EXIST',
  /** 해당 상품에 지정되지 않은 쿠폰 */
  NotRelation: 'COUPON.VALIDATION_CHECK.NOT_RELATION',
  /** 페이지에 머무르고 있는 사이에 쿠폰 미사용으로 변경된 case */
  NotUse: 'COUPON.VALIDATION_CHECK.NOT_USE',
  Validate: 'COUPON.VALIDATION_CHECK.VALIDATE',
  TemporaryError: 'COUPON.VALIDATION_CHECK.TEMPORARY_ERROR',
} as const;

type DownloadCouponErrorCode = (typeof DownloadCouponErrorCodes)[keyof typeof DownloadCouponErrorCodes];

// 삭제 에러 메시지
const DownloadCouponErrorMessages: Readonly<Record<DownloadCouponErrorCode, string>> = {
  [DownloadCouponErrorCodes.Duplication]: 'Alert285',
  [DownloadCouponErrorCodes.Expiration]: 'Alert286',
  [DownloadCouponErrorCodes.NotExist]: 'Alert287',
  [DownloadCouponErrorCodes.NotRelation]: 'Alert288',
  [DownloadCouponErrorCodes.NoSession]: 'Alert259',
  [DownloadCouponErrorCodes.NotUse]: 'Alert289',
  [DownloadCouponErrorCodes.Validate]: 'Alert290',
  [DownloadCouponErrorCodes.TemporaryError]: 'Alert253',
};

export {
  CouponCommonErrorCodes,
  // 쿠폰 발급
  DownloadCouponErrorCodes,
  DownloadCouponErrorMessages,
};

export const COUPON_BASE_DATE_TYPE = {
  Day: 'COUPON.BASE_DATE_TYPE.DAY',
  Month: 'COUPON.BASE_DATE_TYPE.MONTH',
  Year: 'COUPON.BASE_DATE_TYPE.YEAR',
} as const;

export type CouponBaseDateTypeCode = (typeof COUPON_BASE_DATE_TYPE)[keyof typeof COUPON_BASE_DATE_TYPE];

const RANDOM_COUPON_ERROR_CODES = {
  /** 시리얼 넘버 없음 case */
  INVALID_SERIAL_NUMBER: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.INVALID_SERIAL_NUMBER',
  /** 사용 기간 만료된 쿠폰 */
  OVER_DATE: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.OVER_DATE',
  /** 이미 사용된 쿠폰 */
  USED_COUPON: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.USED_COUPON',
  /** 관리자 발급 취소 case */
  ADMIN_CANCEL: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.ADMIN_CANCEL',
  /** 쿠폰 정책 변경 case */
  POLICY_CHANGE: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.POLICY_CHANGE',
  /** 쿠폰 등록 실패 */
  ISSUE_ERROR: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.ISSUE_ERROR',
  DEL_MAPPING_COUPON: 'RANDOM_COUPON.PUT_RANDOM_COUPON_ISSUE.DEL_MAPPING_COUPON',
} as const;

type RandomCouponErrorCode = (typeof RANDOM_COUPON_ERROR_CODES)[keyof typeof RANDOM_COUPON_ERROR_CODES];

const RANDOM_COUPON_ERROR_MESSAGES: Readonly<Record<RandomCouponErrorCode, string>> = {
  [RANDOM_COUPON_ERROR_CODES.INVALID_SERIAL_NUMBER]: 'Alert292',
  [RANDOM_COUPON_ERROR_CODES.OVER_DATE]: 'Alert293',
  [RANDOM_COUPON_ERROR_CODES.USED_COUPON]: 'Alert294',
  [RANDOM_COUPON_ERROR_CODES.ISSUE_ERROR]: 'Alert253',
  [RANDOM_COUPON_ERROR_CODES.ADMIN_CANCEL]: 'Alert295',
  [RANDOM_COUPON_ERROR_CODES.POLICY_CHANGE]: 'Alert296',
  [RANDOM_COUPON_ERROR_CODES.DEL_MAPPING_COUPON]: 'Alert297',
};
//#endregion

export {
  DiscountTypeCodes,
  UseDateTypeCodes,
  DiscountRangeTypeCodes,
  RANDOM_COUPON_ERROR_CODES,
  RANDOM_COUPON_ERROR_MESSAGES,
};

// 쿠폰 할인 타입 코드
const DiscountTypeCodes = {
  /** 퍼센트 */
  Percent: 'PROMOTION.DISCOUNT_TYPE.RATE',
  /** 정액, 고정가 */
  Fixed: 'PROMOTION.DISCOUNT_TYPE.PRICE',
};
export type DiscountTypeCode = (typeof DiscountTypeCodes)[keyof typeof DiscountTypeCodes];

// 사용 기간 타입 코드
const UseDateTypeCodes = {
  /** 사용 기간 지정 */
  Custom: 'COUPON.USE_DATE_TYPE.CUSTOM',
  /** 발행일 기준 */
  Publish: 'COUPON.USE_DATE_TYPE.PUBLISH',
  /** 발급일 기준 */
  Issue: 'COUPON.USE_DATE_TYPE.ISSUE',
  /** 제한 없음(무기한) */
  NoneLimit: 'COUPON.USE_DATE_TYPE.NONE_LIMIT',
};

export type UseDateTypeCode = (typeof UseDateTypeCodes)[keyof typeof UseDateTypeCodes];

// 할인 적용범위 타입 코드
const DiscountRangeTypeCodes = {
  /** 전체 */
  All: 'COUPON.DISCOUNT_RANGE_TYPE.ALL',
  /** 특정 상품 */
  Goods: 'COUPON.DISCOUNT_RANGE_TYPE.GOODS',
} as const;

export type DiscountRangeTypeCode = (typeof DiscountRangeTypeCodes)[keyof typeof DiscountRangeTypeCodes];

//#region common
export const MileagePaymentTypeCodes = {
  /** 적립 */
  Accumulate: 'MILEAGE.PAYMENT_TYPE.ACCUMULATE',
  /** 사용 */
  Deduction: 'MILEAGE.PAYMENT_TYPE.DEDUCTION',
} as const;

export type MileagePaymentTypeCode = '' | (typeof MileagePaymentTypeCodes)[keyof typeof MileagePaymentTypeCodes];
//#endregion

export const CouponTypeCodes = {
  Goods: 'COUPON.TYPE.GOODS',
  Duplication: 'COUPON.TYPE.DUPLICATION',
  Store: 'COUPON.TYPE.STORE',
} as const;

export type CouponTypeCode = (typeof CouponTypeCodes)[keyof typeof CouponTypeCodes];
