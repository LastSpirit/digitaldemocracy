import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PoliticianInfoI, PartyI } from './politicianSlice';
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

interface PartiesI {
  parties: Array<PartyI>;
  isMorePages?: boolean;
}

interface MediaI {
  media?: Array<MassMediaDataI>;
  isMorePages?: boolean;
}
interface SortGeography {
  country_politician_id: number;
  region_politician_id: number;
  city_politician_id: number;
}
interface SortVote {
  country_user_id: number;
  region_user_id: number;
  city_user_id: number;
}
interface SliceState {
  sort_direction?: string;
  sort_field?: string;
  sort_geography?: SortGeography;
  sort_vote?: SortVote;
  politicians?: PoliticiansI;
  massMedia?: MediaI;
  authors?: AuthorsI;
  parties?: PartiesI;
  countries_geography?: any;
  regions_geography?: any;
  cities_geography?: any;
  countries_vote?: any;
  regions_vote?: any;
  cities_vote?: any;
  geography: any;
  vote: any;
}

const initialState: SliceState = {
  sort_direction: '',
  sort_field: '',
  sort_geography: {} as SortGeography,
  geography: {},
  vote: {},
  sort_vote: {} as SortVote,
  politicians: {} as PoliticiansI,
  massMedia: {} as MediaI,
  authors: {} as AuthorsI,
  parties: {} as PartiesI,
  countries_geography: [],
  regions_geography: [],
  cities_geography: [],
  countries_vote: [],
  regions_vote: [],
  cities_vote: [],
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
    setParties(state: SliceState, action: PayloadAction<PartiesI>) {
      state.parties = action.payload;
    },
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
    setSortGeography(state, action) {
      // state.sort_geography = action.payload;
      state.sort_geography = { ...state.sort_geography, ...action.payload };
    },
    setSortVote(state, action) {
      // state.sort_vote = action.payload;
      state.sort_vote = { ...state.sort_vote, ...action.payload };
    },
    setCountryGeography(state: SliceState, action) {
      state.geography.countries = action.payload;
    },
    setRegionsGeography(state: SliceState, action) {
      state.geography.regions = action.payload;
    },
    setCitiesGeography(state: SliceState, action) {
      state.geography.cities = action.payload;
    },
    setCountryVote(state: SliceState, action) {
      state.vote.countries = action.payload;
    },
    setRegionsVote(state: SliceState, action) {
      state.vote.regions = action.payload;
    },
    setCitiesVote(state: SliceState, action) {
      state.vote.cities = action.payload;
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
    resetFilter(state: SliceState) {
      state.sort_vote = {
        country_user_id: null,
        region_user_id: null,
        city_user_id: null
      };
    }
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
