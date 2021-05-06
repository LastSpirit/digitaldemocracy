import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { newsSlice } from '../slices/newsSlice';
import { homeSlice } from '../slices/homeSlice';
import { userSlice } from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  news: newsSlice.reducer,
  home: homeSlice.reducer
});

export default rootReducer;
