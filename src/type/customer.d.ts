import { BASE_EXCEPTION_CODES } from './system.type';

const DETAIL_FILTER_CODES = {
  TITLE: 'BBS.NOTI_DETAIL_FILTER.TITLE', // 제목
  CONTENT: 'BBS.NOTI_DETAIL_FILTER.CONTENT', // 내용
} as const;

export type DetailFilterCode =
  | null // 전체
  | (typeof DETAIL_FILTER_CODES)[keyof typeof DETAIL_FILTER_CODES];

export const QnaRangeCode = {
  /** 1개월 */
  MONTH1: 'BBS.RANGE_TYPE.MONTH1',
  /** 3개월 */
  MONTH3: 'BBS.RANGE_TYPE.MONTH3',
  /** 6개월 */
  MONTH6: 'BBS.RANGE_TYPE.MONTH6',
  /** 12개월 */
  MONTH12: 'BBS.RANGE_TYPE.MONTH12',
} as const;
export type QnaRangeCodeKey = (typeof QnaRangeCode)[keyof typeof QnaRangeCode];

/**
 * 처리상태
 */
const GOODS_QNA_ANSWER_STATUS_CODES = {
  ANSWER_HOLD: 'BBS.STATUS.ANSWER_HOLD',
  ANSWER_DONE: 'BBS.STATUS.ANSWER_DONE',
} as const;

export type GoodsQnaAnswerStatusCode =
  (typeof GOODS_QNA_ANSWER_STATUS_CODES)[keyof typeof GOODS_QNA_ANSWER_STATUS_CODES];

const EDIT_GOODS_QNA_ERROR_CODES = {
  ANSWER_ALREADY_REGISTERED: 'GOODS_QNA.MYPAGE_GOODS_QNA.ANSWER_ALREADY_REGISTERED',
} as const;

export type EditGoodsQnaErrorCode =
  | (typeof BASE_EXCEPTION_CODES)['ExceptionAuth']
  | (typeof EDIT_GOODS_QNA_ERROR_CODES)[keyof typeof EDIT_GOODS_QNA_ERROR_CODES];

/**
 * 사업자 유형
 */
const BUSINESS_TYPE_CODES = {
  CORPORATION: 'COMPANY.BUSINESS_TYPE.CORPORATION', //법인사업자
  INDIVIDUAL: 'COMPANY.BUSINESS_TYPE.INDIVIDUAL', //개인사업자
  SIMPLIFIED_TAXPAYER: 'COMPANY.BUSINESS_TYPE.SIMPLIFIED_TAXPAYER', //간이과세자
  DUTY_FREE: 'COMPANY.BUSINESS_TYPE.DUTY_FREE', //면세사업자
} as const;

export type BusinessTypeCode = (typeof BUSINESS_TYPE_CODES)[keyof typeof BUSINESS_TYPE_CODES];

const SHIPPING_ADDRESS_TYPE_CODES = {
  SHIPPING: 'COMPANY.SHIPPING_ADDRESS_TYPE.SHIPPING', // 출고지
  CLAIM: 'COMPANY.SHIPPING_ADDRESS_TYPE.CLAIM', // 교환/반품지
} as const;

export type ShippingAddressTypeCode = (typeof SHIPPING_ADDRESS_TYPE_CODES)[keyof typeof SHIPPING_ADDRESS_TYPE_CODES];

export type BankCode =
  | 'ETC.BANK.HMC' //"HMC투자증권"
  | 'ETC.BANK.LIG' //"LIG증권"
  | 'ETC.BANK.NH' //"NH증권"
  | 'ETC.BANK.STANDARDCHARTERED' //"SC제일은행"
  | 'ETC.BANK.SK' //"SK증권"
  | 'ETC.BANK.KANGWON' //"강원은행"
  | 'ETC.BANK.KN' //"경남은행"
  | 'ETC.BANK.KJ' //"광주은행"
  | 'ETC.BANK.KYOBO' //"교보증권"
  | 'ETC.BANK.KB' //"국민은행"
  | 'ETC.BANK.SHINHANINVEST' //"굿모닝신한증권"
  | 'ETC.BANK.IBK' //"기업은행"
  | 'ETC.BANK.NONGHYUP' //"농협중앙회"
  | 'ETC.BANK.NONGHYUPUNIT' //"단위농협"
  | 'ETC.BANK.DGB' //"대구은행"
  | 'ETC.BANK.DAISHIN' //"대신증권"
  | 'ETC.BANK.DAEWOO' //"대우증권"
  | 'ETC.BANK.DB' //"동부증권"
  | 'ETC.BANK.MERITZ' //"메리츠증권"
  | 'ETC.BANK.MIRAE' //"미래에셋증권"
  | 'ETC.BANK.BOOKOOK' //"부국증권"
  | 'ETC.BANK.BUSAN' //"부산은행"
  | 'ETC.BANK.SJ' //"산림조합"
  | 'ETC.BANK.SAMSUNG' //"삼성증권"
  | 'ETC.BANK.CB' //"상업은행"
  | 'ETC.BANK.MUTUAL' //"상호저축은행"
  | 'ETC.BANK.MG' //"새마을금고"
  | 'ETC.BANK.SEOUL' //"서울은행"
  | 'ETC.BANK.SOLOMON' //"솔로몬증권"
  | 'ETC.BANK.SUHYUP' //"수협중앙회"
  | 'ETC.BANK.BARO' //"신안상호저축은행"
  | 'ETC.BANK.SHINYOUNG' //"신영증권"
  | 'ETC.BANK.CU' //"신용협동조합중앙회"
  | 'ETC.BANK.SHINHAN' //"신한은행"
  | 'ETC.BANK.WOORI' //"우리은행"
  | 'ETC.BANK.WOORIINVEST' //"우리투자증권"
  | 'ETC.BANK.EPOST' //"우체국"
  | 'ETC.BANK.MYASSET' //"유안타증권"
  | 'ETC.BANK.EUGENE' //"유진투자증권"
  | 'ETC.BANK.EBEST' //"이트레이드"
  | 'ETC.BANK.JB' //"전북은행"
  | 'ETC.BANK.JEJU' //"제주은행"
  | 'ETC.BANK.LIVESTOCK' //"축협중앙회"
  | 'ETC.BANK.KAKAKO' //"카카오뱅크"
  | 'ETC.BANK.K' //"케이뱅크"
  | 'ETC.BANKIWOOM.KIWOOM' //"키움증권"
  | 'ETC.BANK.TOSS' //"토스뱅크"
  | 'ETC.BANK.PB' //"평화은행"
  | 'ETC.BANK.HANAW' //"하나대투증권"
  | 'ETC.BANK.HANA' //"하나은행"
  | 'ETC.BANK.HI' //"하이투자증권"
  | 'ETC.BANK.KDB' //"한국산업은행"
  | 'ETC.BANK.CITI' //"한국씨티은행"
  | 'ETC.BANK.TRUEFRIEND' //"한국투자증권"
  | 'ETC.BANK.HANIL' //"한일은행"
  | 'ETC.BANK.HANWHA' //"한화증권"
  | 'ETC.BANK.HYUNDAI'; //"현대증권"
