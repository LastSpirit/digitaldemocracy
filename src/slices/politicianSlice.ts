import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';

export interface ChartDataItem {
  date: Date
  percent: number
}

interface SliceState {
  news?: Array<NewsI>
  chartData?: Array<Array<Date | number>>
}

const initialState: SliceState = {
  news: [],
  chartData: []
};

export const politicianSlice = createSlice({
  name: 'politicianSlice',
  initialState,
  reducers: {
    setNews(state: SliceState, action: PayloadAction<Array<NewsI>>) {
      state.news = action.payload;
      state.chartData = [...action.payload].map((item) => ([new Date(item.publication_date), item.votes]));
    }
  }
});

interface Store {
  politician: SliceState
}

export const politicianSelectors = {
  getNews: () => (state: Store) => state.politician.news,
  getChartData: () => (state: Store) => state.politician.chartData
};

export const politicianActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...politicianSlice.actions
  }, dispatch);
};
