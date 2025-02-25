declare global {
  interface Window {
    onResume?: (value: string) => void;
  }
}

/**
 * 헤더 객체의 타입
 * @type HeaderObj
 */
type HeaderObj = {
  /** 헤더 제목 */
  title?: string;
  /** 창 닫기 타입 ('C': close, 'B': back) */
  closeType?: 'C' | 'B';
};

/**
 * 챌린지 정보 타입
 * @type ChallengeInfo
 */
type ChallengeInfo = {
  /** 챌린지 시퀀스 */
  seq: number;
  /** 챌린지 타입 */
  type: 1 | 2 | 3 | 5 | 6;
  /** 챌린지 참여 코드 */
  joinCode: string;
  /** 챌린지 상태 */
  status: 'R' | 'D' | 'W' | 'P' | 'E';
};
export type NotifyKeboardStatus = { isShowed: boolean; keyboardHeight: number };
export const CALLBACKID = {
  requestCommunityInfo: 'requestCommunityInfo',
};
/**
 * 앱과 웹 간의 인터페이스를 제공하는 webviewbridge 클래스
 * @class webviewbridge
 */
class webviewbridge {
  private static instance: webviewbridge;

  private constructor() {
    this.initializeGlobalBridge();
  }

  /**
   * 현재 환경이 iOS인지 확인
   * @returns {boolean} iOS 여부
   */
  public isIos(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const hasWebkit = !!(window as any).webkit?.messageHandlers?.metawalkJs;

    return isIosDevice && hasWebkit;
  }

  /**
   * 현재 환경이 Android인지 확인
   * @returns {boolean} Android 여부
   */
  public isAndroid(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    const hasMetawalkJs = !!(window as any).metawalkJs;
    return isAndroidDevice && hasMetawalkJs;
  }

  /**
   * 현재 환경이 웹뷰인지 확인
   * @returns {boolean} 웹뷰 여부
   */
  public isWebView(): boolean {
    const isIos = this.isIos();
    const isAndroid = this.isAndroid();
    return isIos || isAndroid;
  }

  /**
   * WebViewBridge를 글로벌로 초기화
   * @private
   */
  private initializeGlobalBridge(): void {
    // 글로벌 객체에 WebViewBridge 설정

    (window as any).appInterface = {
      callback: (callbackId: string, value: string) => {
        console.log('[WebViewBridge] Received callback:', { callbackId, value });

        // callbackId에 해당하는 콜백 함수가 있다면 실행
        if (typeof (window as any)[callbackId] === 'function') {
          // value가 있는 경우에만 전달
          (window as any)[callbackId](value);
          // 콜백 실행 후 제거
          delete (window as any)[callbackId];
        }
      },
      onResume: (value: string) => {},
    };
    (window as any).WebViewBridge = {
      processCallback: webviewbridge.processCallback,
      sendResumeToWebView: webviewbridge.sendResumeToWebView,
      funeasySendAnswer: webviewbridge.funeasySendAnswer,
      funeasyGoback: webviewbridge.funeasyGoback,
      executeFuneasyCode: webviewbridge.executeFuneasyCode,
      processBack: webviewbridge.processBack,
      notifyKeboardStatus: webviewbridge.notifyKeboardStatus,
    };
    (window as any).callback = webviewbridge.processCallback;
  }

  /**
   * 네이티브 함수 호출
   * @private
   * @param {string} functionName - 호출할 네이티브 함수 이름
   * @param {any} args - 네이티브 함수에 전달할 인자
   */
  private callNative(functionName: string, args?: any): void {
    if (!this.isWebView()) {
      return;
    }

    try {
      if (this.isIos()) {
        console.log('[WebViewBridge] Sending message to iOS WebView');
        const message = {
          method: functionName,
          ...(args && { args }),
        };
        (window as any).webkit.messageHandlers.metawalkJs.postMessage(message);
      } else if (this.isAndroid()) {
        const bridge = (window as any).metawalkJs;
        console.log('[WebViewBridge] Bridge:', bridge);

        if (bridge) {
          if (typeof bridge[functionName] === 'function') {
            // 직접 함수 호출 방식 시도
            if (args) {
              bridge[functionName](JSON.stringify(args));
            } else {
              bridge[functionName]();
            }
          } else if (bridge.postMessage) {
            // postMessage 방식 시도
            console.log(
              JSON.stringify({
                functionName,
                ...(args && { args }),
              }),
            );
            bridge.postMessage(
              JSON.stringify({
                functionName,
                ...(args && { args }),
              }),
            );
          } else {
            throw new Error('Android bridge method not found');
          }
          console.log('[WebViewBridge] Successfully sent message to Android WebView');
        } else {
          throw new Error('Android bridge not found');
        }
      }
    } catch (error) {
      console.error(`[WebViewBridge] Error calling native function ${functionName}:`, error);
    }
  }

