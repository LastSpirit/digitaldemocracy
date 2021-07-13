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
  data: SingleBillsI;
  likeStatus?: APIStatus;
  dislikeStatus?: APIStatus;
}

const initialState: SliceState = {
  data: {},
  likeStatus: 'Initial' as APIStatus,
  dislikeStatus: 'Initial' as APIStatus,
};

export const singleBillsSlice = createSlice({
  name: 'singleBillsSlice',
  initialState,
  reducers: {
    setData(state: SliceState, action: PayloadAction<SingleBillsI>) {
      state.data = action.payload;
    },
    startLike(state) {
      state.likeStatus = APIStatus.Loading;
    },
    successLike(state, action) {
      state.likeStatus = APIStatus.Success;
      state.data.is_user_liked = action.payload;
      state.data.number_of_likes = action.payload ? state.data.number_of_likes + 1 : state.data.number_of_likes - 1;
    },
    failLike(state) {
      state.likeStatus = APIStatus.Failure;
    },
    startDislike(state) {
      state.dislikeStatus = APIStatus.Loading;
    },
    successDislike(state, action) {
      state.dislikeStatus = APIStatus.Success;
      state.data.is_user_disliked = action.payload;
      state.data.number_of_dislikes = action.payload
        ? state.data.number_of_dislikes + 1
        : state.data.number_of_dislikes - 1;
    },
    failDislike(state) {
      state.dislikeStatus = APIStatus.Failure;
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
