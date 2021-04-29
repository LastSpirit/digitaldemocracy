import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export enum AuthType {
  Phone = 'Phone',
  Email = 'Email'
}

interface SliceState {
  registerStep?: number
  loginStep?: number
  authType?: AuthType
  rememberMe?: boolean
  authUserData?: {
    address?: string
    phone?: string
    email?: string
    password?: string
  }
}

const initialState: SliceState = {
  registerStep: 1,
  loginStep: 1,
  rememberMe: true
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRegisterStep(state: SliceState, action: PayloadAction<number>) {
      state.registerStep = action.payload;
    },
    setLoginStep(state: SliceState, action: PayloadAction<number>) {
      state.loginStep = action.payload;
    },
    setAuthType(state: SliceState, action: PayloadAction<AuthType>) {
      state.authType = action.payload;
    },
    setRememberMe(state: SliceState, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
    setAuthUserData(state: SliceState, action: PayloadAction<{ key: string, value: string }>) {
      state.authUserData[action.payload.key] = action.payload.value;
    }
  }
});

export interface Store {
  auth: SliceState
}

export const authSelectors = {
  getRegisterStep: () => (state: Store) => state.auth.registerStep,
  getLoginStep: () => (state: Store) => state.auth.loginStep,
  getAuthType: () => (state: Store) => state.auth.authType,
  getRememberMe: () => (state: Store) => state.auth.rememberMe,
  getUserData: () => (state: Store) => state.auth.authUserData,
  getAllData: () => (state: Store) => ({
    ...state.auth
  })
};

export const authActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...authSlice.actions
  }, dispatch);
};
