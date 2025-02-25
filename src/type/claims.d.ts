/**
 * 마이페이지 클레임조회 상단 SORT용 주문상태값
 */
export const MYPAGE_CLAIM_SORT_CODES = {
  ALL_CLAIM: 'ORDER.MYPAGE_ITEM_STATUS.ALL_CLAIM', // 전체
  CANCEL: 'ORDER.MYPAGE_ITEM_STATUS.CANCEL', // 취소
  EXCHANGE: 'ORDER.MYPAGE_ITEM_STATUS.EXCHANGE', // 교환
  RETURN: 'ORDER.MYPAGE_ITEM_STATUS.RETURN', // 반품
} as const;

export type MypageClaimSortKey = (typeof MYPAGE_CLAIM_SORT_CODES)[keyof typeof MYPAGE_CLAIM_SORT_CODES];

/**
 * 클레임 타입
 */

export const CLAIM_TYPE_CODES = {
  /** 취소 */
  Cancel: 'ORDER.CLAIM_TYPE.CANCEL',
  /** 교환 */
  Exchange: 'ORDER.CLAIM_TYPE.EXCHANGE',
  /** 반품 */
  Return: 'ORDER.CLAIM_TYPE.RETURN',
  /** 입금 전 취소 */
  DepositCancel: 'ORDER.CLAIM_TYPE.DEPOSIT_CANCEL',
};

export type ClaimTypeKey = (typeof CLAIM_TYPE_CODES)[keyof typeof CLAIM_TYPE_CODES];

/**
 * 클레임사유 코드
 */
export const CLAIM_REASON_CODES = {
  CANCEL_DISLIKE_NONE: 'ORDER.CLAIM_REASON.CANCEL_DISLIKE_NONE', // 상품이 마음에 들지 않음
  CANCEL_DELAY_NONE: 'ORDER.CLAIM_REASON.CANCEL_DELAY_NONE', // 배송이 지연됨
  CANCEL_MISTAKE_NONE: 'ORDER.CLAIM_REASON.CANCEL_MISTAKE_NONE', // 주문 실수함
  CANCEL_ETC_BUYER: 'ORDER.CLAIM_REASON.CANCEL_ETC_BUYER', // 기타(구매자 귀책)
  CANCEL_ETC_SELLER: 'ORDER.CLAIM_REASON.CANCEL_ETC_SELLER', // 기타(판매자 귀책)
  EXCHANGE_DISLIKE_BUYER: 'ORDER.CLAIM_REASON.EXCHANGE_DISLIKE_BUYER', // 상품이 마음에 들지 않음
  EXCHANGE_SIZE_BUYER: 'ORDER.CLAIM_REASON.EXCHANGE_SIZE_BUYER', // 사이즈 맞지 않음
  EXCHANGE_SHIPPING_SELLER: 'ORDER.CLAIM_REASON.EXCHANGE_SHIPPING_SELLER', // 다른 주소로 배송됨
  EXCHANGE_FLAW_SELLER: 'ORDER.CLAIM_REASON.EXCHANGE_FLAW_SELLER', // 배송상품 파손/하자
  EXCHANGE_ETC_BUYER: 'ORDER.CLAIM_REASON.EXCHANGE_ETC_BUYER', // 기타(구매자 귀책)
  EXCHANGE_ETC_SELLER: 'ORDER.CLAIM_REASON.EXCHANGE_ETC_SELLER', // 기타(판매자 귀책)
  RETURN_DISLIKE_BUYER: 'ORDER.CLAIM_REASON.RETURN_DISLIKE_BUYER', // 상품이 마음에 들지 않음
  RETURN_SIZE_BUYER: 'ORDER.CLAIM_REASON.RETURN_SIZE_BUYER', // 사이즈 맞지 않음
  RETURN_SHIPPING_SELLER: 'ORDER.CLAIM_REASON.RETURN_SHIPPING_SELLER', // 다른 주소로 배송됨
  RETURN_FLAW_SELLER: 'ORDER.CLAIM_REASON.RETURN_FLAW_SELLER', // 배송상품 파손/하자
  RETURN_ETC_BUYER: 'ORDER.CLAIM_REASON.RETURN_ETC_BUYER', // 기타(구매자 귀책)
  RETURN_ETC_SELLER: 'ORDER.CLAIM_REASON.RETURN_ETC_SELLER', // 기타(판매자 귀책)
} as const;

