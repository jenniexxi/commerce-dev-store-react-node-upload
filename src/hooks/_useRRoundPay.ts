// import { useCallback, useEffect, useRef, useState } from 'react';

// interface InitializeOptions {
//   shopId: string;
//   mode?: 'development' | 'production';
// }

// // 인증 파라미터
// interface AuthParams {
//   payToken: string;
// }

// // 결제 초기화 파라미터
// interface PaymentInitParams {
//   payToken: string;
//   payPrice: number;
//   deliveryFee?: number;
//   method?: string[];
// }

// // 결제 요청 정보 중 금액 객체
// interface PayPriceObject {
//   payPrice: string;
//   taxScopePrice?: string;
//   taxExScopePrice?: string;
//   containerDeposit?: string;
// }

// // 결제 금액 정보
// interface PriceObject {
//   productPrice: string;
//   dcPrice?: string;
//   spPrice?: string;
//   cpPrice?: string;
//   point?: string;
//   deliveryFee?: string;
//   payPriceObj: PayPriceObject;
// }

// // 가상계좌 정보
// interface VBankObject {
//   bankCd: string;
//   bankNm: string;
//   acctNo: string;
//   acctNm: string;
//   expireDt: string;
//   payPrice: string;
// }

// // 결제 요청 파라미터
// interface PaymentRequestParams {
//   ordNo: string;
//   ordDay: string;
//   ordTime: string;
//   productNm: string;
//   priceObj: PriceObject;
// }

// // 결제 응답 결과
// interface PaymentResult {
//   resCd: string;
//   resMsg: string;
//   ordNo?: string;
//   payAuthCd?: string;
//   payMethod?: string;
//   priceObj?: PriceObject;
//   vbankObj?: VBankObject;
// }

// // 인증 응답 결과
// interface AuthResult {
//   resCd: string;
//   resMsg: string;
// }

// // 결제 UI 메서드
// interface PaymentMethod {
//   setPayPrice: (price: number) => Promise<void>;
//   setDeliveryFee: (fee: number) => Promise<void>;
//   setPaymentMethod: (methods: string[]) => Promise<void>;
//   event: (eventName: string, callback: (data: any) => void) => void;
//   destroy: () => Promise<void>;
// }

// // 결제 인스턴스
// interface PaymentInstance {
//   renderPayments: (params: { id: string }) => Promise<PaymentMethod>;
//   requestPayments: (params: PaymentRequestParams) => Promise<PaymentResult>;
// }

// // SDK 메서드
// interface RRoundSDK {
//   authenticate: (params: AuthParams) => {
//     requestPin: () => Promise<AuthResult>;
//   };
//   payments: (params: PaymentInitParams) => PaymentInstance;
// }
// // script 로드 상태 관리를 위한 전역 변수
// let isScriptLoading = false;
// let scriptLoaded = false;

// export const useRRound = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const sdkRef = useRef<any>(null);
//   const paymentMethodRef = useRef<any>(null);

//   // SDK 스크립트 로드
//   useEffect(() => {
//     // SSR 체크
//     if (typeof window === 'undefined') return;

//     if (scriptLoaded) return;
//     if (isScriptLoading) return;

//     const loadScript = () => {
//       const scriptUrl = 'https://tb-hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js';
//       const script = document.createElement('script');
//       script.src = scriptUrl;
//       script.async = true;
//       isScriptLoading = true;

//       const handleLoad = () => {
//         scriptLoaded = true;
//         isScriptLoading = false;
//       };

//       const handleError = () => {
//         scriptLoaded = false;
//         isScriptLoading = false;
//         setError(new Error('RROUND SDK 로드 실패'));
//       };

//       script.addEventListener('load', handleLoad);
//       script.addEventListener('error', handleError);

//       document.head.appendChild(script);

//       return () => {
//         script.removeEventListener('load', handleLoad);
//         script.removeEventListener('error', handleError);
//       };
//     };

