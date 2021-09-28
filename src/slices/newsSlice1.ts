import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSetting } from '../config';
import { getItem } from '../lib/localStorageManager';

export interface IState {
  allNews: any,
  news: any,
  newsTopics: any,
  loading: boolean,
  loadingMore: boolean,
  isMorePages: boolean,
  mainIsMorePages: boolean,
  error: any,
  page?: number,
}

const initialState:IState = {
  allNews: [],
  news: [],
  newsTopics: [],
  loading: false,
  isMorePages: false,
  mainIsMorePages: false,
  error: null,
  loadingMore: false
};

export const newsSlice1 = createSlice({
  name: 'newsSlice1',
  initialState,
  reducers: {
    fetchRequest(state, action: PayloadAction<IState>) {
      state.loading = true;
    },
    fetchRequestMore(state, action: PayloadAction<IState>) {
      state.loadingMore = true;
    },
    fetchAllNewsSuccess(state, action: PayloadAction<IState>) {
      const { news, newsTopics, isMorePages, page } = action.payload;
      state.allNews = page === 1 ? news : [...state.allNews, ...news];
      state.newsTopics = newsTopics;
      if (page !== 1) {
        state.loadingMore = false;
      } else {
        state.loading = false;
      }
      state.isMorePages = isMorePages;
    },
    fetchTopicsSuccess(state, action: PayloadAction<IState>) {
      const { newsTopics, page } = action.payload;
      state.newsTopics = newsTopics;
      // if (page !== 1) {
      //   state.loadingMore = false;
      // } else {
      //   state.loading = false;
      // }
    },
    fetchSuccess(state, action: PayloadAction<IState>) {
      const { isMorePages, news, page } = action.payload;
      state.isMorePages = isMorePages;
      state.news = page === 1 ? news : [...state.news, ...news];
      if (page !== 1) {
        state.loadingMore = false;
      } else {
        state.loading = false;
      }
      state.error = null;
    },
    fetchError(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

const {
  fetchRequest,
  fetchError,
  fetchSuccess,
  fetchAllNewsSuccess,
  fetchTopicsSuccess,
  fetchRequestMore
} = newsSlice1.actions;

const baseURL = apiSetting.url_api;

const axiosApi = axios.create({
  baseURL
});
axiosApi.interceptors.request.use((configure) => {
  const token = getItem('token');
  configure.headers.Authorization = token ? `Bearer ${token}` : '';
  return configure;
});

const fetchNews = (page?:number, topic_id?:number, type?:string) => {
  return async (dispatch) => {
    let url = 'getNewsByWeeks';
    if (type === 'subscriptions') {
      url = 'getNewsBySubscriptions';
    } else if (type === 'country' || type === 'region' || type === 'city') {
      url = `getNewsBySelectArea?area_place=${type}`;
    }
    const params = {
      page,
      topic_id
    };
    try {
      if (page !== 1) {
        dispatch(fetchRequestMore());
      } else {
        dispatch(fetchRequest());
      }
      const res = await axiosApi.get(url, { params });
      const payload = { ...res?.data?.data, page };
      dispatch(fetchSuccess(payload));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
};

const fetchAllNews = (page?:number, topic_id?:number,) => {
  return async (dispatch) => {
    const params = {
      page,
      topic_id
    };
    try {
      if (page !== 1) {
        dispatch(fetchRequestMore());
      } else {
        dispatch(fetchRequest());
      }
      const res = await axiosApi.get('getNews', { params });
      const payload = { ...res?.data?.data, page };
      dispatch(fetchAllNewsSuccess(payload));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
};
const fetchTopicsNews = (page?:number) => {
  return async (dispatch) => {
    try {
      // if (page !== 1) {
      //   dispatch(fetchRequestMore());
      // } else {
      //   dispatch(fetchRequest());
      // }
      const res = await axiosApi.get('getNews');
      const payload = { ...res?.data?.data, page };
      dispatch(fetchTopicsSuccess(payload));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
};

export default { fetchNews, fetchAllNews, fetchTopicsNews };
