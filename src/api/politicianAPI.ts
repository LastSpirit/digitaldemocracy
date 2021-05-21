import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsWithPercentI, PoliticianInfoI, PositionHistoryI, PromiseI } from '../slices/politicianSlice';

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

interface FetchProfileInfoResponse extends PoliticianInfoI {}

const fetchProfileInfo: APIRequest<{ id: number }, FetchProfileInfoResponse> = (args) => callAPI({ url: `getPolitician?politician_id=${args.payload.id}`, config: { method: 'get' }, ...args });

const fetchPositionHistory: APIRequest<{ id: number }, Array<PositionHistoryI>> = (args) => callAPI({ url: `getPoliticianPositions?politician_id=${args.payload.id}`, config: { method: 'GET' }, ...args });

const fetchPromises: APIRequest<{ id: number }, Array<PromiseI>> = (args) => callAPI({ url: `getPoliticianPromises?politician_id=${args.payload.id}`, config: { method: 'GET' }, ...args });

const APIs = {
  fetchNews,
  fetchProfileInfo,
  fetchPositionHistory,
  fetchPromises,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
