import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';

export interface PoliticianInfoI {
  id?: number;
  name?: string;
  english_name?: string;
  photo?: string;
  is_subscribed?: boolean;
  percent?: string;
  vote_groups?: Array<GraphicDataI>;
  number_of_subscribers?: number;
  party?: PartyI;
  party_logo?: string;
  position?: string;
  age?: number;
  city?: string;
  trust?: string;
  link?: string;
  rating?: string;
  short_link?: string;
}

export interface PartyI {
  id?: number;
  name?: string;
  logo?: string;
  politicians_count?: number | null;
  short_link?: string;
  link?: string;
  percent?: number;
  position?: number;
  source_link?: string;
}

export interface GraphicDataI {
  id: number;
  width: number;
  color: string;
  zIndex: number;
}

export interface PositionHistoryI {
  id: number;
  position: string;
  type: string;
  percent: string;
  years: string;
}

export interface PromiseI {
  text: string;
  link: string;
  promise_date: string;
}

export interface MetricI {
  title: string;
  text: string;
  icon: string;
  color: string;
}

export interface VoicesRegionI {
  region_with_type: string;
  total: number;
}

export interface RatingStatisticsI {
  metrics: Array<MetricI>;
  voicesByRegion: Array<VoicesRegionI>;
  numberOfVoters: {
    numberOfUsersFromRegion: number;
    numberOfVotedUsers: number;
    totalElectorate: number;
  };
}

export interface PositionsDescriptionI {
  id: number;
  position: string;
  description: string | null;
  link: string | null;
  is_active: boolean;
}
export interface StatisticI {
  id: number;
  politician_id: number;
  link: string;
  source_link: string;
}

interface SliceState {
  data?: PoliticianInfoI;
  news?: any;
  promises?: Array<PromiseI>;
  chartData?: Array<Array<Date | number>>;
  ratingStatistics?: RatingStatisticsI;
  history?: Array<PositionHistoryI>;
  positionDescription?: Array<PositionsDescriptionI>;
  statistic?: Array<StatisticI>;
}

export interface NewsWithPercentI extends NewsI {
  percent: number;
}

const initialState: SliceState = {
  news: [],
  chartData: [],
};

export const politicianSlice = createSlice({
  name: 'politicianSlice',
  initialState,
  reducers: {
    setNews(state: SliceState, action: PayloadAction<Array<NewsWithPercentI>>) {
      state.news = action.payload;
      // state.chartData = [...action.payload].map((item) => [new Date(item.publication_date), item.percent]);
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
    },
    setPositionsDescription(state: SliceState, action: PayloadAction<Array<PositionsDescriptionI>>) {
      state.positionDescription = action.payload.filter((item) => item.is_active === true);
    },
    setStatistic(state: SliceState, action: PayloadAction<Array<StatisticI>>) {
      state.statistic = action.payload;
    },
  },
});

interface Store {
  politician: SliceState;
}

export const politicianSelectors = {
  getNews: () => (state: Store) => state.politician.news,
  getChartData: () => (state: Store) => state.politician.chartData,
  getIsSubscribe: () => (state: Store) => state.politician.data?.is_subscribed,
  getPoliticianInfo: () => (state: Store) => state.politician.data,
  getPositionHistory: () => (state: Store) => state.politician.history,
  getPositionPromises: () => (state: Store) => state.politician.promises,
  getRatingStatistic: () => (state: Store) => state.politician.ratingStatistics,
  getPositionsDescription: () => (state: Store) => state.politician.positionDescription,
  getStatistic: () => (state: Store) => state.politician.statistic,
};

export const politicianActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...politicianSlice.actions,
    },
    dispatch
  );
};