  /**
   * webviewbridge 싱글톤 인스턴스 반환
   * @returns {webviewbridge} webviewbridge 인스턴스
   */
  public static getInstance(): webviewbridge {
    if (!webviewbridge.instance) {
      webviewbridge.instance = new webviewbridge();
    }
    return webviewbridge.instance;
  }

  /**
   * 새로운 웹뷰 호출.
   * @param {object} params - 웹뷰 호출 파라미터
   * @param {('I'|'O')} params.type - 브라우저 호출 타입 ('I': 앱 내부 웹뷰, 'O': 디바이스 내 내장 브라우저)
   * @param {string} params.url - 호출 URL
   * @param {HeaderObj} [params.headerObj] - 헤더 객체
   * @param {string} [params.transparent='Y'] - 투명 여부 ('Y': 투명, 'N': 불투명)
   * @param {string} [params.useHistoryBack] - 뒤로가기 사용 여부 ('Y': 사용, 'N': 미사용)
   * @param {string} [params.parentCloseYn] - 부모창 닫기 여부 ('Y': 닫기, 'N': 유지)
   * @param {string} [params.extraParam] - 추가 파라미터
   */
  public openWebPage(params: {
    type: 'I' | 'O';
    url: string;
    headerObj?: HeaderObj | null;
    useHistoryBack?: 'Y' | 'N';
    parentCloseYn?: string;
    extraParam?: string;
    transparent?: 'Y' | 'N';
  }): void {
    this.callNative('openWebPage', {
      ...params,
      transparent: params.transparent ?? 'Y',
    });
  }

  /**
   * 알림 페이지 호출
   * @param {object} params - 페이지 호출 파라미터
   * @param {string} [params.type] - 'community' |'service' 커뮤니티, 서비스
   */

  public openNotificationList(params: { type: 'community' | 'service' }): void {
    this.callNative('openNotificationList', { ...params });
  }

  /**
   * Native 웹뷰를 close
   * @param {object} params - 웹뷰 닫기 파라미터
   * @param {string} [params.gubun] - 창 종료 시 하위창 컨트롤을 위한 파라미터
   */
  public close(params?: { gubun?: string }): void {
    this.callNative('close', params || {});
  }

  /**
   * 클립보드로 문자열 복사.
   * @param {object} params - 클립보드 복사 파라미터
   * @param {string} params.value - 클립보드로 복사할 문자열
   * @param {function} params.callback - 복사 완료 후 호출될 콜백 함수
   */
  public toClipBoard(params: { value: string; callback: (result: any) => void }): void {
    const callbackId = `toClipBoard_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('toClipBoard', { callbackId, value: params.value });
  }

  /**
   * 화면 캡처.
   * @param {object} params - 화면 캡처 파라미터
   * @param {function} params.callback - 캡처 완료 후 호출될 콜백 함수
   */
  public takeCapture(params: { callback: (result: 'Y' | 'N') => void }): void {
    const callbackId = `takeCapture_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('takeCapture', { callbackId });
  }

  /**
   * gnb 컨트롤
   * @param {boolean} show - gnb노출여부 
   
   */
  public controlBottomTabBar(show: boolean): void {
    this.callNative('controlBottomTabBar', { show });
  }

  /**
   * 본인인증 화면 open
   */
  public openAuth(): void {
    this.callNative('openAuth', {});
  }

  /**
   * 이벤트 기록
   * @param {object} params - 이벤트 기록 파라미터
   * @param {string} params.trackingCode - 이벤트 구분 코드
   * @param {Record<string, string>} params.params - 이벤트 기록 시 포함할 데이터
   */
  public sendAnalytics(params: { trackingCode: string; params: Record<string, string> }): void {
    this.callNative('sendAnalytics', params);
  }

  /**
   * 화면 이벤트 기록
   * @param {object} params - 화면 이벤트 기록 파라미터
   * @param {string} params.screenName - 화면 이름
   */
  public sendAnalyticsScreenView(params: { screenName: string }): void {
    this.callNative('sendAnalyticsScreenView', params);
  }

