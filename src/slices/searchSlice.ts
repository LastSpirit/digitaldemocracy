import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
  news: {
    page: number,
    perPage: number,
    isMorePages: boolean,
    data: Array<any>
  };
  politician: {
    page: number,
    perPage: number,
    isMorePages: boolean,
    data: Array<any>
  };
  party: {
    page: number,
    perPage: number,
    isMorePages: boolean,
    data: Array<any>
  };
  media: {
    page: number,
    perPage: number,
    isMorePages: boolean,
    data: Array<any>
  };
  author: {
    page: number,
    perPage: number,
    isMorePages: boolean,
    data: Array<any>
  };
}

interface SearchResponse {
  payload: {
    news: {
      isMorePages: boolean;
      data: Array<any>;
    };
    politician: {
      isMorePages: boolean;
      data: Array<any>;
    };
    party: {
      isMorePages: boolean;
      data: Array<any>;
    };
    media: {
      isMorePages: boolean;
      data: Array<any>;
    };
    author: {
      isMorePages: boolean;
      data: Array<any>;
    };
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
    isMorePages: false,
    data: [],
  },
  politician: {
    page: 1,
    perPage: 4,
    isMorePages: false,
    data: [],
  },
  party: {
    page: 1,
    perPage: 4,
    isMorePages: false,
    data: [],
  },
  media: {
    page: 1,
    perPage: 4,
    isMorePages: false,
    data: [],
  },
  author: {
    page: 1,
    perPage: 4,
    isMorePages: false,
    data: [],
  },
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchData: (state: SliceState, action: SearchResponse) => {
      state.news = {
        ...state.news,
        data: action.payload.news.data ?? [],
        isMorePages: action.payload.news.isMorePages ?? false,
      };
      state.politician = {
        ...state.politician,
        data: action.payload.politician.data ?? [],
        isMorePages: action.payload.politician.isMorePages ?? false,
      };
      state.party = {
        ...state.party,
        data: action.payload.party.data ?? [],
        isMorePages: action.payload.party.isMorePages ?? false,
      };
      state.media = {
        ...state.media,
        data: action.payload.media.data ?? [],
        isMorePages: action.payload.media.isMorePages ?? false,
      };
      state.author = {
        ...state.author,
        data: action.payload.author.data ?? [],
        isMorePages: action.payload.author.isMorePages ?? false,
      };
    },
    setSearchDataCategory: (state: SliceState, action) => {
      state[action.payload.key].data = action.payload.data;
      state[action.payload.key].isMorePage = action.payload.isMorePage;
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
