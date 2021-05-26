import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import {
  NewsWithPercentI,
  PoliticianInfoI,
  PositionHistoryI,
  PromiseI,
  RatingStatisticsI
} from '../slices/politicianSlice';

interface NewsRequest {
  start_date: string
  end_date: string
  politician_id: number
}

const fetchNews: APIRequest<NewsRequest, Array<NewsWithPercentI>, string> = (args) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { politician_id, start_date, end_date } = args.payload;
  return callAPI({
    url: `getPoliticianNews?politician_id=${politician_id}&start_date=${start_date}&end_date=${end_date}`,
    config: {
      method: 'get'
    },
    ...args
  });
};

interface DefaultRequest {
  politician_id: number
}

interface RequestWithToken extends DefaultRequest {
  token: string
}

interface FetchProfileInfoResponse extends PoliticianInfoI {}

const fetchProfileInfo: APIRequest<RequestWithToken, FetchProfileInfoResponse> = (args) => callAPI({ url: `getPolitician?politician_id=${args.payload.politician_id}`,
  config: { method: 'get',
    headers: {
      Authorization: `Bearer ${args.payload.token}`
    } },
  ...args });

const fetchPositionHistory: APIRequest<DefaultRequest, Array<PositionHistoryI>> = (args) => callAPI({ url: `getPoliticianPositions?politician_id=${args.payload.politician_id}`, config: { method: 'GET' }, ...args });

const fetchPromises: APIRequest<DefaultRequest, Array<PromiseI>> = (args) => callAPI({ url: `getPoliticianPromises?politician_id=${args.payload.politician_id}`, config: { method: 'GET' }, ...args });

const fetchRatingStatistics: APIRequest<DefaultRequest, RatingStatisticsI> = (args) => callAPI({ url: `getPoliticianVotingStatistics?politician_id=${args.payload.politician_id}`, config: { method: 'GET' }, ...args });

const subscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) => callAPI({ url: 'subscribeToPolitician',
  config: { headers: {
    Authorization: `Bearer ${args.payload.token}`
  } },
  ...args });

const unsubscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) => callAPI({ url: 'unsubscribeFromPolitician',
  config: { headers: {
    Authorization: `Bearer ${args.payload.token}`
  } },
  ...args });

const APIs = {
  fetchNews,
  fetchProfileInfo,
  fetchPositionHistory,
  fetchPromises,
  subscribe,
  unsubscribe,
  fetchRatingStatistics,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
