import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  data?: any;
}

const initialState: SliceState = {
  data: {},
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfileInfo(state: SliceState, action) {
      state.data = action.payload;
    },
  },
});

export interface Store {
  profile: SliceState;
}

export const profileActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...profileSlice.actions,
    },
    dispatch
  );
};
