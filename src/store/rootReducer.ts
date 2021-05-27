import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
// eslint-disable-next-line import/no-cycle
import { homeSlice } from '../slices/homeSlice';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../slices/userSlice';
// eslint-disable-next-line import/no-cycle
import { newsSlice } from '../slices/newsSlice';
// eslint-disable-next-line import/no-cycle
import { singleNewsSlice } from '../slices/SingleNewsSlice';
import { politicianSlice } from '../slices/politicianSlice';
// eslint-disable-next-line import/no-cycle
import { widgetLinkSlice } from '../slices/widgetLinkSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  home: homeSlice.reducer,
  news: newsSlice.reducer,
  singleNews: singleNewsSlice.reducer,
  politician: politicianSlice.reducer,
  widgetLink: widgetLinkSlice.reducer
});

export default rootReducer;
