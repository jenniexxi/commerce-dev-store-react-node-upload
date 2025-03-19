import { Price } from '@apis/apiCommonType';

import { PX_TO_REM_RATIO } from '@constants/constants';

export const numberWithCommas = (v: number | string | null | undefined, n = 3, comma = ',') => {
  const num = typeof v === 'string' ? parseInt(v || '0', 10) : v;
  if (typeof num !== 'number' || isNaN(num) || num === 0 || num === null) {
    return '0';
  }
  let reg = new RegExp('(^[+-]?\\d+)(\\d{' + n + '})');
  let s = num.toFixed(0);
  while (reg.test(s)) {
    s = s.replace(reg, '$1' + comma + '$2');
  }
  return s;
};

export const formatStarRating = (v: number | string | null | undefined): string => {
  const num = typeof v === 'string' ? parseInt(v || '0', 10) : v;
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return '0.0'; // 기본값
  }

  // 소수점 첫째 자리까지 고정
  return num.toFixed(1);
};

export const pxToRem = (px?: number): string => {
  if (px) {
    return px / PX_TO_REM_RATIO + 'rem';
  } else {
    return '0rem';
  }
};

/**
 *
 * @param code : API 에서 주는 currencyCode 값
 * @returns : 화폐 통화로 변환
 */
export const currencyCodeToCurrency = (code?: string): string => {
  switch (code) {
    case 'KRW':
    default:
      return '원';
  }
};

export const showShippingPriceText = (priceItem?: Price): string => {
  if (!priceItem || !priceItem.number || !priceItem.currencyCode) {
    return '무료배송';
  }
  if (priceItem.number === 0) {
    return '무료배송';
  } else {
    return numberWithCommas(priceItem.number) + currencyCodeToCurrency(priceItem.currencyCode);
  }
};

export const showPriceText = (priceItem?: Price, isMinus = false): string => {
  if (!priceItem || !priceItem.number || !priceItem.currencyCode) {
    return '0원';
  }
  return (isMinus ? '-' : '') + numberWithCommas(priceItem.number) + currencyCodeToCurrency(priceItem.currencyCode);
};

export const showMileageText = (priceItem?: Price): string => {
  if (!priceItem || !priceItem.number || !priceItem.currencyCode) {
    return '0원';
  }
  return numberWithCommas(priceItem.number) + currencyCodeToCurrency(priceItem.currencyCode);
};

export const parseEscapeToHtml = (html?: string) => {
  if (!html) return '';

  let result = html.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', "'");

  // HTML 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(result, 'text/html');
  // 모든 img 태그 찾기
  const images = doc.getElementsByTagName('img');
  for (let img of images) {
    img.style.width = '100%';
    img.style.height = 'auto';
  }
  result = doc.body.innerHTML;

  return result;
};
