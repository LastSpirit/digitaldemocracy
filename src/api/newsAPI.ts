import { APIRequest, callAPI } from '../lib/axiosAPI';
import { NewsI } from '../slices/newsSlice';

interface NewsRequest {
  area?: string,
  topicId?: any;
  page?: number;
  token?: string;
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

const fetchNewsArea: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { area, page, topicId } = args.payload;
  return callAPI({
    url: `getNewsBySelectArea?area_place=${area}${page ? `&${page}` : ''}${topicId ? `&${topicId}` : ''}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args
  });
};

export const newsAPI = {
  fetchNews,
  fetchNewsArea
};
