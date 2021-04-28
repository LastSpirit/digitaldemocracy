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
}

const initialState: SliceState = {
  registerStep: 1,
  loginStep: 1,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRegisterStep(state, actions: PayloadAction<number>) {
      state.registerStep = actions.payload;
    },
    setLoginStep(state, actions: PayloadAction<number>) {
      state.loginStep = actions.payload;
    },
    setAuthType(state, actions: PayloadAction<AuthType>) {
      state.authType = actions.payload;
    },
  }
});

export interface Store {
  auth: SliceState
}

export const authSelectors = {
  getRegisterStep: () => (state: Store) => state.auth.registerStep,
  getLoginStep: () => (state: Store) => state.auth.loginStep,
  getAuthType: () => (state: Store) => state.auth.authType,
};

export const authActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...authSlice.actions
  }, dispatch);
};
