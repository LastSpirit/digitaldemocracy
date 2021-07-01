import { positions } from '@material-ui/system';
import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
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
  position?: string | null;
  age?: number;
  city?: string;
  trust?: string;
  link?: string;
  rating?: string;
  short_link?: string;
  place?: number;
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
  rating?: number;
  place?: number;
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
  id?: number;
  text: string;
  link: string;
  promise_date: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

export interface PoliticianBillsI {
  title: string;
  source_link: string;
  publication_date: string;
  id: number;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
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
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

export interface LikesI {
  [U: number]: StatusI;
}

export interface StatusI {
  status: APIStatus;
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
  bills?: Array<PoliticianBillsI>;
  promisesLikeStatus?: LikesI;
  promisesDislikeStatus?: LikesI;
  billsLikeStatus?: LikesI;
  billsDislikeStatus?: LikesI;
  statisticLikeStatus?: LikesI;
  statisticDislikeStatus?: LikesI;
}

export interface NewsWithPercentI extends NewsI {
  percent: number;
}

const initialState: SliceState = {
  news: [],
  chartData: [],
  promisesLikeStatus: {},
  promisesDislikeStatus: {},
  billsLikeStatus: {},
  billsDislikeStatus: {},
  statisticLikeStatus: {},
  statisticDislikeStatus: {},
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
    resetPromises(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.promises = initialState.promises;
    },
    resetBills(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.bills = initialState.bills;
    },
    resetIncomeStatistic(state: SliceState, action: PayloadAction<Array<PromiseI>>) {
      state.statistic = initialState.statistic;
    },
    setBills(state: SliceState, action: PayloadAction<Array<PoliticianBillsI>>) {
      state.bills = action.payload;
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
    startLike(state, action) {
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Loading };
    },
    successLike(state, action) {
      const field = state[action.payload.field];
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Success };
      field[action.payload.index].is_user_liked = action.payload.status;
      field[action.payload.index].number_of_likes = action.payload.status
        ? field[action.payload.index].number_of_likes + 1
        : field[action.payload.index].number_of_likes - 1;
    },
    failLike(state, action) {
      state[`${action.payload.field}LikeStatus`][action.payload.id] = { status: APIStatus.Failure };
    },
    startDislike(state, action) {
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Loading };
    },
    successDislike(state, action) {
      const field = state[action.payload.field];
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Success };
      field[action.payload.index].is_user_disliked = action.payload.status;
      field[action.payload.index].number_of_dislikes = action.payload.status
        ? field[action.payload.index].number_of_dislikes + 1
        : field[action.payload.index].number_of_dislikes - 1;
    },
    failDislike(state, action) {
      state[`${action.payload.field}DislikeStatus`][action.payload.id] = { status: APIStatus.Failure };
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
  getBills: () => (state: Store) => state.politician.bills,
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
