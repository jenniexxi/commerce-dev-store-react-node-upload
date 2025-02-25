import { useCallback, useEffect, useRef, useState } from 'react';

interface RRoundSDKOptions {
  shopId: string;
  mode?: 'development' | 'production';
}

// 인증 파라미터
interface AuthParams {
  payToken: string;
}

// 결제 초기화 파라미터
interface PaymentInitParams {
  payToken: string;
  payPrice: number;
  deliveryFee?: number;
  method?: string[];
}

// 결제 요청 정보 중 금액 객체
interface PayPriceObject {
  payPrice: string;
  taxScopePrice?: string;
  taxExScopePrice?: string;
  containerDeposit?: string;
}

// 결제 금액 정보
interface PriceObject {
  productPrice: string;
  dcPrice?: string;
  spPrice?: string;
  cpPrice?: string;
  point?: string;
  deliveryFee?: string;
  payPriceObj: PayPriceObject;
}

// 가상계좌 정보
interface VBankObject {
  bankCd: string;
  bankNm: string;
  acctNo: string;
  acctNm: string;
  expireDt: string;
  payPrice: string;
}

// 결제 요청 파라미터
interface PaymentRequestParams {
  ordNo: string;
  ordDay: string;
  ordTime: string;
  productNm: string;
  priceObj: PriceObject;
}

// 결제 응답 결과
interface PaymentResult {
  resCd: string;
  resMsg: string;
  ordNo?: string;
  payAuthCd?: string;
  payMethod?: string;
  priceObj?: PriceObject;
  vbankObj?: VBankObject;
}

// 인증 응답 결과
interface AuthResult {
  resCd: string;
  resMsg: string;
}

// 결제 UI 메서드
interface PaymentMethod {
  setPayPrice: (price: number) => Promise<void>;
  setDeliveryFee: (fee: number) => Promise<void>;
  setPaymentMethod: (methods: string[]) => Promise<void>;
  event: (eventName: string, callback: (data: any) => void) => void;
  destroy: () => Promise<void>;
}

// 결제 인스턴스
interface PaymentInstance {
  renderPayments: (params: { id: string }) => Promise<PaymentMethod>;
  requestPayments: (params: PaymentRequestParams) => Promise<PaymentResult>;
}

// SDK 메서드
interface RRoundSDK {
  authenticate: (params: AuthParams) => {
    requestPin: () => Promise<AuthResult>;
  };
  payments: (params: PaymentInitParams) => PaymentInstance;
}
// script 로드 상태 관리를 위한 전역 변수
let isScriptLoading = false;
let scriptLoaded = false;

