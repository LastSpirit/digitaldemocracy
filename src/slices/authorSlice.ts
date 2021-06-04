import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';
import { mockNews } from '../static/static';

interface AuthorInfoI {
  id?: number;
  name?: string;
  description?: string;
  english_name?: string;
  photo?: string;
  number_of_subscribers?: number;
  is_subscribed?: boolean;
  source_link?: string;
  percent?: string;
  party?: string;
  party_logo?: string;
  position?: string;
  age?: number;
  city?: string;
  trust?: string;
}

export interface AuthorDataI {
  id?: number;
  name?: string;
  photo?: string;
  percent?: string;
  link?: string;
  description?: string;
}

export interface NewsArrayI {
  id: number;
  media?: MediaI;
  author?: AuthorI;
  votes?: number;
  title?: string;
  publication_date?: string;
  number_of_views?: number;
  short_link?: string;
  image?: string;
}

interface MediaI {
  id: number;
  name: string;
  photo: string;
  percent: string;
}

interface AuthorI {
  id: number;
  title: string;
  photo: string;
  percent: string;
}

interface SliceState {
  data?: AuthorInfoI;
  data2?: AuthorDataI;
  news?: Array<NewsArrayI>;
  sort_direction?: string;
  sort_field?: string;
}

const initialState: SliceState = {
  data: {
    id: 1,
    name: 'Автор',
    description: 'Это такой-то автор, он пишет ошеломляющие статьи',
    english_name: 'Author',
    photo:
      'https://pyxis.nymag.com/v1/imgs/2ee/792/e5a7d17daebe7075a129d5e59e5de6d7fc-24-george-rr-martin.rsquare.w700.jpg',
    number_of_subscribers: 28,
    is_subscribed: false,
    percent: '99',
    party: '',
    party_logo: '',
    position: '',
    age: 27,
    city: 'Санкт-Петербург',
    trust: 'Высокое доверие',
  },
  news: mockNews,
  sort_direction: '',
  sort_field: '',
  data2: {},
};

export const authorSlice = createSlice({
  name: 'authorSlice',
  initialState,
  reducers: {
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
    setAuthorData(state, action) {
      state.data2 = action.payload;
    },
    resetData(state) {
      state.data2 = initialState.data2;
    },
  },
});

interface Store {
  author: SliceState;
}

export const authorSelectors = {
  getAuthorInfo: () => (state: Store) => state.author.data,
  getNews: () => (state: Store) => state.author.news,
};

export const authorActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authorSlice.actions,
    },
    dispatch
  );
};