  /**
   * 특정 탭으로 이동
   * @param {object} params - 탭 이동 파라미터
   * @param {string} params.tabCode - 이동할 탭 코드
   * @param {ChallengeInfo} [params.challengeInfo] - 챌린지 정보 (챌린지 상세 페이지일 경우)
   * @param {string} [params.linkUrl] - 이동할 링크 URL (선택사항)
   */
  public goNativeTab(params: { tabCode: string; challengeInfo?: ChallengeInfo; linkUrl?: string }): void {
    this.callNative('goNativeTab', params);
  }

  /**
   * 특정 챌린지 정보 화면으로 이동
   * @param {object} params - 챌린지 정보 파라미터
   * @param {ChallengeInfo} params.challengeInfo - 챌린지 정보
   */
  public goChallengeInfo(params: { challengeInfo: ChallengeInfo }): void {
    this.callNative('goChallengeInfo', params);
  }

  /**
   * 웹 페이지 내비게이션 수행
   * @param {object} params - 웹 페이지 내비게이션 파라미터
   * @param {('I')} params.type - 브라우저 호출 타입 ('I': 앱 내부 웹뷰)
   * @param {string} params.url - 호출 URL
   * @param {string} [params.extraParam] - 추가 파라미터
   */
  public navigateWeb(params: { type: 'I'; url: string; extraParam?: string }): void {
    this.callNative('navigateWeb', params);
  }

  /**
   * 구매 완료 신호 전달
   */
  public purchaseCompleted(): void {
    this.callNative('purchaseCompleted', {});
  }

  /**
   * 오퍼월 실행
   * @param {object} params - 오퍼월 실행 파라미터
   * @param {string} [params.offerwallType] - 실행할 오퍼월 유형
   */
  public openOfferwall(params?: { offerwallType?: string }): void {
    this.callNative('openOfferwall', params || {});
  }

  /**
   * 오퍼월 총 보상을 요청
   * @param {object} params - 오퍼월 총 보상 요청 파라미터
   * @param {string} params.type - 오퍼월 유형
   * @param {function} params.callback - 총 보상 정보를 받을 콜백 함수
   */
  public offerwallTotalReward(params: { type: string; callback: (data: any) => void }): void {
    const callbackId = `offerwallTotalReward_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('offerwallTotalReward', { type: params.type, callbackId });
  }

  /**
   * 약관 동의 철회에 따른 처리를 수행
   * @param {object} params - 약관 동의 철회 파라미터
   * @param {string} params.type - 동의 철회한 약관 유형
   */
  public withdrawPolicies(params: { type: string }): void {
    this.callNative('withdrawPolicies', params);
  }

  /**
   * 쿠팡 모아보기 설치 (Android 전용)
   */
  public makeCoupangShortcut(): void {
    this.callNative('makeCoupangShortcut', {});
  }

  /**
   * 쿠팡 모아보기 설치 여부 확인 (Android 전용)
   * @param {object} params - 쿠팡 모아보기 설치 여부 확인 파라미터
   * @param {function} params.callback - 설치 여부를 받을 콜백 함수
   */
  public isExistCoupangShortcut(params: { callback: (result: 'Y' | 'N') => void }): void {
    const callbackId = `isExistCoupangShortcut_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('isExistCoupangShortcut', { callbackId });
  }

