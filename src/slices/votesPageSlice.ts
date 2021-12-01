import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface ElectionsI {
  data?: any;
}

interface userElectionsI{
  userElections?: any;
}

interface dataElelctionsI {
  dataElelctions?: any;
}

const initialState: SliceState = {
  data: {} as ElectionsI,
  userElections: {} as userElectionsI,
  dataElelctions: {} as dataElelctionsI,
};

interface SliceState {
  data: any,
  userElections:any,
  dataElelctions:any,

}

export const votesPageSlice = createSlice({
  name: 'votesPageSlice',
  initialState,
  reducers: {
    setVotes(state: SliceState, action) {
      state.data = action.payload;
    },
    setdataElelctions(state: SliceState, action) {
      state.dataElelctions = action.payload;
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
  getDataElections: () => (state: Store) => state.votes.dataElelctions,
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
