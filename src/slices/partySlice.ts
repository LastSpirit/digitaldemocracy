import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PartyI, PoliticianInfoI } from './politicianSlice';

interface PoliticiansPartyInfoI {
  politicians?: Array<PoliticianInfoI>;
  isMorePages?: boolean;
}
interface SliceState {
  data?: PartyI;
  sort_direction?: string;
  sort_field?: string;
  politiciansPartyInfo?: PoliticiansPartyInfoI;
}

const initialState: SliceState = {
  data: {
    id: 1,
    name: 'Единая Россия',
    logo: 'https://pbs.twimg.com/media/CIkgW1FUsAAuETX.jpg',
    percent: 86,
  },
  sort_direction: '',
  sort_field: '',
};

export const partySlice = createSlice({
  name: 'partySlice',
  initialState,
  reducers: {
    setPartyInfo(state: SliceState, action: PayloadAction<PartyI>) {
      state.data = action.payload;
    },
    setPartyPoliticians(state: SliceState, action: PayloadAction<PoliticiansPartyInfoI>) {
      state.politiciansPartyInfo = action.payload;
    },
    setSortDirection(state, action) {
      state.sort_direction = action.payload;
    },
    setSortField(state, action) {
      state.sort_field = action.payload;
    },
  },
});

interface Store {
  party: SliceState;
}

export const partySelectors = {
  getPartyInfo: () => (state: Store) => state.party.data,
  getPartyPoliticians: () => (state: Store) => state.party.politiciansPartyInfo,
};

export const partyActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...partySlice.actions,
    },
    dispatch
  );
};
