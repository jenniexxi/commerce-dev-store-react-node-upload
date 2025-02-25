import { AVAILABLE_INFO_FAIL_CODES } from '@type';

import messages from '@apis/message';
import { CheckAvailable, ShoppigCartErrorData } from '@apis/shoppingCartApi';

export const parseAlertMessage = (alertCode: string, messageData?: object): string => {
  if (typeof messageData === 'object') {
    Object.entries(messageData).forEach(([key, value]) => {
      alertCode = alertCode.replaceAll(`{${key}}`, value);
    });
  }
  return alertCode;
};

const cartAvailablePurchaseErrorHandler = (data: CheckAvailable[]): string => {
  let alertMessage = '';
  if (data) {
    const response = data;

    let canAdultAuth = false;

    //구매가능실패
    const failItem = response?.[0] ?? null; //첫번째 오류 상품 기준
    if (!failItem) return alertMessage;

    //구매가능실패 에러코드
    const errorCode = failItem.buyAvailableEnum?.code;

    if (AVAILABLE_INFO_FAIL_CODES.REQUEST_ADULT_CERTIFICATION === errorCode) {
      if (!canAdultAuth) canAdultAuth = true;
    }

    /**
     * 해당 조건에 해당하는 alert은 상품단위로 실행. 복수개일 경우 각 상품별로 단계별 alert 실행)
     * 유효성 검증 alert 순서는 1 2 3 4 5 이기때문에 순서 뒤에서부터 체크
     */
    switch (errorCode) {
      /** 5: 1회 최대구매수량보다 구매수량이 많은 경우(회원, 비회원 동일) */
      case AVAILABLE_INFO_FAIL_CODES.MAX_BUY_CNT_EXCESS:
        alertMessage = parseAlertMessage(messages.Alert224, {
          N: failItem.maxBuyCnt ?? '0',
          goodsName: failItem.goodsName ?? '',
        });

        break;

      /** 4-1: 1인 최대구매수량보다 구매수량이 많은 경우 (회원) */
      case AVAILABLE_INFO_FAIL_CODES.BUY_MAX_BUY_CNT_EXCESS:
        alertMessage = parseAlertMessage(messages.Alert223, {
          N: failItem.buyerMaxBuyCnt ?? '0',
          nowBuyCnt: failItem.nowBuyCnt ?? '0',
          goodsName: failItem.goodsName ?? '',
        });
        break;

      /** 4-2: 1인 최대구매수량보다 구매수량이 많은 경우 (비회원) */
      //NOTI: Alert106에서 235로 변경되었습니다.
      case AVAILABLE_INFO_FAIL_CODES.NON_BUYER_BUY_MAX_BUY_CNT_CONDITION:
        alertMessage = parseAlertMessage(messages.Alert235, {
          goodsName: failItem.goodsName ?? '',
        });
        break;

      /** 3: 최소구매수량보다 구매수량이 적은 경우 */
      case AVAILABLE_INFO_FAIL_CODES.MIN_BUY_CNT_EXCESS:
        alertMessage = parseAlertMessage(messages.Alert222, {
          N: failItem.minBuyCnt ?? '0',
          goodsName: failItem.goodsName ?? '',
        });
        break;

      //NOTI: 옵션별, 추가상품 재고 체크 alert 추가되었습니다.
      /** 2-1: 일반상품: 재고보다 구매수량 많은 경우 */
      case AVAILABLE_INFO_FAIL_CODES.SALE_STOCK_LACK:
        alertMessage = parseAlertMessage(messages.Alert232, {
          N: failItem.saleStock ?? '0',
          goodsName: failItem.goodsName ?? '',
          optionName: failItem.goodsOption ? ` ${failItem.goodsOption}` : '',
        });
        break;

      /** 2-2: 추가상품: 재고보다 구매수량 많은 경우 */
      case AVAILABLE_INFO_FAIL_CODES.ADD_SALE_STOCK_LACK:
        alertMessage = parseAlertMessage(messages.Alert233, {
          N: failItem.saleStock ?? '0',
          addItemName: failItem.addGoodsOption ?? '',
        });
        break;

      /** 1: 판매불가상태 */
      case AVAILABLE_INFO_FAIL_CODES.NOT_GOODS_SALE_STATUS:
        alertMessage = parseAlertMessage(messages.Alert115);

        break;
      /** 1: 옵션 미선택 */
      case AVAILABLE_INFO_FAIL_CODES.IS_OPTION_SELECT:
        alertMessage = parseAlertMessage(messages.Alert56);
        break;

      default:
        break;
    }

    //알럿메세지 필요한 경우에만 노출

    if (canAdultAuth) {
      // appIdentityVerification.open({
      //   title: '연령인증',
      //   type: 'adult',
      // });
    }
  }
  return alertMessage;
};