export const CLAIM_CANCEL_REQUEST_REASON = {
  CANCEL_SIMPLE_CHANGE_MIND: 'ORDER.CLAIM_REASON.CANCEL_SIMPLE_CHANGE_MIND', // 단순 변심
  CANCEL_ORDER_MISTAKE: 'ORDER.CLAIM_REASON.CANCEL_ORDER_MISTAKE', // 주문 실수
  CANCEL_DELIVERY_DELAY: 'ORDER.CLAIM_REASON.CANCEL_DELIVERY_DELAY', // 배송 지연
  CANCEL_GOODS_SOLD: 'ORDER.CLAIM_REASON.CANCEL_GOODS_SOLD', //상품 품절
  CANCEL_CHANGE_OPTION: 'ORDER.CLAIM_REASON.CANCEL_CHANGE_OPTION', // 옵션 변경
};

export const CLAIM_EXCHANGE_REQUEST_REASON = {
  EXCHANGE_ORDER_MISTAKE: 'ORDER.CLAIM_REASON.EXCHANGE_ORDER_MISTAKE', // 주문 실수
  EXCHANGE_CHANGE_OPTION: 'ORDER.CLAIM_REASON.EXCHANGE_SIMPLE_CHANGE_MIND', // 단순 변심
  EXCHANGE_DAMAGE_DEFECT: 'ORDER.CLAIM_REASON.EXCHANGE_DAMAGE_DEFECT', // 파손 및 불량
  EXCHANGE_DELIVERY_MISTAKE: 'ORDER.CLAIM_REASON.EXCHANGE_DELIVERY_MISTAKE', // 오배송
  EXCHANGE_MISSING_DELIVERY: 'ORDER.CLAIM_REASON.EXCHANGE_MISSING_DELIVERY', // 구성품 누락
};

export const CLAIM_RETURN_REQUEST_REASON = {
  RETURN_SIMPLE_CHANGE_MIND: 'ORDER.CLAIM_REASON.RETURN_SIMPLE_CHANGE_MIND', // 단숨 변심
  RETURN_ORDER_MISTAKE: 'ORDER.CLAIM_REASON.RETURN_ORDER_MISTAKE', // 주문 실수
  RETURN_DAMAGE_DEFECT: 'ORDER.CLAIM_REASON.RETURN_DAMAGE_DEFECT', // 파손 및 불량
  RETURN_MISSING_DELIVERY: 'ORDER.CLAIM_REASON.RETURN_MISSING_DELIVERY', // 배송 누락
  RETURN_DELIVERY_MISTAKE: 'ORDER.CLAIM_REASON.RETURN_DELIVERY_MISTAKE', // 오배송
};

export type ClaimReasonCode = (typeof CLAIM_REASON_CODES)[keyof typeof CLAIM_REASON_CODES];

const CANCEL_POSSIBLE_ERROR_CODES = {
  MIN_BUY_CNT_EXCESS: 'ORDER.CLAIM_REQUEST.MIN_BUY_CNT_EXCESS', //최소 구매수량 미만
};
export type CancelPossibleErrorCode = (typeof CANCEL_POSSIBLE_ERROR_CODES)[keyof typeof CANCEL_POSSIBLE_ERROR_CODES];

/**
 * 모든 주문상태 Obj
 */

