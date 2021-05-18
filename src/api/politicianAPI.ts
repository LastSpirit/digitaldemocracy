import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsI } from '../slices/homeSlice';

interface NewsRequest {
  start_date: string
  end_date: string
}

interface NewsResponse {
  news: Array<NewsI>
}

const fetchNews: APIRequest<NewsRequest, NewsResponse, string> = (args) => callAPI({ url: 'homePage', config: { method: 'get' }, ...args });

const APIs = {
  fetchNews,
};

export const politicianAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
