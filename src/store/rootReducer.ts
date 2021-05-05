import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { newsSlice } from '../slices/newsSlice';
import { userSlice } from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  news: newsSlice.reducer,
});

export default rootReducer;
