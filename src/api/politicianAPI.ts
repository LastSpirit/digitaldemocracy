import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import {
  NewsWithPercentI,
  PoliticianInfoI,
  PositionHistoryI,
  PromiseI,
  RatingStatisticsI,
  PositionsDescriptionI,
  StatisticI,
} from '../slices/politicianSlice';

interface NewsRequest {
  start_date: string;
  end_date: string;
}

const fetchNews: APIRequest<NewsRequest, Array<NewsWithPercentI>, string, FetchProfileInfoVar> = (args) => {
  const { token, politician_id } = args.variables;
  console.log('into', politician_id);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start_date, end_date } = args.payload;
  return callAPI({
    url: `getPoliticianNews/?politician_id=${politician_id}&start_date=${start_date}&end_date=${end_date}`,
    config: {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

interface DefaultRequest {
  politician_id: number;
}
interface RequestWithToken extends DefaultRequest {
  token: string;
}
interface FetchProfileInfoRequest extends DefaultRequest {}

interface FetchProfileInfoResponse extends PoliticianInfoI {}
interface FetchProfileInfoErr {}
interface FetchProfileInfoVar {
  short_link?: string;
  token?: string;
  politician_id?: number;
}

const fetchProfileInfo: APIRequest<
  FetchProfileInfoRequest,
  FetchProfileInfoResponse,
  FetchProfileInfoErr,
  FetchProfileInfoVar
> = (args) => {
  const { token, short_link } = args.variables;
  return callAPI({
    url: `getPolitician/${short_link}`,
    config: {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    ...args,
  });
};

const fetchPositionHistory: APIRequest<DefaultRequest, Array<PositionHistoryI>> = (args) =>
  callAPI({
    url: `getPoliticianPositions?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchPromises: APIRequest<DefaultRequest, Array<PromiseI>> = (args) =>
  callAPI({
    url: `getPoliticianPromises?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchPositionsDescription: APIRequest<DefaultRequest, Array<PositionsDescriptionI>> = (args) =>
  callAPI({
    url: `getPoliticianPositionsDescription?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchStatistic: APIRequest<DefaultRequest, Array<StatisticI>> = (args) =>
  callAPI({
    url: `getPoliticianStatisticsProfit?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const fetchRatingStatistics: APIRequest<DefaultRequest, RatingStatisticsI> = (args) =>
  callAPI({
    url: `getPoliticianVotingStatistics?politician_id=${args.payload.politician_id}`,
    config: { method: 'GET' },
    ...args,
  });

const subscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) =>
  callAPI({
    url: 'subscribeToPolitician',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribe: APIRequest<RequestWithToken, Array<PromiseI>> = (args) =>
  callAPI({
    url: 'unsubscribeFromPolitician',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const APIs = {
  fetchNews,
  fetchProfileInfo,
  fetchPositionHistory,
  fetchPromises,
  subscribe,
  unsubscribe,
  fetchRatingStatistics,
  fetchPositionsDescription,
  fetchStatistic,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
