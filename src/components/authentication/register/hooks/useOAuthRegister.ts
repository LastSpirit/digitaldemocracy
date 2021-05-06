import { OAuthConfig } from '../../../../config';

export const useOAuthRegister = () => {
  const googleOAuth = (response) => {
    console.log(response);
  };

  const yandexOAuth = () => {
    fetch(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${OAuthConfig.secretID}`, {
      method: 'GET',
      redirect: 'follow',
    }).then((res) => {
      console.log(res);
      window.open(res.url);
    }).catch((err) => {
      console.log(err);
    }).then((res) => {
      console.log(res);
    });
    // getCodeYandexOAuth({
    //   payload: {
    //     client_id: OAuthConfig.secretID,
    //     response_type: 'token',
    //   },
    //   onError: (errorResponse) => console.log(errorResponse),
    //   onSuccess: (response) => {
    //     console.log(response);
    //     window.open(response.url);
    //   }
    // });
  };

  return { googleOAuth, yandexOAuth };
};
