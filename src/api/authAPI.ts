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

const checkValidateAddress: APIRequest<{ address: string }, { valid: boolean }> = (args) => callAPI({ url: '/posts', ...args });

const sendCode: APIRequest<{ email?: string, phone?: string }> = (args) => callAPI({ url: args.payload.email ? '/email' : '/phone', ...args });

const verifyCode: APIRequest<{ code: string }, { token?: string }> = (args) => callAPI({ url: '/code', ...args });

const register: APIRequest<RegisterRequest, RegisterResponse> = (args) => callAPI({ url: '/register', ...args });

const APIs = {
  checkValidateAddress,
  sendCode,
  verifyCode,
  register,
};

export const authAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
