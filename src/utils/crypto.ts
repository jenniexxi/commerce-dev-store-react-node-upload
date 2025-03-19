// AesGcmCrypto.ts
// WebCrypto API를 사용한 AES-GCM 암호화/복호화 모듈

// 기본 암호화 키
const DEFAULT_KEY = 'A4qR8tY6kD1sZ9vW5oB3iM7nF2jX0L7p';

// GCM 모드에 관련된 상수
const IV_LENGTH = 12; // 권장 IV 길이 (바이트)
const TAG_LENGTH = 128; // 인증 태그 길이 (비트)

/**
 * Base64 문자열을 Uint8Array로 변환
 */
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

/**
 * Uint8Array를 Base64 문자열로 변환
 */
const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  const binaryString = Array.from(uint8Array)
    .map((byte) => String.fromCharCode(byte))
    .join('');
  return btoa(binaryString);
};

/**
 * 문자열을 Uint8Array로 변환 (UTF-8 인코딩)
 */
const stringToUint8Array = (str: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

/**
 * Uint8Array를 문자열로 변환 (UTF-8 디코딩)
 */
const uint8ArrayToString = (uint8Array: Uint8Array): string => {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(uint8Array);
};

/**
 * 랜덤 IV 생성 (12바이트)
 */
const generateRandomIV = (): Uint8Array => {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
};

/**
 * 문자열 키를 CryptoKey 객체로 변환
 */
const importKey = async (keyString: string): Promise<CryptoKey> => {
  const keyBytes = stringToUint8Array(keyString);
  return await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM', length: keyBytes.length * 8 }, false, [
    'encrypt',
    'decrypt',
  ]);
};

/**
 * AES-GCM 암호화
 * 1. 랜덤 12바이트 IV 생성
 * 2. 데이터 암호화
 * 3. IV + 암호화된 데이터 결합 후 Base64 인코딩
 */
const encrypt = async (data: string | object, keyString: string = DEFAULT_KEY): Promise<string> => {
  try {
    // 평문 데이터 준비
    let plaintext: Uint8Array;
    if (typeof data === 'object') {
      plaintext = stringToUint8Array(JSON.stringify(data));
    } else {
      plaintext = stringToUint8Array(String(data));
    }

    // 키 가져오기
    const key = await importKey(keyString);

    // 랜덤 IV 생성
    const iv = generateRandomIV();

    // 암호화
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: TAG_LENGTH,
      },
      key,
      plaintext,
    );

    // IV와 암호화된 데이터 결합
    const combined = new Uint8Array(iv.length + new Uint8Array(encryptedData).length);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedData), iv.length);

    // Base64 인코딩
    return uint8ArrayToBase64(combined);
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

/**
 * AES-GCM 복호화
 * 1. Base64 디코딩
 * 2. 앞 12바이트를 IV로 추출
 * 3. 나머지 바이트를 암호화된 데이터로 사용
 * 4. 복호화 수행
 */
const decrypt = async (
  encryptedBase64: string,
  keyString: string = DEFAULT_KEY,
  isJSON: boolean = false,
): Promise<string | object> => {
  try {
    // Base64 디코딩

    const combined = base64ToUint8Array(encryptedBase64);

    // IV 추출 (앞 12바이트)
    const iv = combined.slice(0, IV_LENGTH);

    // 암호화된 데이터 추출 (나머지 바이트)
    const encryptedData = combined.slice(IV_LENGTH);

    // 키 가져오기
    const key = await importKey(keyString);

    // 복호화
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: TAG_LENGTH,
      },
      key,
      encryptedData,
    );

    // 결과를 문자열로 변환
    const decryptedString = uint8ArrayToString(new Uint8Array(decryptedBuffer));

    // JSON 처리
    if (isJSON && decryptedString) {
      if (decryptedString.startsWith('{') || decryptedString.startsWith('[')) {
        try {
          return JSON.parse(decryptedString);
        } catch (e) {
          console.warn('JSON parsing failed, returning string');
          return decryptedString;
        }
      }
    }

    return decryptedString;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

/**
 * Base64로 인코딩된 암호화 데이터에서 IV를 추출하고 복호화
 */
const decryptWithExtractedIV = async (
  encryptedBase64: string,
  keyString: string = DEFAULT_KEY,
  isJSON: boolean = false,
): Promise<string | object> => {
  return decrypt(encryptedBase64, keyString, isJSON);
};

// 모듈로 내보내기
export default {
  encrypt,
  decrypt,
  decryptWithExtractedIV,
  // 유틸리티 함수도 필요하면 내보낼 수 있음
  base64ToUint8Array,
  uint8ArrayToBase64,
  stringToUint8Array,
  uint8ArrayToString,
  generateRandomIV,
};
