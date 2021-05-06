import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { homeSlice } from '../slices/homeSlice';
import { userSlice } from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  home: homeSlice.reducer
});

export default rootReducer;
