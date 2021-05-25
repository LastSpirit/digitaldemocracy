import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';

export interface PoliticianInfoI {
  id?: number
  name?: string
  photo?: string
  number_of_subscribers?: number
  is_subscribed?: boolean
  percent?: string
  party?: string
  party_logo?: string
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

export interface PromiseI {
  text: string
  link: string
  promise_date: string
}

export interface MetricI {
  title: string
  text: string
  icon: string
  color: string
}

export interface VoicesRegionI {
  region_with_type: string
  total: number
}

export interface RatingStatisticsI {
  metrics: Array<MetricI>
  voicesByRegion: Array<VoicesRegionI>
  numberOfVoters: {
    numberOfUsersFromRegion: number
    numberOfVotedUsers: number
    totalElectorate: number
  }
}

interface SliceState {
  data?: PoliticianInfoI
  news?: Array<NewsI>
  promises?: Array<PromiseI>
  chartData?: Array<Array<Date | number>>
  ratingStatistics?: RatingStatisticsI
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
    },
    setPromises(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.promises = action.payload;
    },
    setIsSubscribe(state: SliceState, action: PayloadAction<boolean>) {
      state.data.is_subscribed = action.payload;
    },
    setRatingStatistics(state: SliceState, action: PayloadAction<RatingStatisticsI>) {
      state.ratingStatistics = action.payload;
    }
  }
});

interface Store {
  politician: SliceState
}

export const politicianSelectors = {
  getNews: () => (state: Store) => state.politician.news,
  getChartData: () => (state: Store) => state.politician.chartData,
  getIsSubscribe: () => (state: Store) => state.politician.data?.is_subscribed,
  getPoliticianInfo: () => (state: Store) => state.politician.data,
  getPositionHistory: () => (state: Store) => state.politician.history,
  getPositionPromises: () => (state: Store) => state.politician.promises,
  getRatingStatistic: () => (state: Store) => state.politician.ratingStatistics
};

export const politicianActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...politicianSlice.actions
  }, dispatch);
};
