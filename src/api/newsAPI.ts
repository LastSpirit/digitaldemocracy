import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewI } from '../slices/newsSlice';

interface NewsRequest {}

interface NewsResponse {
  data?: Array<NewI>
}

const fetchNews: APIRequest<NewsRequest, NewsResponse> = (args) => callAPI({ url: '/api/news', ...args });

export const newsAPI = {
  fetchNews,
};
