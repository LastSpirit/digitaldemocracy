import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { User } from '../types/user';

interface RegisterRequest {
  code: string
  address: string
  email?: string
  phone?: string
  password?: string
  password_confirmation?: string
}

interface RegisterResponse {
  data: {
    user: User
    token: string
  }
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

interface RegisterErrorResponse {
  password?: Array<string>
  password_confirmation?: Array<string>
}

const checkValidateAddress: APIRequest<{ address: string }, { valid: boolean }> = (args) => callAPI({ url: 'checkUserAddress', ...args });

const sendCode: APIRequest<SendCodeRequest> = (args) => callAPI({ url: args.payload.email ? 'registrationViaEmail' : '/phone', ...args });

const verifyCode: APIRequest<VerifyCodeRequest, { token?: string }, { code: Array<string> }> = (args) => callAPI({ url: 'checkEmailConfirmationCode', ...args });

const register: APIRequest<RegisterRequest, RegisterResponse, RegisterErrorResponse> = (args) => callAPI({ url: 'setUserPassword', ...args });

// const getCodeYandexOAuth: APIRequest<GetCodeYandexRequest> = (args) => callAPI({ customBaseUrl: 'https://oauth.yandex.ru', url: '/authorize', config: { headers: { 'Content-Type': 'application/json' } }, ...args });

const getCodeYandexOAuth: APIRequest<GetCodeYandexRequest> = (args) => callAPI({ customBaseUrl: 'https://oauth.yandex.ru/', url: `authorize?response_type=${args.payload.response_type}&client_id=${args.payload.client_id}`, config: { method: 'GET' }, ...args });

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
