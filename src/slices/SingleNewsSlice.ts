import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface MediaI {
  id?: number,
  name?: string,
  photo?: string,
  percent?: string
}

export interface AuthorI {
  id?: number,
  title?: string,
  photo?: string,
  percent?: string
}

export interface PoliticiansI {
  name: string,
  photo: string,
  percent: string
}

interface NewTopicsI {
  id: number,
  title: string
}

interface HashtagsI {
  id: number,
  title: string
}

export interface CurrentNewsI {
  id?: number,
  media?: MediaI,
  author?: AuthorI,
  newTopics?: NewTopicsI[],
  hashtags?: HashtagsI[],
  votes: number,
  title: string,
  image: string,
  publication_date: Date,
  link: string,
  source_link: string,
  number_of_views: number

}

export interface NewsI {
  id?: number,
  media?: MediaI,
  author?: AuthorI,
  newTopics?: NewTopicsI[],
  hashtags?: HashtagsI[],
  votes: number,
  title: string,
  image: string,
  publication_date: Date,
  link: string,
  source_link: string,
  number_of_views: number,
  short_link?: string

}

export interface SingleNewsI {
  currentNews?: CurrentNewsI,
  news?: NewsI[],
  politicians?: PoliticiansI[],
  isMorePages?: boolean
}

interface SliceState {
  data?: SingleNewsI
  status: APIStatus
}

const initialState:SliceState = {
  status: APIStatus.Initial
};

export const singleNewsSlice = createSlice({
  name: 'singleNewsSlice',
  initialState,
  reducers: {
    startFetch(state: SliceState) {
      state.status = APIStatus.Loading;
    },
    setData(state: SliceState, action: PayloadAction<SingleNewsI>) {
      state.data = action.payload;
      state.status = APIStatus.Success;
    },
    failFetch(state: SliceState) {
      state.status = APIStatus.Failure;
    }
  }
});

interface Store {
  singleNews: SliceState
}

export const singleNewsSelector = {
  getData: () => (state: Store) => state.singleNews.data,
  getStatus: () => (state: Store) => state.singleNews.status
};