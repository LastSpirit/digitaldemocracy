import React, { useEffect, useState } from 'react';
// import YandexHiddenFrame from './YandexHiddenFrame';
import { authAPI } from '../../../../api/authAPI';

function checkAccessKey() {
  const parts = window.location.href.split('#');
  const queryPartUrl = parts.length > 1 && parts[1] !== 'frame' ? parts[1] : null;
  if (!queryPartUrl) {
    return null;
  }
  const result = {};
  queryPartUrl.split('&').forEach((part) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function getYandexAuthUrl(clientID, redirectUrl) {
  let requestUrl = `https://oauth.yandex.ru/authorize?response_type=token&force_confirm=1&client_id=${clientID}`;
  requestUrl += `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  requestUrl += '&display=popup';
  return requestUrl;
}

function getCurrentUrl(redirectUri) {
  // let currentUrl = window.location.origin;
  let currentUrl = redirectUri;
  if (currentUrl[currentUrl.length - 1] === '/') {
    currentUrl = currentUrl.slice(0, currentUrl.length - 1);
  }
  return currentUrl;
}

// { onSuccess, clientID }
function YandexLogin({ onSuccess, clientID, children, redirectUri }) {
  const [userYaData, setUserYaData] = useState(null);
  const { getYandexUserInfo } = authAPI();
  const handleMessageFromPopup = (event) => {
    if (event.data.source === 'yandex-login') {
      onSuccess(event.data.payload);
    }
  };

  const getUser = (yaToken) => getYandexUserInfo({
    onSuccess: (res) => {
      console.log(res);
      setUserYaData({ ...res, accessToken: yaToken });
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    payload: { format: 'json', oauth_token: yaToken }
  });

  const onClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    sessionStorage.setItem('yandexAutoLoginDisabled', 'false');
    const currentUrl = getCurrentUrl(redirectUri);
    const requestUrl = getYandexAuthUrl(clientID, currentUrl);

    const h = 650;
    const w = 550;
    const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
    window.open(requestUrl, 'popup', `width=${w},height=${h},top=${y},left=${x}`);

    window.addEventListener('message', handleMessageFromPopup, { once: true });
  };

  // let frameRedirectTo = null;

  const aki = checkAccessKey();
  const receiver = window.parent !== window
    ? window.parent
    : window.opener;

  if (aki && !userYaData) {
    // @ts-ignore
    getUser(aki.access_token);
  }

  useEffect(() => {
    console.log(aki);
    console.log(userYaData);
    if (aki && receiver && userYaData) {
      receiver.postMessage({
        source: 'yandex-login',
        // payload: aki
        payload: userYaData
      }, window.location.origin);

      window.close();
    }

    /*
    if (!aki && !receiver && !userYaData) {
      const autoLoginDisabled = sessionStorage.getItem('yandexAutoLoginDisabled');

      frameRedirectTo = autoLoginDisabled !== 'true'
        ? getYandexAuthUrl(clientID, getCurrentUrl(redirectUri))
        : null;

      window.addEventListener('message', handleMessageFromPopup, { once: false });
    } */
  }, [aki, userYaData]);

  // {frameRedirectTo && <YandexHiddenFrame redirectTo={frameRedirectTo} />}
  return (
    <div>
      { React.cloneElement(children, { onClick }) }
    </div>
  );
}

export default React.memo(YandexLogin);