export const useRRound = ({ shopId, mode = 'production' }: RRoundSDKOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sdkRef = useRef<any>(null);
  const paymentMethodRef = useRef<any>(null);

  // SDK 스크립트 로드
  useEffect(() => {
    // SSR 체크
    if (typeof window === 'undefined') return;

    // 이미 로드된 경우
    if (scriptLoaded && window.HectoFinancial) {
      sdkRef.current = window.HectoFinancial(shopId, mode);
      setIsLoaded(true);
      return;
    }

    // 로드 중인 경우
    if (isScriptLoading) {
      const checkScript = setInterval(() => {
        if (scriptLoaded && window.HectoFinancial) {
          sdkRef.current = window.HectoFinancial(shopId, mode);
          setIsLoaded(true);
          clearInterval(checkScript);
        }
      }, 100);

      return () => clearInterval(checkScript);
    }

    // 새로 로드하는 경우
    const scriptUrl =
      mode === 'development'
        ? 'https://tb-hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js'
        : 'https://hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js';

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    isScriptLoading = true;

    const handleLoad = () => {
      scriptLoaded = true;
      isScriptLoading = false;
      if (window.HectoFinancial) {
        sdkRef.current = window.HectoFinancial(shopId, mode);
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      scriptLoaded = false;
      isScriptLoading = false;
      setError(new Error('RROUND SDK 로드 실패'));
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [shopId, mode]);

  // 인증 처리
  const authenticate = useCallback(async (payToken: string) => {
    if (!sdkRef.current) {
      throw new Error('SDK가 초기화되지 않았습니다.');
    }

    const auth = sdkRef.current.authenticate({ payToken });
    return auth.requestPin();
  }, []);

  // 결제 초기화
  const initializePayment = useCallback(async (params: any) => {
    if (!sdkRef.current) {
      throw new Error('SDK가 초기화되지 않았습니다.');
    }

    return sdkRef.current.payments(params);
  }, []);

  // 결제 UI 렌더링
  const renderPaymentUI = useCallback(async (payments: any, containerId: string) => {
    const paymentMethod = await payments.renderPayments({
      id: containerId,
    });

    paymentMethodRef.current = paymentMethod;
    return paymentMethod;
  }, []);

  // 결제 UI 업데이트
  const updatePaymentUI = useCallback(
    async ({ payPrice, deliveryFee, method }: { payPrice?: number; deliveryFee?: number; method?: string[] }) => {
      const paymentMethod = paymentMethodRef.current;
      if (!paymentMethod) {
        throw new Error('결제 UI가 초기화되지 않았습니다.');
      }

      if (payPrice !== undefined) {
        await paymentMethod.setPayPrice(payPrice);
      }
      if (deliveryFee !== undefined) {
        await paymentMethod.setDeliveryFee(deliveryFee);
      }
      if (method !== undefined) {
        await paymentMethod.setPaymentMethod(method);
      }
    },
    [],
  );

  // 결제 요청
  const requestPayment = useCallback(async (payments: any, params: any) => {
    return payments.requestPayments(params);
  }, []);

  // 정리
  const cleanup = useCallback(() => {
    if (paymentMethodRef.current) {
      paymentMethodRef.current.destroy();
      paymentMethodRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isLoaded,
    error,
    authenticate,
    initializePayment,
    renderPaymentUI,
    updatePaymentUI,
    requestPayment,
    cleanup,
  };
};

// window 타입 확장
declare global {
  interface Window {
    HectoFinancial: (shopId: string, mode: 'development' | 'production') => RRoundSDK;
  }
}

// import React, { useEffect, useState } from 'react';
// import { useRRound } from './useRRound';

// const PaymentPage: React.FC = () => {
//   const {
//     isLoaded,
//     error,
//     initializePayment,
//     renderPaymentUI,
//     requestPayment
//   } = useRRound({
//     shopId: 'your_shop_id',
//     mode: 'development'
//   });

//   const [payments, setPayments] = useState<any>(null);
//   const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

//   // 결제 초기화
//   useEffect(() => {
//     if (!isLoaded) return;

//     const initialize = async () => {
//       try {
//         const paymentsInstance = await initializePayment({
//           payToken: 'your_pay_token',
//           payPrice: 10000,
//           deliveryFee: 2500,
//           method: ['CARDSPLE', 'PHONSPLE']
//         });

//         setPayments(paymentsInstance);

//         // 결제 UI 렌더링
//         const paymentMethod = await renderPaymentUI(paymentsInstance, '#payment-container');

//         // 결제수단 선택 이벤트 리스닝
//         paymentMethod.event('SELECT_PAYMENTS_METHOD', (method: string) => {
//           setSelectedMethod(method);
//         });
//       } catch (err) {
//         console.error('결제 초기화 실패:', err);
//       }
//     };

//     initialize();
//   }, [isLoaded, initializePayment, renderPaymentUI]);

//   // 결제 요청 처리
//   const handlePayment = async () => {
//     if (!payments) return;

//     try {
//       const result = await requestPayment(payments, {
//         ordNo: 'ord_no_12345',
//         ordDay: '20241101',
//         ordTime: '000000',
//         productNm: '드롱기 빈티지 커피머신',
//         priceObj: {
//           productPrice: '10000',
//           payPriceObj: {
//             payPrice: '10000',
//             taxScopePrice: '10000'
//           }
//         }
//       });

//       if (result.resCd === '0') {
//         console.log('결제 성공:', result);

//         // TODO: 결제 성공 후 처리
//         // 1. 결제 검증
//         // 2. 주문 완료 처리
//         // 3. 완료 페이지로 이동
//       } else if (result.resCd === '-2') {
//         console.log('결제 취소');
//       } else {
//         console.log('결제 실패:', result.resMsg);
//       }
//     } catch (err) {
//       console.error('결제 처리 중 오류 발생:', err);
//     }
//   };

//   if (error) {
//     return <div>에러 발생: {error.message}</div>;
//   }

//   if (!isLoaded) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">결제 페이지</h1>

//       {/* 결제 UI가 렌더링될 컨테이너 */}
//       <div id="payment-container" className="mb-4" />

//       {/* 결제하기 버튼 */}
//       <button
//         onClick={handlePayment}
//         disabled={!selectedMethod}
//         className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//       >
//         결제하기
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;
