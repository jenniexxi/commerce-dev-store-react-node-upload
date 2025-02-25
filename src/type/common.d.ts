/** 인증타입 enum */
export const AuthenticationType = {
  /** 성인인증 */
  ADULT: 'CERTIFICATION.PROCESS_TYPE.ADULT',
  /** 회원인증 */
  BUYER: 'CERTIFICATION.PROCESS_TYPE.BUYER',
  /** 비회원인증 */
  NON_BUYER: 'CERTIFICATION.PROCESS_TYPE.NON_BUYER',
  /** 회원가입 */
  BUYER_JOIN: 'CERTIFICATION.PROCESS_TYPE.BUYER_JOIN',
} as const;

/** 인증타입 코드 */
export type AuthenticationTypeCode = (typeof AuthenticationType)[keyof typeof AuthenticationType];

export type GenderTypeCode = '' | 'BUYER.GENDER_TYPE.MALE' | 'BUYER.GENDER_TYPE.FEMALE' | 'BUYER.GENDER_TYPE.OTHER';
