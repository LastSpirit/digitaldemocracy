import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
// eslint-disable-next-line import/no-cycle
import { homeSlice } from '../slices/homeSlice';
import { userSlice } from '../slices/userSlice';
import { newsSlice } from '../slices/newsSlice';
// eslint-disable-next-line import/no-cycle
import { singleNewsSlice } from '../slices/SingleNewsSlice';
import { politicianSlice } from '../slices/politicianSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  home: homeSlice.reducer,
  news: newsSlice.reducer,
  singleNews: singleNewsSlice.reducer,
  politician: politicianSlice.reducer
});

export default rootReducer;
