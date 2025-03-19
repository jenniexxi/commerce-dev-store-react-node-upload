import { useCallback, useEffect, useRef, useState } from 'react';

// SDK 초기화 옵션
interface InitializeOptions {
  shopId: string;
  mode?: 'development' | 'production';
}

// 로그인 인증 결과
interface AuthResult {
  resCd: string;
  resMsg: string;
}

// 결제 결과
interface PaymentResult {
  resCd: string;
  resMsg: string;
  ordNo?: string;
  payAuthCd?: string;
  payMethod?: string;
  priceObj?: any;
  vbankObj?: any;
}

// 결제 초기화 파라미터
interface PaymentInitParams {
  payToken: string;
  payPrice: number;
  deliveryFee?: number;
  method?: string[];
}

// 결제 요청 파라미터
interface PaymentRequestParams {
  ordNo: string;
  ordDay: string;
  ordTime: string;
  productNm: string;
  priceObj: any;
}

// 결제 UI 업데이트 파라미터
interface PaymentUpdateParams {
  payPrice?: number;
  deliveryFee?: number;
  method?: string[];
}

// 스크립트 로드 상태 추적을 위한 변수들
let scriptElement: HTMLScriptElement | null = null;
let isScriptLoading = false;
let scriptLoadPromise: Promise<void> | null = null;

export const useRRound = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sdkRef = useRef<any>(null);
  const paymentMethodRef = useRef<any>(null);

  // 스크립트 로드 함수
  const loadScript = useCallback((url: string): Promise<void> => {
    // 이미 로딩 중이거나 완료된 경우
    if (scriptLoadPromise) return scriptLoadPromise;
    if (scriptElement) return Promise.resolve();

    // 새로 로드
    isScriptLoading = true;
    scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      scriptElement = script;

      script.onload = () => {
        isScriptLoading = false;
        resolve();
      };

      script.onerror = () => {
        isScriptLoading = false;
        scriptElement = null;
        scriptLoadPromise = null;
        reject(new Error('RROUND SDK 스크립트 로드 실패'));
      };

      document.head.appendChild(script);
    });

    return scriptLoadPromise;
  }, []);

  // SDK 초기화 함수
  const initialize = useCallback(
    async ({ shopId, mode = 'production' }: InitializeOptions): Promise<void> => {
      try {
        // 스크립트 URL 결정
        const scriptUrl =
          mode === 'development'
            ? 'https://tb-hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js'
            : 'https://hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js';

        // 스크립트 로드
        await loadScript(scriptUrl);

        // SDK 초기화
        if (window.HectoFinancial) {
          sdkRef.current = window.HectoFinancial(shopId, mode);
          setIsReady(true);
        } else {
          throw new Error('HectoFinancial이 로드되지 않았습니다');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('알 수 없는 오류');
        setError(error);
        throw error;
      }
    },
    [loadScript],
  );

  // 로그인 인증/설정
  const authenticate = useCallback(async (payToken: string): Promise<AuthResult> => {
    if (!sdkRef.current) {
      throw new Error('SDK가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    const auth = sdkRef.current.authenticate({ payToken });
    return auth.requestPin();
  }, []);

  // 결제 초기화
  const initializePayment = useCallback(async (params: PaymentInitParams) => {
    if (!sdkRef.current) {
      throw new Error('SDK가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
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
  const updatePaymentUI = useCallback(async ({ payPrice, deliveryFee, method }: PaymentUpdateParams) => {
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
  }, []);

  // 결제 요청
  const requestPayment = useCallback(async (payments: any, params: PaymentRequestParams): Promise<PaymentResult> => {
    return payments.requestPayments(params);
  }, []);

  // 정리
  const cleanup = useCallback(() => {
    if (paymentMethodRef.current) {
      paymentMethodRef.current.destroy().catch(() => {
        // 오류 무시
      });
      paymentMethodRef.current = null;
    }
    sdkRef.current = null;
    setIsReady(false);
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isReady,
    error,
    initialize,
    authenticate,
    initializePayment,
    renderPaymentUI,
    updatePaymentUI,
    requestPayment,
    cleanup,
  };
};

// 글로벌 타입 선언
declare global {
  interface Window {
    HectoFinancial: (shopId: string, mode: 'development' | 'production') => any;
  }
}