export const AllOrderStates = {
  /** 주문 */
  Order: {
    /** 전체 ALL */
    ALL: 'ORDER.ITEM_STATUS.ALL_ORDER',
    /** 결제대기 PAYMENT_WAIT */
    PW: 'ORDER.ITEM_STATUS.PAYMENT_WAIT',
    /** 입금예정 DEPOSIT_READY */
    DR: 'ORDER.ITEM_STATUS.DEPOSIT_READY',
    /** 입금확인 DEPOSIT_COMPLETE */
    DC: 'ORDER.ITEM_STATUS.DEPOSIT_COMPLETE',
    /** 배송준비중 SHIPPING_READY */
    SR: 'ORDER.ITEM_STATUS.SHIPPING_READY',
    /** 배송중 SHIPPING_ING */
    SI: 'ORDER.ITEM_STATUS.SHIPPING_ING',
    /** 배송완료 SHIPPING_COMPLETE */
    SC: 'ORDER.ITEM_STATUS.SHIPPING_COMPLETE',
    /** 배송시작 SHIPPING_START */
    SS: 'ORDER.ITEM_STATUS.SHIPPING_START',
    /** 구매확정 BUY_FINISHED */
    BF: 'ORDER.ITEM_STATUS.FINISH',
    /** 취소 CANCEL */
    C: 'ORDER.ITEM_STATUS.CANCEL',
    /** 교환 EXCHANGE */
    E: 'ORDER.ITEM_STATUS.EXCHANGE',
    /** 반품 RETURN */
    R: 'ORDER.ITEM_STATUS.RETURN',
    /** 배송지연 */
    SD: 'ORDER.ITEM_STATUS.SHIPPING_DELAY',
  } as const,

  /** 클레임 */
  Claim: {
    /** 입금전취소 CANCEL_BEFORE (DEPOSIT_CANCEL) */
    CB: 'ORDER.ITEM_STATUS.DEPOSIT_CANCEL',
    /** 취소요청 CANCEL_APPLY */
    CA: 'ORDER.ITEM_STATUS.CANCEL_APPLY',
    /** 취소완료 CANCEL_COMPLETE */
    CC: 'ORDER.ITEM_STATUS.CANCEL_COMPLETE',
    /** 취소거부 CANCEL_REJECT */
    CR: 'ORDER.ITEM_STATUS.CANCEL_REJECT',
    /** 교환재배송예정 EXCHANGE_RESHIPPING_READY YET */
    EY: 'ORDER.ITEM_STATUS.EXCHANGE_RESHIPPING_READY',
    /** 교환요청  EXCHANGE_APPLY */
    EA: 'ORDER.ITEM_STATUS.EXCHANGE_APPLY',
    /** 교환승인 EXCHANGE_ING */
    EI: 'ORDER.ITEM_STATUS.EXCHANGE_ING',
    /** 교환완료 EXCHANGE_COMPLETE */
    EC: 'ORDER.ITEM_STATUS.EXCHANGE_COMPLETE',
    /** 교환거부 EXCHANGE_REJECT */
    ER: 'ORDER.ITEM_STATUS.EXCHANGE_REJECT',
    /** 반품요청 RETURN_APPLY */
    RA: 'ORDER.ITEM_STATUS.RETURN_APPLY',
    /** 반품승인 RETURN_ING */
    RI: 'ORDER.ITEM_STATUS.RETURN_ING',
    /** 반품완료 RETURN_COMPLETE */
    RC: 'ORDER.ITEM_STATUS.RETURN_COMPLETE',
    /** 반품거부 RETURN_REJECT */
    RR: 'ORDER.ITEM_STATUS.RETURN_REJECT',
  } as const,
};

/**
 * 상품별 주문상태값
 */
export type OrderStateKey =
  /** 전체 */
  | (typeof AllOrderStates)['Order']['ALL']
  /** 결제대기 */
  | (typeof AllOrderStates)['Order']['PW']
  /** 입금예정 */
  | (typeof AllOrderStates)['Order']['DR']
  /** 입금전취소 */
  | (typeof AllOrderStates)['Claim']['CB']
  /** 입금확인 */
  | (typeof AllOrderStates)['Order']['DC']
  /** 배송준비중 */
  | (typeof AllOrderStates)['Order']['SR']
  /** 배송중 */
  | (typeof AllOrderStates)['Order']['SI']
  /** 배송완료 */
  | (typeof AllOrderStates)['Order']['SC']
  /** 구매확정 */
  | (typeof AllOrderStates)['Order']['BF']
  /** 배송지연 */
  | (typeof AllOrderStates)['Order']['SD']
  /** 배송시작 */
  | (typeof AllOrderStates)['Order']['SS'];
/**
 * 상품별 클레임 상태값
 */
