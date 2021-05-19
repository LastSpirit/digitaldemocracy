import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';

export interface PoliticianInfoI {
  first_name?: string
  second_name?: string
  avatar?: string
  subscribers?: number
  subscribed?: boolean
  rating?: number
  part?: string
  position?: string
  age?: number
  city?: string
}

export interface PositionHistoryI {
  id: number
  position: string
  type: string
  percent: string
  years: string
}

interface SliceState {
  data?: PoliticianInfoI
  news?: Array<NewsI>
  chartData?: Array<Array<Date | number>>
  history?: Array<PositionHistoryI>
}

export interface NewsWithPercentI extends NewsI {
  percent: number
}

const initialState: SliceState = {
  news: [],
  chartData: []
};

export const politicianSlice = createSlice({
  name: 'politicianSlice',
  initialState,
  reducers: {
    setNews(state: SliceState, action: PayloadAction<Array<NewsWithPercentI>>) {
      state.news = action.payload;
      state.chartData = [...action.payload].map((item) => ([new Date(item.publication_date), item.percent]));
    },
    setPoliticianInfo(state: SliceState, action: PayloadAction<PoliticianInfoI>) {
      state.data = action.payload;
    },
    setHistory(state: SliceState, action: PayloadAction<Array<PositionHistoryI>>) {
      state.history = action.payload;
    }
  }
});

interface Store {
  politician: SliceState
}

export const politicianSelectors = {
  getNews: () => (state: Store) => state.politician.news,
  getChartData: () => (state: Store) => state.politician.chartData,
  getPoliticianInfo: () => (state: Store) => state.politician.data,
  getPositionHistory: () => (state: Store) => state.politician.history
};

export const politicianActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...politicianSlice.actions
  }, dispatch);
};
