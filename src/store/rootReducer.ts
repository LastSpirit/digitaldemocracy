import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
// eslint-disable-next-line import/no-cycle
import { homeSlice } from '../slices/homeSlice';
import { userSlice } from '../slices/userSlice';
import { newsSlice } from '../slices/newsSlice';
import { singleNewsSlice } from '../slices/SingleNewsSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  home: homeSlice.reducer,
  news: newsSlice.reducer,
  singleNews: singleNewsSlice.reducer
});

export default rootReducer;
