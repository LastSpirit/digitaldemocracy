import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { NewsI } from './homeSlice';
import { mockNews } from '../static/static';

interface MassMediaInfoI {
  id?: number;
  name?: string;
  description?: string;
  english_name?: string;
  photo?: string;
  number_of_subscribers?: number;
  is_subscribed?: boolean;
  source_link?: string,
  percent?: string;
  party?: string;
  party_logo?: string;
  position?: string;
  age?: number;
  city?: string;
  trust?: string;
}

export interface NewsArrayI {
  id: number;
  media?: MediaI;
  author?: AuthorI;
  votes?: number;
  title?: string;
  publication_date?: string;
  number_of_views?: number;
  short_link?: string;
  image?: string;
}

interface MediaI {
  id: number;
  name: string;
  photo: string;
  percent: string;
}

interface AuthorI {
  id: number;
  title: string;
  photo: string;
  percent: string;
}

interface SliceState {
  data?: MassMediaInfoI;
  news?: Array<NewsArrayI>;
}

const initialState: SliceState = {
  data: {
    id: 1,
    name: 'СМИ',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    english_name: 'MassMedia',
    photo: 'https://pbs.twimg.com/media/CIkgW1FUsAAuETX.jpg',
    number_of_subscribers: 122,
    is_subscribed: false,
    percent: '86',
    party: '',
    party_logo: '',
    position: '',
    age: 35,
    city: 'Москва',
    trust: 'Высокое доверие',
  },
  news: mockNews,
};

export const massMediaSlice = createSlice({
  name: 'massMediaSlice',
  initialState,
  reducers: {},
});

interface Store {
  massmedia: SliceState;
}

export const massmediaSelectors = {
  getMassMediaInfo: () => (state: Store) => state.massmedia.data,
  getNews: () => (state: Store) => state.massmedia.news,
};

export const massmediaActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...massMediaSlice.actions,
    },
    dispatch
  );
};
