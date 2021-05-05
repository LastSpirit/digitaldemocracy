import { authAPI } from '../../../../api/authAPI';
import { OAuthConfig } from '../../../../config';

export const useOAuthRegister = () => {
  const { getCodeYandexOAuth } = authAPI();
  const googleOAuth = (response) => {
    console.log(response);
  };

  const yandexOAuth = () => {
    getCodeYandexOAuth({
      payload: {
        client_id: OAuthConfig.password,
        response_type: 'code',
      },
      onError: (errorResponse) => console.log(errorResponse),
      onSuccess: (res) => console.log(res)
    });
  };

  return { googleOAuth, yandexOAuth };
};
