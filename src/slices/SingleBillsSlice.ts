import { createSlice, PayloadAction, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { APIStatus } from '../lib/axiosAPI';

export interface SingleBillsI {
  id?: number;
  title?: string;
  image?: string;
  link?: string;
  short_link?: string;
  source_link?: string;
  publication_date?: string;
  number_of_views?: number;
  is_user_liked?: boolean;
  is_user_disliked?: boolean;
  number_of_likes?: number;
  number_of_dislikes?: number;
}

interface SliceState {
  data?: SingleBillsI;
}

const initialState: SliceState = {
  data: {},
};

export const singleBillsSlice = createSlice({
  name: 'singleBillsSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<SingleBillsI>) {
      state.data = action.payload;
    },
  },
});

interface Store {
  singleBills: SliceState;
}

export const singleBillsSelector = {
  getData: () => (state: Store) => state.singleBills.data,
};

export const singleBillsActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...singleBillsSlice.actions,
    },
    dispatch
  );
};
