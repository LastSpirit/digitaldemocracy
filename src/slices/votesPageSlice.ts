import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface ElectionsI {
  data?: any;
}

const initialState: SliceState = {
  data: {} as ElectionsI,
};

interface SliceState {
  data: any;

}

export const votesPageSlice = createSlice({
  name: 'votesPageSlice',
  initialState,
  reducers: {
    setVotes(state: SliceState, action) {
      state.data = action.payload;
    },
    resetEctions(state: SliceState) {
      state = initialState;
    },
  }
});

export const electionsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...votesPageSlice.actions,
    },
    dispatch
  );
};
