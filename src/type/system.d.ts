/** 팝업 노출 타입 */
const POPUP_DISPLAY_TYPE = {
  /** 메인 */
  MAIN: 'DISPLAY_POPUP.DISPLAY_LOCATION.MAIN',
  /** URL */
  URL: 'DISPLAY_POPUP.DISPLAY_LOCATION.URL',
} as const;

/** 유저 디바이스 타입 코드 */
export type PopupDisplayTypeCode = (typeof POPUP_DISPLAY_TYPE)[keyof typeof POPUP_DISPLAY_TYPE];

const LOGO_DISPLAY_TYPE = {
  /** 텍스트 */
  TEXT: 'DISPLAY.GNB_LOGO_TYPE.TEXT',
  /** 이미지 */
  IMAGE: 'DISPLAY.GNB_LOGO_TYPE.IMAGE',
} as const;

/** 유저 디바이스 타입 코드 */
export type LogoDisplayTypeCode = (typeof LOGO_DISPLAY_TYPE)[keyof typeof LOGO_DISPLAY_TYPE];

// #region GET 상품 비교 검색 상세 조회
const GOODS_VERSUS_SEARCH_BADGE = {
  CHEAPEST: 'GOODS_VERSUS_SEARCH.BADGE.CHEAPEST', // 가장 싼 pick
  FASTEST: 'GOODS_VERSUS_SEARCH.BADGE.FASTEST', // 가장 빠른
  BEST_FEEDBACK: 'GOODS_VERSUS_SEARCH.BADGE.BEST_FEEDBACK', // 리뷰 좋은
} as const;

export type GoodsVersusSearchBadgeCode = (typeof GOODS_VERSUS_SEARCH_BADGE)[keyof typeof GOODS_VERSUS_SEARCH_BADGE];

const APIStatus = {
  Success: 'BASE.DEFAULT.SUCCESS',
  Fail: 'BASE.DEFAULT.FAILED',
  Error: 'BASE.EXCEPTION.EXCEPTION_ISSUED',
  Args: 'BASE.EXCEPTION.EXCEPTION_VALIDATION',
  NotFound: 'BASE.EXCEPTION.EXCEPTION_PAGE_NOT_FOUND',
  ExceptionAuth: 'BASE.EXCEPTION.EXCEPTION_AUTH',
} as const;
export type APIStatusKey = (typeof APIStatus)[keyof typeof APIStatus];

// 공통 API 응답 코드
export const BASE_EXCEPTION_CODES = {
  /** 시스템에러 발생, 관리자에게 문의하세요. */
  ExceptionIssued: 'BASE.EXCEPTION.EXCEPTION_ISSUED',
  /** 지원하지 않는 형식의 입력값이 존재합니다. */
  ExceptionBind: 'BASE.EXCEPTION.EXCEPTION_BIND',
  /** 지원하지 않는 약어값이 존재합니다. 관리자에게 문의하세요. */
  ExceptionEnum: 'BASE.EXCEPTION.EXCEPTION_ENUM',
  /** 지원하지 않는 HTTP 형식입니다. 관리자에게 문의하세요. */
  Http: 'BASE.EXCEPTION.EXCEPTION_HTTP',
  /** 요청 값 검증 실패 */
  Validation: 'BASE.EXCEPTION.EXCEPTION_VALIDATION',
  /** 존재하지 않는 페이지입니다. */
  NotFound: 'BASE.EXCEPTION.EXCEPTION_PAGE_NOT_FOUND',
  /** 권한이 없습니다. */
  ExceptionAuth: 'BASE.EXCEPTION.EXCEPTION_AUTH',
  /**
   * 조회 대상이 없습니다.
   * - 상품상세 전시 안하는 상품 url 접속
   * - 사용하지 않는 브랜드 페이지 접속
   */
  EntityNotFound: 'BASE.EXCEPTION.ENTITY_NOT_FOUND',
} as const;

export type BaseExceptionCode = (typeof BASE_EXCEPTION_CODES)[keyof typeof BASE_EXCEPTION_CODES];

// NOTI: 공통 API 응답 코드에 정의되지 않았지만
// 이메일 중복확인, 인증번호 같은 API에서 사용하는 에러 코드
// 자바쪽에서 정리가 안된 코드 느낌, 추후 정리되면 공통 API 응답 코드만 사용
const BASE_API_ERROR_CODES = {
  FAILED: 'BASE.DEFAULT.FAILED',
} as const;

export type BaseApiErrorCode = (typeof BASE_API_ERROR_CODES)[keyof typeof BASE_API_ERROR_CODES];
