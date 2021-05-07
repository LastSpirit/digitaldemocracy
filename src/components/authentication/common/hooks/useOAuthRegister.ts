import { useSelector } from 'react-redux';
import { useState } from 'react';
import { OAuthConfig } from '../../../../config';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators, authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';

export const useOAuthRegister = () => {
  const { registerViaGoogle } = authAPI();
  const { address } = useSelector(authSelectors.getUserData());
  const { setRegisterStep } = authActionCreators();
  const [googleError, setGoogleError] = useState<string>();
  const [yandexError, setYandexError] = useState<string>();
  const googleOAuth = (response) => {
    registerViaGoogle({
      onSuccess: (res) => {
        setItem('token', res);
        setRegisterStep(5);
      },
      onError: (errorResponse) => {
        setGoogleError(errorResponse.address ? errorResponse.address[0] : errorResponse.googleId[0]);
      },
      payload: {
        ...response,
        address,
      }
    });
  };

  const yandexOAuth = () => {
    fetch(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${OAuthConfig.yandexSecretID}`, {
      method: 'GET',
      redirect: 'follow',
    }).then((res) => {
      console.log(res);
      window.open(res.url);
    }).catch((err) => {
      setYandexError(err.toString());
    }).then((res) => {
      console.log(res);
    });
  };

  return { googleOAuth, yandexOAuth, googleError, yandexError };
};
