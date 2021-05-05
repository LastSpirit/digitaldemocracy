import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { newsSlice } from '../slices/newsSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  news: newsSlice.reducer,
});

export default rootReducer;
