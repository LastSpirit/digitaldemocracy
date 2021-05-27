import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { User } from '../types/user';
import { removeItem } from '../lib/localStorageManager';
import { NewsI } from './homeSlice';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface HistoryNewsI {
  views: Array<{ dateView: string; news: Array<NewsI> }>
  isMorePages?: boolean
}

interface SliceState {
  data: User
  isAuthenticated?: boolean
  browsingHistory?: {
    data?: HistoryNewsI
    page: number
  }
  fetchUserDataStatus: APIStatus
}

const initialState: SliceState = {
  data: {},
  browsingHistory: {
    page: 1,
    data: {
      views: [],
    }
  },
  fetchUserDataStatus: 'Initial' as APIStatus
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state: SliceState, action: PayloadAction<User>) {
      state.data = action.payload;
      state.fetchUserDataStatus = APIStatus.Success;
    },
    setIsAuthenticated(state: SliceState, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setBrowsingHistory(state: SliceState, action: PayloadAction<{ data: HistoryNewsI, page: number }>) {
      state.browsingHistory.data.isMorePages = action.payload.data.isMorePages;
      state.browsingHistory.data.views = [...(state.browsingHistory.data.views || []), ...action.payload.data.views];
      state.browsingHistory.page = action.payload.page || 1;
    },
    resetNews(state: SliceState) {
      state.browsingHistory.page = 1;
      state.browsingHistory.data.views = [];
    },
    logout(state: SliceState) {
      state.isAuthenticated = false;
      state.data = {};
      removeItem('token');
    },
    resetStatus(state: SliceState) {
      state.fetchUserDataStatus = APIStatus.Initial;
    }
  }
});

interface Store {
  user: SliceState
}

export const userSelectors = {
  getUser: () => (state: Store) => state.user.data,
  getStatus: () => (state: Store) => state.user.fetchUserDataStatus,
  getIsAuthenticated: () => (state: Store) => state.user.isAuthenticated,
  getBrowsingHistory: () => (state: Store) => state.user.browsingHistory,
};

export const userActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...userSlice.actions
  }, dispatch);
};
