import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface PoliticiansI {
  name?: string,
  photo?: string
}

export interface NewsTopicsI {
  id?: number,
  title?: string
}
export interface MediaI {
  id?: number,
  name?: string,
  photo?: string
}

export interface AuthorI {
  id?: number,
  title?: string,
  photo?: string
}

export interface NewsI {
  id?: number,
  media?: MediaI,
  author?: AuthorI,
  newsTopics?: NewsTopicsI[],
  hashtags?: string[],
  votes: number,
  title: string,
  image: string,
  publication_date: Date,
  link: string,
  source_link: string,
  number_of_views: number,
  short_link?: string

}

export interface HomeI {
  politicians?: PoliticiansI[],
  newsTopics?: NewsTopicsI[],
  news?: NewsI[],
  isMorePages?: boolean
}

interface SliceState {
  page?: number
  data?: HomeI
  status: APIStatus
}

const initialState:SliceState = {
  page: 1,
  status: APIStatus.Initial
};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    startFetch(state: SliceState) {
      state.status = APIStatus.Loading;
    },
    setData(state: SliceState, action: PayloadAction<HomeI>) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    setNews(state: SliceState, action: PayloadAction<HomeI & { page?: number }>) {
      state.data.news = [...(state.data.news || []), ...action.payload.news];
      state.data.isMorePages = action.payload.isMorePages;
      state.page = action.payload.page;
      state.status = APIStatus.Success;
    },
    failFetch(state: SliceState) {
      state.status = APIStatus.Failure;
    }
  }
});

interface Store {
  home: SliceState
}

export const homeSelector = {
  getData: () => (state: Store) => state.home.data,
  getPage: () => (state: Store) => state.home.page,
  getStatus: () => (state: Store) => state.home.status
};
