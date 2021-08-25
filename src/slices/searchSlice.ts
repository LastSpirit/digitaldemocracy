import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  news: {
    page: number,
    perPage: number,
    data: Array<any>
  };
  politician: {
    page: number,
    perPage: number,
    data: Array<any>
  };
  party: {
    page: number,
    perPage: number,
    data: Array<any>
  };
  media: {
    page: number,
    perPage: number,
    data: Array<any>
  };
  author: {
    page: number,
    perPage: number,
    data: Array<any>
  };
}

interface SearchResponse {
  payload: {
    news: Array<any>;
    politician: Array<any>;
    party: Array<any>;
    media: Array<any>;
    author: Array<any>;
  }
}

interface ActionSetPageOrPerPage {
  payload: {
    key: string,
    value: number,
  }
}

const initialState: SliceState = {
  news: {
    page: 1,
    perPage: 4,
    data: [],
  },
  politician: {
    page: 1,
    perPage: 4,
    data: [],
  },
  party: {
    page: 1,
    perPage: 4,
    data: [],
  },
  media: {
    page: 1,
    perPage: 4,
    data: [],
  },
  author: {
    page: 1,
    perPage: 4,
    data: [],
  },
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchData: (state: SliceState, action: SearchResponse) => {
      state.news.data = action.payload.news;
      state.politician.data = action.payload.politician;
      state.party.data = action.payload.party;
      state.media.data = action.payload.media;
      state.author.data = action.payload.author;
    },
    setSearchDataCategory: (state: SliceState, action) => {
      state[action.payload.key].data = action.payload;
    },
    setPage: (state: SliceState, action: ActionSetPageOrPerPage) => {
      state[action.payload.key].page = action.payload.value;
    },
    setPerPage: (state: SliceState, action: ActionSetPageOrPerPage) => {
      state[action.payload.key].perPage = action.payload.value;
    },
    clearSearchData: () => initialState
  },
});

export const searchSelectors = {
  getSearchData: () => (state) => state.search
};

export const searchActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...searchSlice.actions
  }, dispatch);
};
