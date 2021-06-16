import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface MediaI {
  id?: number;
  name?: string;
  photo?: string;
  is_subscribed?: boolean;
  link?: string;
  percent?: string;
  short_link?: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
  rating?: string;
}

export interface AuthorI {
  id?: number;
  name?: string;
  photo?: string;
  is_subscribed?: boolean;
  link?: string;
  percent?: string;
  short_link?: string;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
  rating?: string;
}

export interface PoliticiansI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  rating?: string;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

interface NewTopicsI {
  id: number;
  title: string;
}

interface HashtagsI {
  id: number;
  title: string;
}

export interface CurrentNewsI {
  id?: number;
  media?: MediaI;
  author?: AuthorI;
  newTopics?: NewTopicsI[];
  hashtags?: HashtagsI[];
  votes: number;
  title: string;
  image: string;
  publication_date: Date;
  link: string;
  source_link: string;
  number_of_views: number;
}

export interface NewsI {
  id?: number;
  media?: MediaI;
  author?: AuthorI;
  newTopics?: NewTopicsI[];
  hashtags?: HashtagsI[];
  votes?: number;
  title?: string;
  image?: string;
  publication_date?: string;
  link?: string;
  source_link?: string;
  number_of_views?: number;
  short_link?: string;
}

export interface SingleNewsI {
  currentNews?: CurrentNewsI;
  news?: NewsI[];
  politicians?: PoliticiansI[];
  isMorePages?: boolean;
}

interface SliceState {
  data?: SingleNewsI;
  status?: APIStatus;
  likeStatus?: APIStatus;
  dislikeStatus?: APIStatus;
}

const initialState: SliceState = {
  status: 'Initial' as APIStatus,
  likeStatus: 'Initial' as APIStatus,
  dislikeStatus: 'Initial' as APIStatus,
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
    },
    resetSingleNews(state: SliceState) {
      state = initialState;
    },
    startMassmediaLike(state) {
      state.likeStatus = APIStatus.Loading;
    },
    successMassmediaLike(state, action) {
      state.likeStatus = APIStatus.Success;
      state.data.currentNews.media.is_user_liked = action.payload;
      state.data.currentNews.media.number_of_likes = action.payload
        ? state.data.currentNews.media.number_of_likes + 1
        : state.data.currentNews.media.number_of_likes - 1;
    },
    failMassmediaLike(state) {
      state.likeStatus = APIStatus.Failure;
    },
    startMassmediaDislike(state) {
      state.dislikeStatus = APIStatus.Loading;
    },
    successMassmediaDislike(state, action) {
      state.dislikeStatus = APIStatus.Success;
      state.data.currentNews.media.is_user_disliked = action.payload;
      state.data.currentNews.media.number_of_dislikes = action.payload
        ? state.data.currentNews.media.number_of_dislikes + 1
        : state.data.currentNews.media.number_of_dislikes - 1;
    },
    failMassmediaDislike(state) {
      state.dislikeStatus = APIStatus.Failure;
    },
  },
});

interface Store {
  singleNews: SliceState;
}

export const singleNewsSelector = {
  getData: () => (state: Store) => state.singleNews.data,
  getStatus: () => (state: Store) => state.singleNews.status,
};

export const singleNewsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleNewsSlice.actions,
    },
    dispatch
  );
};
