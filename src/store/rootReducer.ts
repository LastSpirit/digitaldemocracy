import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { userSlice } from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
