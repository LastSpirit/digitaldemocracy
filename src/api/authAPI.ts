import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface RegisterRequest {
  address: string
  email?: string
  phone?: string
  password?: string
}

interface RegisterResponse {
  token: string
}

interface SendCodeRequest {
  address: string
  email?: string
  phone?: string
}

interface VerifyCodeRequest {
  code: string
  email?: string
}

interface GetCodeYandexRequest {
  response_type: string
  client_id: string
}

const checkValidateAddress: APIRequest<{ address: string }, { valid: boolean }> = (args) => callAPI({ url: 'checkUserAddress', ...args });

const sendCode: APIRequest<SendCodeRequest> = (args) => callAPI({ url: args.payload.email ? 'registrationViaEmail' : '/phone', ...args });

const verifyCode: APIRequest<VerifyCodeRequest, { token?: string }> = (args) => callAPI({ url: 'checkEmailConfirmationCode', ...args });

const register: APIRequest<RegisterRequest, RegisterResponse> = (args) => callAPI({ url: '/register', ...args });

const getCodeYandexOAuth: APIRequest<GetCodeYandexRequest> = (args) => callAPI({ customBaseUrl: 'https://oauth.yandex.ru', url: '/authorize', config: { headers: { 'Content-Type': 'application/json' } }, ...args });

const APIs = {
  checkValidateAddress,
  sendCode,
  verifyCode,
  register,
  getCodeYandexOAuth,
};

export const authAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
