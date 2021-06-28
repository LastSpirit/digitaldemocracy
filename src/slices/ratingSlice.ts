import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PoliticianInfoI } from './politicianSlice';
import { AuthorDataI } from './authorSlice';
import { MassMediaDataI } from './massMediaSlice';

interface PoliticiansI {
  politicians?: Array<PoliticianInfoI>;
  isMorePages?: boolean;
}

interface AuthorsI {
  authors?: Array<AuthorDataI>;
  isMorePages?: boolean;
}

interface MediaI {
  media?: Array<MassMediaDataI>;
  isMorePages?: boolean;
}

interface SliceState {
  sort_direction?: string;
  sort_field?: string;
  politicians?: PoliticiansI;
  massMedia?: any;
  authors?: AuthorsI;
  party?: any;
}

const initialState: SliceState = {
  sort_direction: '',
  sort_field: '',
  politicians: {} as PoliticiansI,
  massMedia: {} as MediaI,
  authors: {} as AuthorsI,
  party: [],
};

export const ratingSlice = createSlice({
  name: 'ratingSlice',
  initialState,
  reducers: {
    setPoliticians(state: SliceState, action: PayloadAction<PoliticiansI>) {
      state.politicians = action.payload;
    },
    setAuthors(state: SliceState, action: PayloadAction<AuthorsI>) {
      state.authors = action.payload;
    },
    setMedia(state: SliceState, action: PayloadAction<MediaI>) {
      state.massMedia = action.payload;
    },
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
    setIsSubscribePoliticians(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.politicians.politicians.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
    setIsSubscribeAuthors(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.authors.authors.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
    setIsSubscribeMedia(state: SliceState, action) {
      const { id, isSubscribe } = action.payload;
      state.massMedia.media.find((item) => item.id === id).is_subscribed = !isSubscribe;
    },
  },
});

interface Store {
  rating: SliceState;
}

export const ratingSelectors = {
  getPoliticians: () => (state: Store) => state.rating.politicians,
};

export const ratingActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ratingSlice.actions,
    },
    dispatch
  );
};
