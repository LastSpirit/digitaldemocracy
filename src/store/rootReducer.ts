import { combineReducers } from '@reduxjs/toolkit';
import { authorSlice } from 'src/slices/authorSlice';
import { authSlice } from '../slices/authSlice';
// eslint-disable-next-line import/no-cycle
import { homeSlice } from '../slices/homeSlice';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../slices/userSlice';
// eslint-disable-next-line import/no-cycle
import { newsSlice } from '../slices/newsSlice';
import { singleBillsSlice } from '../slices/SingleBillsSlice';
// eslint-disable-next-line import/no-cycle
import { singleNewsSlice } from '../slices/SingleNewsSlice';
import { politicianSlice } from '../slices/politicianSlice';
import { massMediaSlice } from '../slices/massMediaSlice';
import { partySlice } from '../slices/partySlice';
// eslint-disable-next-line import/no-cycle
import { widgetLinkSlice } from '../slices/widgetLinkSlice';
import { ratingSlice } from '../slices/ratingSlice';
import { profileSlice } from '../slices/profileSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  home: homeSlice.reducer,
  news: newsSlice.reducer,
  singleNews: singleNewsSlice.reducer,
  singleBills: singleBillsSlice.reducer,
  politician: politicianSlice.reducer,
  user: userSlice.reducer,
  massmedia: massMediaSlice.reducer,
  author: authorSlice.reducer,
  party: partySlice.reducer,
  widgetLink: widgetLinkSlice.reducer,
  rating: ratingSlice.reducer,
  profile: profileSlice.reducer,
});

export default rootReducer;
