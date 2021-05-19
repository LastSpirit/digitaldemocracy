import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsWithPercentI, PoliticianInfoI, PositionHistoryI } from '../slices/politicianSlice';

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

const fetchProfileInfo: APIRequest<{ id: number }, FetchProfileInfoResponse> = (args) => callAPI({ url: 'news', ...args });

const fetchPositionHistory: APIRequest<{ }, Array<PositionHistoryI>> = (args) => callAPI({ url: 'positions', config: { method: 'GET' }, ...args });

const APIs = {
  fetchNews,
  fetchProfileInfo,
  fetchPositionHistory,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
