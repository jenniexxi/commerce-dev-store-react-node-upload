import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { T } from '@commons';
import { Button } from '@components';

import useCleanParams from '@hooks/useCleanParams';

import crypto from '@utils/crypto';

import * as S from './OAuthRedirect.style';

const OAuthRedirect = () => {
  const { snsId = 'google' } = useParams<{ snsId: string }>();
  const [param] = useCleanParams();
  let scheme = `rround://onboarding/${snsId}?certification_token=`;

  let fallbackUrl = 'https://www.balso.io/#sec07';

  const openAppScheme = async () => {
    try {
      console.log('Opening app scheme:', createScheme());
      window.location.href = await createScheme();
    } catch (error) {
      console.error('Error opening app scheme:', error);
    } finally {
    }
  };

  const createScheme = async () => {
    const decToken = await crypto.decryptWithExtractedIV(param.get('accessToken')?.replaceAll(' ', '+') ?? '');

    return (scheme = scheme + decToken);
  };

  const openAppSchemeWithFallback = async () => {
    const triggerTime = new Date().getTime();
    const fallbackTimeout = 5000; // 1초 후 폴백 URL로 이동

    // 앱 스킴 실행 시도
    window.location.href = await createScheme();

    // 타임아웃 설정하여 폴백 URL로 이동
    setTimeout(() => {
      const now = new Date().getTime();
      if (now - triggerTime > fallbackTimeout + 100) {
        // 앱이 실행되었으므로 아무것도 하지 않음
        return;
      }
      // 앱이 실행되지 않았으므로 폴백 URL로 이동
      if (fallbackUrl) {
        window.location.href = fallbackUrl;
      }
    }, fallbackTimeout);
  };

  const handleClick = () => {
    if (fallbackUrl) {
      openAppSchemeWithFallback();
    } else {
      openAppScheme();
    }
  };

  // 컴포넌트가 마운트될 때 자동으로 앱 스킴 실행
  useEffect(() => {
    // 짧은 지연 후 앱 스킴 열기 (UI가 렌더링될 시간을 주기 위해)
    const timer = setTimeout(() => {
      if (fallbackUrl) {
        openAppSchemeWithFallback();
      } else {
        openAppScheme();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.OAuthContainer>
      <T.Headline2B $mb={100}>RRound 구글 소셜 로그인</T.Headline2B>
      <Button
        onClick={handleClick}
        title='로그인하기'
        width='100%'
        align='center'
      />
    </S.OAuthContainer>
  );
};

export default OAuthRedirect;
