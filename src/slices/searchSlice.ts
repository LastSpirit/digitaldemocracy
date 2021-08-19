import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  query: string;
  isNews: boolean;
  isPolitician: boolean;
  isParty: boolean;
  isMedia: boolean;
  isAuthor: boolean;
  page: number;
  PerPage: number;
  data: SearchResponse
}

interface SearchResponse {
  news: Array<any>;
  politician: Array<any>;
  party: Array<any>;
  media: Array<any>;
  author: Array<any>;
}

const initialState: SliceState = {
  query: '',
  isNews: true,
  isPolitician: true,
  isParty: true,
  isMedia: true,
  isAuthor: true,
  page: 1,
  PerPage: 8,
  data: {
    news: [],
    politician: [],
    party: [],
    media: [],
    author: [],
  }
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setQuery: (state: SliceState, action) => {
      state.query = action.payload.query;
    },
    setIsNews: (state: SliceState, action) => {
      state.isNews = action.payload.isNews;
    },
    setIsPolitician: (state: SliceState, action) => {
      state.isPolitician = action.payload.isPolitician;
    },
    setIsParty: (state: SliceState, action) => {
      state.isParty = action.payload.isParty;
    },
    setIsMedia: (state: SliceState, action) => {
      state.isMedia = action.payload.isMedia;
    },
    setIsAuthor: (state: SliceState, action) => {
      state.isAuthor = action.payload.isAuthor;
    },
    setPageAndPerPage: (state: SliceState, action) => {
      state.page = action.payload.page;
      state.PerPage = action.payload.PerPage;
    },
    setSearchData: (state: SliceState, action) => {
      state.data = action.payload;
    }
  },
});

export const searchSelectors = {
  getSearchParams: () => (state) => ({
    query: state.search.query,
    isNews: state.search.isNews,
    isPolitician: state.search.isPolitician,
    isParty: state.search.isParty,
    isMedia: state.search.isMedia,
    isAuthor: state.search.isAuthor,
    page: state.search.page,
    PerPage: state.search.PerPage,
  }),
  getSearchData: () => (state) => state.search.data
};

export const searchActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...searchSlice.actions
  }, dispatch);
};