//     return loadScript();
//   }, []);
//   // 초기화
//   // SDK 초기화 (shopId와 mode를 매개변수로 받음)
//   const initialize = useCallback(({ shopId, mode = 'production' }: InitializeOptions) => {
//     if (typeof window === 'undefined') {
//       return Promise.reject(new Error('브라우저 환경이 아닙니다.'));
//     }

//     console.log('11111111', scriptLoaded);
//     if (!scriptLoaded) {
//       return new Promise<void>((resolve, reject) => {
//         console.log('2222222');
//         const checkInterval = setInterval(() => {
//           if (scriptLoaded && window.HectoFinancial) {
//             clearInterval(checkInterval);
//             sdkRef.current = window.HectoFinancial(shopId, mode);
//             setIsLoaded(true);
//             resolve();
//           } else if (!isScriptLoading && !scriptLoaded) {
//             clearInterval(checkInterval);
//             reject(new Error('RROUND SDK 로드 실패'));
//           }
//         }, 100);
//       });
//     }
//     // console.log('33333333', shopId, mode);
//     sdkRef.current = window.HectoFinancial(shopId, mode);
//     setIsLoaded(true);
//     return Promise.resolve();
//   }, []);

//   // 인증 처리
//   const authenticate = useCallback(async (payToken: string) => {
//     if (!sdkRef.current) {
//       throw new Error('SDK가 초기화되지 않았습니다.');
//     }

//     const auth = sdkRef.current.authenticate({ payToken });
//     return auth.requestPin();
//   }, []);

//   // 결제 초기화
//   const initializePayment = useCallback(async (params: any) => {
//     if (!sdkRef.current) {
//       throw new Error('SDK가 초기화되지 않았습니다.');
//     }

//     return sdkRef.current.payments(params);
//   }, []);

//   // 결제 UI 렌더링
//   const renderPaymentUI = useCallback(async (payments: any, containerId: string) => {
//     const paymentMethod = await payments.renderPayments({
//       id: containerId,
//     });

//     paymentMethodRef.current = paymentMethod;
//     return paymentMethod;
//   }, []);

//   // 결제 UI 업데이트
//   const updatePaymentUI = useCallback(
//     async ({ payPrice, deliveryFee, method }: { payPrice?: number; deliveryFee?: number; method?: string[] }) => {
//       const paymentMethod = paymentMethodRef.current;
//       if (!paymentMethod) {
//         throw new Error('결제 UI가 초기화되지 않았습니다.');
//       }

//       if (payPrice !== undefined) {
//         await paymentMethod.setPayPrice(payPrice);
//       }
//       if (deliveryFee !== undefined) {
//         await paymentMethod.setDeliveryFee(deliveryFee);
//       }
//       if (method !== undefined) {
//         await paymentMethod.setPaymentMethod(method);
//       }
//     },
//     [],
//   );

//   // 결제 요청
//   const requestPayment = useCallback(async (payments: any, params: any) => {
//     return payments.requestPayments(params);
//   }, []);

//   // 정리
//   const cleanup = useCallback(() => {
//     if (paymentMethodRef.current) {
//       paymentMethodRef.current.destroy();
//       paymentMethodRef.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     return cleanup;
//   }, [cleanup]);

//   return {
//     isLoaded,
//     error,
//     initialize,
//     authenticate,
//     initializePayment,
//     renderPaymentUI,
//     updatePaymentUI,
//     requestPayment,
//     cleanup,
//   };
// };

// // window 타입 확장
// declare global {
//   interface Window {
//     HectoFinancial: (shopId: string, mode: 'development' | 'production') => RRoundSDK;
//   }
// }

// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import dynamic from 'next/dynamic';
// // import { useRRound } from '@/hooks/useRRound';

// // // CSR only 컴포넌트
// // const PaymentPage = () => {
// //   const {
// //     isLoaded,
// //     error,
// //     initialize,
// //     initializePayment,
// //     renderPaymentUI,
// //     requestPayment
// //   } = useRRound();

// //   const [isInitialized, setIsInitialized] = useState(false);
// //   const [payments, setPayments] = useState<any>(null);
// //   const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

