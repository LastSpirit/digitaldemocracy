import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { User } from '../types/user';

interface SliceState {
  data: User
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
    }
  }
});

interface Store {
  user: SliceState
}

export const userSelectors = {
  getUser: () => (state: Store) => state.user.data
};

export const userActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...userSlice.actions
  }, dispatch);
};