export const availablePurchaseErrorHandler = (
  failData: CheckAvailable[],
  refresh?: () => void,
  callback?: () => void,
): string => {
  if (failData.length) {
    //구매가능실패
    for (const failItem of failData) {
      const errorCode = failItem.buyAvailableEnum?.code;

      // NOTI: QA요청: 아래 케이스에서는 각 Alert이후 새로고침처리 (변경 전) >> CART 전체 정보 다시 불러오는 것으로 협의 (변경 후)
      switch (errorCode) {
        case AVAILABLE_INFO_FAIL_CODES.MAX_BUY_CNT_EXCESS: // 1회 최대구매수량보다 구매수량이 많은 경우(회원, 비회원 동일)
        case AVAILABLE_INFO_FAIL_CODES.BUY_MAX_BUY_CNT_EXCESS: // 1인 최대구매수량보다 구매수량이 많은 경우 (회원)
        case AVAILABLE_INFO_FAIL_CODES.MIN_BUY_CNT_EXCESS: // 최소구매수량보다 구매수량이 적은 경우
        case AVAILABLE_INFO_FAIL_CODES.NOT_GOODS_SALE_STATUS: // 판매불가상태
        case AVAILABLE_INFO_FAIL_CODES.SALE_STOCK_LACK: // 상품옵션별: 재고보다 구매수량 많은 경우
        case AVAILABLE_INFO_FAIL_CODES.ADD_SALE_STOCK_LACK: // 추가상품: 재고보다 구매수량 많은 경우
          refresh && refresh();
          break;
      }
    }
    callback && callback();
    /**
     * 공통 알럿메세지처리
     */
    return cartAvailablePurchaseErrorHandler(failData);
  } else {
    return '';
  }
};

export const shoppingCartErrorMsg = (errorData: ShoppigCartErrorData): string => {
  switch (errorData.buyAvailableEnum?.code) {
    /** 최소 구매수량 미만 */
    case AVAILABLE_INFO_FAIL_CODES.MIN_BUY_CNT_EXCESS:
      return parseAlertMessage(messages.Alert103, { N: errorData.minBuyCnt });

    /** 판매가능 재고 보다 부족한 경우 - 재고수량보다 많은 수량 입력 */
    case AVAILABLE_INFO_FAIL_CODES.SALE_STOCK_LACK:
      return parseAlertMessage(messages.Alert104, { N: errorData.maxBuyCnt });

    /** 1인 최대 구매수량 초과 */
    case AVAILABLE_INFO_FAIL_CODES.BUY_MAX_BUY_CNT_EXCESS:
      return parseAlertMessage(messages.Alert102, { N: errorData.buyerMaxBuyCnt, ...errorData });

    /** 1회 최대 구매수량 초과 */
    case AVAILABLE_INFO_FAIL_CODES.MAX_BUY_CNT_EXCESS:
      return parseAlertMessage(messages.Alert203, { N: errorData.maxBuyCnt });

    /** 상품 판매 불가 상태 - 추가상품이 판매중이 아닌경우*/
    case AVAILABLE_INFO_FAIL_CODES.NOT_GOODS_SALE_STATUS:
      return messages.Confirm100;

    /** 추가상품 판매가능 재고 보다 부족한 경우 - 구매하기 버튼 선택시 주문가능한 수량 초과한 추가상품이 있을경우*/
    case AVAILABLE_INFO_FAIL_CODES.ADD_SALE_STOCK_LACK:
      return parseAlertMessage(messages.Alert104, { N: errorData.maxBuyCnt });

    default:
      break;
  }

  return '';
};