export type ClaimStateKey =
  /** 입금 전 취소 */
  | (typeof AllOrderStates)['Claim']['CB']
  /** 취소요청 */
  | (typeof AllOrderStates)['Claim']['CA']
  /** 취소완료 */
  | (typeof AllOrderStates)['Claim']['CC']
  /** 취소거부 */
  | (typeof AllOrderStates)['Claim']['CR']
  /** 교환재배송예정 */
  | (typeof AllOrderStates)['Claim']['EY']
  /** 교환요청  */
  | (typeof AllOrderStates)['Claim']['EA']
  /** 교환승인 */
  | (typeof AllOrderStates)['Claim']['EI']
  /** 교환완료 */
  | (typeof AllOrderStates)['Claim']['EC']
  /** 교환거부 */
  | (typeof AllOrderStates)['Claim']['ER']
  /** 반품요청 */
  | (typeof AllOrderStates)['Claim']['RA']
  /** 반품승인 */
  | (typeof AllOrderStates)['Claim']['RI']
  /** 반품완료 */
  | (typeof AllOrderStates)['Claim']['RC']
  /** 반품거부 */
  | (typeof AllOrderStates)['Claim']['RR'];

export type ItemStateKey =
  | (typeof AllOrderStates)['Order']['DR']
  | (typeof AllOrderStates)['Order']['DC']
  | (typeof AllOrderStates)['Order']['SR']
  | (typeof AllOrderStates)['Order']['SI']
  | (typeof AllOrderStates)['Order']['SC']
  | (typeof AllOrderStates)['Order']['BF']
  | (typeof AllOrderStates)['Order']['SD']
  | (typeof AllOrderStates)['Order']['SS']
  | (typeof AllOrderStates)['Claim']['CB']
  | (typeof AllOrderStates)['Claim']['CA']
  | (typeof AllOrderStates)['Claim']['CC']
  | (typeof AllOrderStates)['Claim']['RA']
  | (typeof AllOrderStates)['Claim']['RI']
  | (typeof AllOrderStates)['Claim']['RC']
  | (typeof AllOrderStates)['Claim']['EY']
  | (typeof AllOrderStates)['Claim']['EA']
  | (typeof AllOrderStates)['Claim']['EI']
  | (typeof AllOrderStates)['Claim']['EC'];

/**
 * 상품별 주문상태값 + 상품별 클레임 상태값
 */

export type OrderClaimStateKey = OrderStateKey | ClaimStateKey;

export const ClaimStates: ClaimStateKey[] = [
  /** 입금 전 취소 */
  AllOrderStates['Claim']['CB'],
  /** 취소요청 */
  AllOrderStates['Claim']['CA'],
  /** 취소완료 */
  AllOrderStates['Claim']['CC'],
  /** 취소거부 */
  AllOrderStates['Claim']['CR'],
  /** 교환재배송예정 */
  AllOrderStates['Claim']['EY'],
  /** 교환요청  */
  AllOrderStates['Claim']['EA'],
  /** 교환승인 */
  AllOrderStates['Claim']['EI'],
  /** 교환완료 */
  AllOrderStates['Claim']['EC'],
  /** 교환거부 */
  AllOrderStates['Claim']['ER'],
  /** 반품요청 */
  AllOrderStates['Claim']['RA'],
  /** 반품승인 */
  AllOrderStates['Claim']['RI'],
  /** 반품완료 */
  AllOrderStates['Claim']['RC'],
  /** 반품거부 */
  AllOrderStates['Claim']['RR'],
];

/**
 * 상품 유형
 */

export const GOODS_CUSTOM_MADE_TYPE = {
  NORMAL: 'GOODS.GOODS_TYPE.NORMAL', // 일반
  NORMAL_DEAL: 'GOODS.GOODS_TYPE.NORMAL_DEAL', // 일반_타임딜
  CUSTOM_MADE: 'GOODS.GOODS_TYPE.CUSTOM_MADE', // 주문 제작
  CUSTOM_MADE_DEAL: 'GOODS.GOODS_TYPE.CUSTOM_MADE_DEAL', // 주문 제작_타임딜
} as const;

export type GoodsCustomMadeType = (typeof GOODS_CUSTOM_MADE_TYPE)[keyof typeof GOODS_CUSTOM_MADE_TYPE];
