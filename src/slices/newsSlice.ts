import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewI {
  date: number
  viewed: number
  title: string
  author: string
  site?: string
  image: string
}

interface SliceState {
  data?: Array<NewI>
}

const initialState:SliceState = {};

export const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<Array<NewI>>) {
      state.data = action.payload;
    }
  }
});

interface Store {
  news: SliceState
}

export const newsSelector = {
  getData: () => (state: Store) => state.news.data
};
