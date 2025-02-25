// 화면정보 / 회원등급 조회 에러 코드
export const MYPAGE_MAIN_ERROR_CODES = {
  NO_SESSION: 'BUYER.VALIDATION.NO_SESSION', //세션이 존재하지 않음
  NOT_EXIST: 'BUYER_GROUP.VALIDATION.NOT_EXIST', //존재하지 않는 회원등급
};
export type MypageMainErrorCode = (typeof MYPAGE_MAIN_ERROR_CODES)[keyof typeof MYPAGE_MAIN_ERROR_CODES];
