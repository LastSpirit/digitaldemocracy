import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface SliceState {
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
    setSearchData: (state: SliceState, action) => {
      state.data = action.payload;
    }
  },
});

export const searchSelectors = {
  getSearchData: () => (state) => state.search.data
};

export const searchActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...searchSlice.actions
  }, dispatch);
};