  /**
   * adpie 비디오 광고 실행
   * @param {object} params - adpie 비디오 광고 실행 파라미터
   * @param {string} params.slotId - 비디오 광고를 보여줄 지면 id
   * @param {string} params.type - 비디오 광고 유형
   * @param {string} params.trackingLabel - airbridge event tracking시 사용하는 label값
   * @param {function} params.callback - 광고 결과를 받을 콜백 함수
   */
  public adpieVideoAd(params: {
    slotId: string;
    type: string;
    trackingLabel: string;
    callback: (result: any) => void;
  }): void {
    const callbackId = `adpieVideoAd_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('adpieVideoAd', {
      slotId: params.slotId,
      type: params.type,
      trackingLabel: params.trackingLabel,
      callbackId,
    });
  }

  /**
   * 약관 동의 화면 종료 시 동작 수행
   * @param {object} params - 약관 동의 화면 종료 파라미터
   * @param {string} params.source - 약관 유형
   * @param {string} params.beginFlag - 챌린지 시작 유형
   * @param {string} params.challengeJoinCode - 챌린지 참여 코드
   * @param {number} params.fee - 챌린지 참여시 필요 포인트
   * @param {number} params.point - 잔여 포인트
   */
  public closeWebTermAgreement(params: {
    source: string;
    beginFlag: string;
    challengeJoinCode: string;
    fee: number;
    point: number;
  }): void {
    this.callNative('closeWebTermAgreement', params);
  }

  /**
   * 계정찾기 완료 시 Native 웹뷰 close (Android 전용)
   * @param {object} params - 계정찾기 완료 파라미터
   * @param {string} params.result - 처리 결과
   * @param {string} params.nickname - 별명 (계정찾기 성공 시에만 포함)
   * @param {any[]} params.accounts - 계정 정보 배열
   */
  public closeWithAccountInfo(params: { result: string; nickname: string; accounts: any[] }): void {
    this.callNative('closeWithAccountInfo', params);
  }

  /**
   * Native 웹뷰 close (파라미터 포함)
   * @param {object} params - 웹뷰 닫기 파라미터
   * @param {string} params.result - 처리 결과
   * @param {string} [params.refresh_token] - 로그인 리프레시 토큰 (계정 통합 성공 시에만 포함)
   */
  public closeWeb(params: { result: string; refresh_token?: string }): void {
    this.callNative('closeWeb', params);
  }

  /**
   * Native 웹뷰 닫으며 페이지 리로드
   */
  public closeWithMainReload(): void {
    this.callNative('closeWithMainReload', {});
  }

  /**
   * 로딩화면이 표시되어야하는 화면 전달
   * 지금은 profile
   */
  public useCommunityUploadProgressBar(): void {
    this.callNative('useCommunityUploadProgressBar', 'Y');
  }

  /**
   * 연락처 동기화
   * @param {object} params - 연락처 동기화 파라미터
   * @param {function} params.callback - 동기화 결과 받을 콜백 함수
   */
  public phonebookSync(params: { callback: (result: any) => void }): void {
    const callbackId = `phonebookSync_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('phonebookSync', { callbackId });
  }

  /**
   * 웹 페이지 공유
   * @param {object} params - 웹 페이지 공유 파라미터
   * @param {string} params.url - 공유할 링크
   * @param {string} params.description - 공유할 url에 대한 설명
   */
  public shareWebPage(params: { url: string; description: string }): void {
    this.callNative('shareWebPage', params);
  }

  /**
   * 회원가입 화면으로 이동 (iOS 전용)
   */
  public goSignUp(): void {
    this.callNative('goSignUp', {});
  }

  /**
   * 웹뷰 네비게이션 타이틀 설정 (iOS 전용)
   * @param {object} params - 웹뷰 네비게이션 타이틀 설정 파라미터
   * @param {string} params.title - 네비게이션 타이틀
   */
  public setTitle(params: { title: string }): void {
    this.callNative('setTitle', params);
  }

  /**
   * 외부 브라우저 open (iOS 전용)
   * @param {object} params - 외부 브라우저 open 파라미터
   * @param {string} params.url - 오픈할 페이지 링크
   */
  public outLink(params: { url: string }): void {
    this.callNative('outLink', params);
  }

  /**
   * 헤더 데이터를 콜웹으로 전달 (iOS 전용)
   * @param {object} params - 헤더 데이터 전달 파라미터
   * @param {function} params.callback - 헤더 데이터를 받을 콜백 함수
   */
  public requestHeader(params: { callback: (data: any) => void }): void {
    const callbackId = `requestHeader_${Date.now()}`;
    (window as any)[callbackId] = params.callback;
    this.callNative('requestHeader', { callbackId });
  }

  /**
   * 웹에서 갱신된 토큰을 앱에 저장 (iOS 전용)
   * @param {object} params - 토큰 저장 파라미터
   * @param {string} params.authToken - 갱신된 인증 토큰
   */
  public refreshToken(params: { authToken: string }): void {
    this.callNative('refreshToken', params);
  }

  /**
   * 웹페이지 리다이렉트 시 실행할 funeasy의 자바스크립트 코드 설정
   * @param {object} params - funeasy 코드 설정 파라미터
   * @param {string} params.code - 실행할 자바스크립트 코드
   */
  public funeasyExcuteInApp(params: { code: string }): void {
    this.callNative('funeasyExcuteInApp', params);
  }

  /**
   * 네이티브 기기 내의 다른 앱 또는 웹(기본 브라우저) 실행
   * @param {object} params - 앱/웹 실행 파라미터
   * @param {string} params.url - 실행할 주소
   */
  public funeasyOpenIntent(params: { url: string }): void {
    this.callNative('funeasyOpenIntent', params);
  }

