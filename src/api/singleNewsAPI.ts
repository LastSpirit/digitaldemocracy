import { APIRequest, callAPI } from '../lib/axiosAPI';
import { SingleNewsI } from '../slices/SingleNewsSlice';

interface SingleNewsRequest {
  link?: string
}

interface SingleNewsResponse {
  data?: SingleNewsI
}

interface SingleNewsErrorResponse {
  link?: Array<string>
}

const fetchSingleNews: APIRequest<SingleNewsRequest, SingleNewsResponse, SingleNewsErrorResponse> = (args) => callAPI({ url: `getNews/${args.payload}`, config: { method: 'GET' }, ...args });

export const singleNewsAPI = {
  fetchSingleNews,
};
