import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { AuthorDataI } from './authorSlice';
import { PoliticianInfoI } from './politicianSlice';
import { MassMediaDataI } from './massMediaSlice';

interface SubscriptionsState {
  authors?: Array<AuthorDataI>;
  politicians?: Array<PoliticianInfoI>;
  medias?: Array<MassMediaDataI>;
}

const initialState: SubscriptionsState = {
  authors: [],
  politicians: [],
  medias: [],
};

export const subscriptionsSlice = createSlice({
  name: '',
  initialState,
  reducers: {
    setAuthors(state: SubscriptionsState, actions: PayloadAction<Array<AuthorDataI>>) {
      state.authors = actions.payload;
    },
    setPoliticians(state: SubscriptionsState, actions: PayloadAction<Array<PoliticianInfoI>>) {
      state.politicians = actions.payload;
    },
    setMedias(state: SubscriptionsState, actions: PayloadAction<Array<MassMediaDataI>>) {
      state.medias = actions.payload;
    },
  }
});

interface Store {
  subscriptions: SubscriptionsState;
}

export const subscriptionsSelectors = {
  getAuthors: () => (state: Store) => state.subscriptions.authors,
  getPoliticians: () => (state: Store) => state.subscriptions.politicians,
  getMedias: () => (state: Store) => state.subscriptions.medias,
};

export const subscriptionsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...subscriptionsSlice.actions,
    },
    dispatch
  );
};
