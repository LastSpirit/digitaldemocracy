import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { OAuthConfig } from '../../../../config';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators, authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { userActionCreators } from '../../../../slices/userSlice';

export const useOAuthRegister = (isLogin?: boolean) => {
  const { registerViaGoogle, authViaGoogle } = authAPI();
  const { address, countryId, city_id, country_id, region_id } = useSelector(authSelectors.getUserData());
  const { registerStep, loginStep } = useSelector(authSelectors.getSteps());
  const { setRegisterStep, setLoginStep } = authActionCreators();
  const { setIsAuthenticated, setUser } = userActionCreators();
  const [googleError, setGoogleError] = useState<string>();
  const [yandexError, setYandexError] = useState<string>();

  useEffect(() => {
    setGoogleError(undefined);
    setYandexError(undefined);
  }, [registerStep, loginStep]);

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const api = isLogin ? authViaGoogle : registerViaGoogle;

  const googleOAuth = (response) => {
    api({
      onSuccess: (res) => {
        setItem('token', res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        if (isLogin) {
          setLoginStep(1);
          setAuthValue(undefined);
        } else {
          setRegisterStep(5);
        }
      },
      onError: (errorResponse) => {
        setGoogleError(errorResponse.address ? errorResponse.address[0] : errorResponse.googleId[0]);
      },
      payload: {
        ...response,
        country_id,
        region_id,
        city_id,
      },
    });
  };

  const yandexOAuth = () => {
    return `https://oauth.yandex.ru/authorize?response_type=token&client_id=${OAuthConfig.yandexSecretID}&redirect_uri=${window.location.href}`;
    /*
    const mainWindowWidth = window.screen.width;
    const mainWindowHeight = window.screen.height;

    const newWindowWidth = 400;
    const newWindowHeight = 500;
    const newWindowLeft = (mainWindowWidth - newWindowWidth) / 2;
    const newWindowTop = (mainWindowHeight - newWindowHeight) / 2;

    const link = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${OAuthConfig.yandexSecretID}&redirect_uri=${window.location.href}`;
    return window.open(link, 'yandexAuth', `width=${newWindowWidth},height=${newWindowHeight},left=${newWindowLeft},top=${newWindowTop}`);
    */
    /*
    fetch(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${OAuthConfig.yandexSecretID}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((res) => {
        console.log(res);
        window.open(res.url);
      })
      .catch((err) => {
        setYandexError(err.toString());
      })
      .then((res) => {
        console.log(res);
      });
     */
  };

  return { googleOAuth, yandexOAuth, googleError, yandexError };
};
