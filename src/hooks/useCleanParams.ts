import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

const useCleanParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cleanedParams, setCleanedParams] = useState(new URLSearchParams(searchParams));

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;

    // iOS WebView 파라미터 정제
    for (const [key, value] of params.entries()) {
      if (value.match(/\?[nN]$/)) {
        params.set(key, value.slice(0, -2));
        hasChanges = true;
      }
    }

    // pathname 끝에 있는 ?n 또는 ?N 제거
    const url = new URL(window.location.href);
    if (url.pathname.match(/\?[nN]$/)) {
      url.pathname = url.pathname.slice(0, -2);
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(params, { replace: true });
    }
    setCleanedParams(params);
  }, [searchParams, setSearchParams]);

  return [cleanedParams, setSearchParams] as const;
};
export default useCleanParams;
