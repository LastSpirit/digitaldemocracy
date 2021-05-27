import { APIRequest, callAPI } from '../lib/axiosAPI';
import { SingleNewsI } from '../slices/SingleNewsSlice';

interface SingleNewsRequest {
  link?: string
  token: string
}

interface SingleNewsResponse {
  data?: SingleNewsI
}

interface SingleNewsErrorResponse {
  link?: Array<string>
}

const fetchSingleNews: APIRequest<SingleNewsRequest, SingleNewsResponse, SingleNewsErrorResponse> = (args) => callAPI({ url: `getNews/${args.payload.link}`,
  config: { method: 'GET',
    headers: {
      Authorization: `Bearer ${args.payload.token}`
    } },
  ...args });

export const singleNewsAPI = {
  fetchSingleNews,
};
