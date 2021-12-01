import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface ElectionsI {
  data?: any;
}

interface userElectionsI{
  userElections?: any;
}

const initialState: SliceState = {
  data: {} as ElectionsI,
  userElections: {} as userElectionsI,
};

interface SliceState {
  data: any,
  userElections:any,

}

export const votesPageSlice = createSlice({
  name: 'votesPageSlice',
  initialState,
  reducers: {
    setVotes(state: SliceState, action) {
      state.data = action.payload;
    },
    setUserElections(state: SliceState, action) {
      state.userElections = action.payload;
    },
    resetEctions(state: SliceState) {
      state = initialState;
    },
  }
});
interface Store {
  votes: SliceState;
}
export const votesSelectors = {
  getVotes: () => (state: Store) => state.votes.data,
  getUserVotes: () => (state: Store) => state.votes.userElections,
};

export const electionsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...votesPageSlice.actions,
    },
    dispatch
  );
};
