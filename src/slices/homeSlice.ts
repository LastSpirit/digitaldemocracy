import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

interface PoliticiansI {
  name: string,
  photo: string
}

interface NewsTopicsI {
  id: number,
  title: string
}
interface MediaI {
  id: number,
  name: string,
  photo: string
}

interface AuthorI {
  id: number,
  title: string,
  photo: string
}

export interface NewsI {
  id?: number,
  media?: MediaI,
  author?: AuthorI,
  newsTopics?: string[],
  hashtags?: string[],
  votes: number,
  title: string,
  image: string,
  publication_date: Date,
  link: string,
  source_link: string,
  number_of_views: number

}

export interface HomeI {
  politicians?: PoliticiansI[],
  newsTopics?: NewsTopicsI[],
  news?: NewsI[],
  isMorePages?: boolean
}

interface SliceState {
  data?: HomeI
  status: APIStatus
}

const initialState:SliceState = {
  status: APIStatus.Initial
};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<HomeI>) {
      state.data = action.payload;
    },
    setStatus(state: SliceState, action: PayloadAction<APIStatus>) {
      state.status = action.payload;
    }
  }
});

interface Store {
  home: SliceState
}

export const homeSelector = {
  getData: () => (state: Store) => state.home.data,
  getStatus: () => (state: Store) => state.home.status
};
