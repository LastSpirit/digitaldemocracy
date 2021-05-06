import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface NewsI {
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
  data?: Array<HomeI>
}

const initialState:SliceState = {};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<Array<HomeI>>) {
      state.data = action.payload;
    }
  }
});

interface Store {
  home: SliceState
}

export const homeSelector = {
  getData: () => (state: Store) => state.home.data
};
