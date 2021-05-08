import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { User } from '../types/user';
import { removeItem } from '../lib/localStorageManager';

interface SliceState {
  data: User
  isAuthenticated?: boolean
}

const initialState: SliceState = {
  data: {}
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state: SliceState, action: PayloadAction<User>) {
      state.data = action.payload;
    },
    setIsAuthenticated(state: SliceState, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    logout(state: SliceState) {
      state.isAuthenticated = false;
      state.data = {};
      removeItem('token');
    }
  }
});

interface Store {
  user: SliceState
}

export const userSelectors = {
  getUser: () => (state: Store) => state.user.data,
  getIsAuthenticated: () => (state: Store) => state.user.isAuthenticated
};

export const userActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...userSlice.actions
  }, dispatch);
};
