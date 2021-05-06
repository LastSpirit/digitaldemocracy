import { OAuthConfig } from '../../../../config';
import { authAPI } from '../../../../api/authAPI';

export const useOAuthRegister = () => {
  const googleOAuth = (response) => {
    console.log(response);
  };

  const { getCodeYandexOAuth } = authAPI();

  const yandexOAuth = () => {
    // fetch(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${OAuthConfig.secretID}`, {
    //   mode: 'no-cors',
    //   method: 'GET',
    //   redirect: 'follow',
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
    getCodeYandexOAuth({
      payload: {
        client_id: OAuthConfig.secretID,
        response_type: 'code',
      },
      onError: (errorResponse) => console.log(errorResponse),
      onSuccess: (res) => console.log(res)
    });
  };

  return { googleOAuth, yandexOAuth };
};
