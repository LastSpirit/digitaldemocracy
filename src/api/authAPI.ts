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

export interface SendCodeErrorResponse {
  phone?: Array<string>
  email?: Array<string>
}

interface RegisterViaPhoneRequest {
  phone: string
  FirebaseToken: string
}

interface RegisterViaPhoneErrorResponse {
  phone: Array<string>
  FirebaseToken: Array<string>
}

interface GetYandexUserInfoRequest {
  format: 'json' | 'xml'
  with_openid_identity: boolean
  oauth_token: string
}

interface RegisterViaGoogleRequest {
  accessToken: string
  profileObj: {
    name: string
    email: string
    imageUrl: string
  }
  googleId: string
  address?: string
}

interface RegisterViaGoogleErrorResponse {
  address: Array<string>
  googleId: Array<string>
}

interface LoginViaPhoneResponse {
  user: User
  token: string
}

const checkValidateAddress: APIRequest<{ address: string }, { valid: boolean }> = (args) => callAPI({ url: 'checkUserAddress', ...args });

const checkValidateEmail:APIRequest<{ email: string }, string, { email: Array<string> | string }> = (args) => callAPI({ url: 'checkEmail', ...args });

const checkValidateEmailLogin:APIRequest<{ email: string }, string, { email: Array<string> | string }> = (args) => callAPI({ url: 'checkEmailForLogin', ...args });

const checkValidatePhone:APIRequest<{ phone: string }, string, { phone: Array<string> | string }> = (args) => callAPI({ url: 'checkPhone', ...args });

const checkValidatePhoneLogin:APIRequest<{ phone: string }, string, { phone: Array<string> | string }> = (args) => callAPI({ url: 'checkPhoneForLogin ', ...args });

const sendCode: APIRequest<SendCodeRequest, {}> = (args) => callAPI({ url: args.payload.email ? 'registrationViaEmail' : 'registrationViaPhone', ...args });

const verifyCode: APIRequest<VerifyCodeRequest, { token?: string }, { code: Array<string> }> = (args) => callAPI({ url: 'checkEmailConfirmationCode', ...args });

const register: APIRequest<RegisterRequest, RegisterResponse, RegisterErrorResponse> = (args) => callAPI({ url: 'setUserPassword', ...args });

const registerViaPhone: APIRequest<RegisterViaPhoneRequest, {}, RegisterViaPhoneErrorResponse | string> = (args) => callAPI({ url: 'checkPhoneConfirmationToken', ...args });

const registerViaGoogle: APIRequest<RegisterViaGoogleRequest, LoginViaPhoneResponse, RegisterViaGoogleErrorResponse> = (args) => callAPI({ url: 'registrationViaGoogle', ...args });

const getCodeYandexOAuth: APIRequest<GetCodeYandexRequest, Response> = (args) => callAPI({ customBaseUrl: 'https://oauth.yandex.ru/', url: `authorize?response_type=${args.payload.response_type}&client_id=${args.payload.client_id}`, config: { method: 'GET' }, ...args });

const getYandexUserInfo: APIRequest<GetYandexUserInfoRequest> = (args) => callAPI({ customBaseUrl: 'https://login.yandex.ru/', url: `/info?format=${args.payload.format}&with_openid_identity=${args.payload.with_openid_identity}&oauth_token=${args.payload.oauth_token}`, nestedResponseType: false, ...args });

const authViaGoogle: APIRequest<RegisterViaGoogleRequest, LoginViaPhoneResponse, RegisterViaGoogleErrorResponse> = (args) => callAPI({ url: 'login/google', ...args });

const authViaEmailConfirmPassword: APIRequest<{ password: string, email: string }, RegisterResponse, { password: Array<string>, email: Array<string> }> = (args) => callAPI({ url: 'login/email', ...args });

const loginViaPhone: APIRequest<RegisterViaPhoneRequest, LoginViaPhoneResponse, RegisterViaPhoneErrorResponse | string> = (args) => callAPI({ url: 'login/phone', ...args });

const APIs = {
  checkValidateAddress,
  sendCode,
  verifyCode,
  register,
  getCodeYandexOAuth,
  registerViaPhone,
  getYandexUserInfo,
  registerViaGoogle,
  authViaGoogle,
  authViaEmailConfirmPassword,
  loginViaPhone,
  checkValidateEmail,
  checkValidatePhone,
  checkValidateEmailLogin,
  checkValidatePhoneLogin,
};

export const authAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
