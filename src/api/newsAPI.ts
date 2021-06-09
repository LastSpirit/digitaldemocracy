import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsI } from '../slices/newsSlice';

interface NewsRequest {
  topicId?: any;
  page?: number;
}

interface NewsResponse {
  data?: NewsI;
}

const fetchNews: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { topicId, page } = args.payload;
  // eslint-disable-next-line no-nested-ternary
  return callAPI({
    url: `getNews${
      topicId && page
        ? `?page=${page}&topic_id=${topicId}`
        : !topicId && page
        ? `?page=${args.payload.page}`
        : topicId && !page
        ? `?topic_id=${topicId}`
        : ''
    }`,
    config: { method: 'GET' },
    ...args,
  });
};

export const newsAPI = {
  fetchNews,
};