// //   // API에서 shopId를 가져오는 함수 (예시)
// //   const fetchShopId = async () => {
// //     // 실제로는 API 호출을 통해 shopId를 받아옴
// //     // const response = await fetch('/api/shop-info');
// //     // const data = await response.json();
// //     // return data.shopId;

// //     // 예시를 위한 임시 값
// //     return 'dynamic_shop_id_123';
// //   };

// //   // SDK 스크립트 로드 및 초기화
// //   useEffect(() => {
// //     const initSDK = async () => {
// //       try {
// //         // API에서 shopId 가져오기
// //         const shopId = await fetchShopId();

// //         // SDK 초기화
// //         await initialize({
// //           shopId,
// //           mode: process.env.NODE_ENV === 'development' ? 'development' : 'production'
// //         });

// //         setIsInitialized(true);
// //       } catch (err) {
// //         console.error('SDK 초기화 실패:', err);
// //       }
// //     };

// //     initSDK();
// //   }, [initialize]);

// //   // 결제 컴포넌트 초기화
// //   useEffect(() => {
// //     if (!isInitialized) return;

// //     const setupPayment = async () => {
// //       try {
// //         // API에서 결제 토큰 가져오기 (예시)
// //         // const response = await fetch('/api/payment-token');
// //         // const data = await response.json();
// //         // const payToken = data.payToken;
// //         const payToken = 'your_pay_token';

// //         const paymentsInstance = await initializePayment({
// //           payToken,
// //           payPrice: 10000,
// //           deliveryFee: 2500,
// //           method: ['CARDSPLE', 'PHONSPLE']
// //         });

// //         setPayments(paymentsInstance);

// //         // 결제 UI 렌더링
// //         const paymentMethod = await renderPaymentUI(paymentsInstance, '#payment-container');

// //         // 결제수단 선택 이벤트 리스닝
// //         paymentMethod.event('SELECT_PAYMENTS_METHOD', (method: string) => {
// //           setSelectedMethod(method);
// //         });
// //       } catch (err) {
// //         console.error('결제 초기화 실패:', err);
// //       }
// //     };

// //     setupPayment();
// //   }, [isInitialized, initializePayment, renderPaymentUI]);

// //   const handlePayment = async () => {
// //     if (!payments) return;

// //     try {
// //       const result = await requestPayment(payments, {
// //         ordNo: 'ord_no_12345',
// //         ordDay: '20241101',
// //         ordTime: '000000',
// //         productNm: '드롱기 빈티지 커피머신',
// //         priceObj: {
// //           productPrice: '10000',
// //           payPriceObj: {
// //             payPrice: '10000',
// //             taxScopePrice: '10000'
// //           }
// //         }
// //       });

// //       if (result.resCd === '0') {
// //         // 결제 성공
// //         // API 호출하여 결제 완료 처리
// //         alert('결제 성공!');
// //       } else if (result.resCd === '-2') {
// //         // 결제 취소
// //         alert('결제가 취소되었습니다.');
// //       } else {
// //         // 결제 실패
// //         alert(`결제 실패: ${result.resMsg}`);
// //       }
// //     } catch (err) {
// //       console.error('결제 처리 중 오류 발생:', err);
// //     }
// //   };

// //   if (error) {
// //     return <div>에러 발생: {error.message}</div>;
// //   }

// //   if (!isInitialized) {
// //     return <div>초기화 중...</div>;
// //   }

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-bold mb-4">결제 페이지</h1>

// //       {/* 결제 UI가 렌더링될 컨테이너 */}
// //       <div id="payment-container" className="mb-4" />

// //       <button
// //         onClick={handlePayment}
// //         disabled={!selectedMethod}
// //         className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
// //       >
// //         결제하기
// //       </button>
// //     </div>
// //   );
// // };

// // // CSR only로 컴포넌트 내보내기
// // export default dynamic(() => Promise.resolve(PaymentPage), {
// //   ssr: false
// // });