  /**
   * funeasy를 위해 다른 앱에서 공유받은 데이터 초기화
   */
  public clearFuneasyData(): void {
    this.callNative('clearFuneasyData', {});
  }

  /**
   * 자식 웹뷰를 종료하며 부모 웹뷰에서 지정된 자바스크립트 함수 실행
   * @param {object} params - 부모 웹뷰 함수 실행 파라미터
   * @param {string} params.funcName - 부모 웹뷰에서 실행할 자바스크립트 함수의 이름
   */
  public callParentFunc(params: { funcName: string }): void {
    this.callNative('callParentFunc', params);
  }

  /**
   * 웹 상세화면의 WebView를 열 때, HW Back키를 Web으로 전달받기 원할 때 호출 (Android 전용)
   * @param {object} params - HW Back키 설정 파라미터
   * @param {boolean} params.enabled - 설정여부
   */
  public needBackEvent(params: { enabled: boolean }): void {
    this.callNative('needBackEvent', {
      enabled: params.enabled.toString(),
    });
  }

  /**
   * 커뮤니티 Web 화면에서 글쓰기 Native 화면을 호출
   * @param {object} params - 글쓰기 화면 호출 파라미터
   * @param {string} params.postType - 글쓰기 타입 ('new': 신규 작성, 'modification': 수정 작성)
   * @param {string} params.mediaType - 첨부 Media 타입 ('image': 이미지, 'video': 비디오)
   * @param {string} [params.postId] - 수정 작성 시 필요한 게시물 ID(feedSeq)
   */
  public openMediaRegistration(params: {
    postType: 'new' | 'modification';
    mediaType: 'image' | 'video';
    postId?: string;
  }): void {
    this.callNative('openMediaRegistration', params);
  }

  /**
   * 커뮤니티 Web 화면에서 메시지 Native 화면을 호출
   * @param {object} params - 메시지 화면 호출 파라미터
   * @param {string} params.userSeq - 이용자 구분번호
   * @param {string} params.targetUserSeq - 대화를 시작할 이용자 구분번호
   */
  public openChat(params: { targetUserSeq: string }): void {
    this.callNative('openChat', params);
  }

  /**
   * 커뮤니티 Web 화면에서 메시지 Native 화면을 호출
   * @param {object} params - 메시지 화면 호출 파라미터
   * @param {string} params.callbackId - callback function
   * processCallback 으로 callback할 function의 Id
   * @result {string} result - "{communityToken:"dfdf~", userSeq:1212, balsoToken:"sdfsdf" }"
   */
  public requestCommunityUserInfo(params: { callbackId: any }): void {
    this.callNative('requestCommunityUserInfo', params);
  }

  /**
   * Android HW Back 키 이벤트 처리
   * @static
   */
  public static processBack(): void {
    console.log('[WebViewBridge] Processing back event');
    if (typeof (window as any).processBack === 'function') {
      try {
        (window as any).processBack();
        console.log('[WebViewBridge] Back event processed successfully');
      } catch (error) {
        console.error('[WebViewBridge] Error processing back event:', error);
      }
    } else {
      console.warn('[WebViewBridge] processBack function not found');
    }
  }

  public static processCallback(args: any): void {
    console.log('[WebViewBridge] Processing callback:', args);
    const { callbackId, ...rest } = args;
    if (callbackId && typeof (window as any)[callbackId] === 'function') {
      (window as any)[callbackId](rest);
      delete (window as any)[callbackId];
    }
  }

  public static notifyKeboardStatus(value: string): void {
    if (typeof (window as any).notifyKeboardStatus === 'function') {
      (window as any).notifyKeboardStatus(value);
    }
  }

  public static sendResumeToWebView(value: string): void {
    if (typeof (window as any).onResume === 'function') {
      (window as any).onResume(value);
    }
  }

  public static funeasySendAnswer(data: string): void {
    if (typeof (window as any).funeasySendAnswer === 'function') {
      (window as any).funeasySendAnswer(data);
    }
  }

  public static funeasyGoback(): void {
    if (typeof (window as any).funeasyGoback === 'function') {
      (window as any).funeasyGoback();
    }
  }

  public static executeFuneasyCode(code: string): void {
    try {
      new Function(code)();
    } catch (error) {
      console.error('Error executing funeasy code:', error);
    }
  }
}
export default webviewbridge.getInstance();
