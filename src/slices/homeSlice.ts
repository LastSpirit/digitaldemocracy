import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PoliticiansI {
  name?: string,
  photo?: string
  percent?: number
  id?: number
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
}

const initialState:SliceState = {
  page: 1,
};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<HomeI>) {
      state.data = action.payload;
    },
    addNews(state: SliceState, action: PayloadAction<HomeI & { page?: number }>) {
      state.data.news = [...(state.data.news || []), ...action.payload.news];
      state.data.isMorePages = action.payload.isMorePages;
      state.page = action.payload.page;
    },
    setNews(state: SliceState, action: PayloadAction<HomeI>) {
      state.data.news = [...action.payload.news];
      state.data.isMorePages = action.payload.isMorePages;
      state.page = 1;
    },
  }
});

interface Store {
  home: SliceState
}

export const homeSelector = {
  getData: () => (state: Store) => state.home.data,
  getNews: () => (state: Store) => state.home.data.news,
  getPage: () => (state: Store) => state.home.page,
};
