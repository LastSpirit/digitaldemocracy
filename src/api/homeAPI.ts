import { APIRequest, callAPI } from '../lib/axiosAPI';
import { HomeI } from '../slices/homeSlice';

interface HomeRequest {
  topic_id?: any,
  page?: number
}

interface HomeResponse {
  data?: Array<HomeI>
}

interface HomeErrorResponse {
  page?: Array<string>
  topic_id?: Array<string>
}

const fetchHome: APIRequest<HomeRequest, HomeResponse, HomeErrorResponse> = (args) => callAPI({ url: `homePage${args.payload.topic_id ? `?page=${args.payload.page}&topic_id=${args.payload.topic_id}` : `?page=${args.payload.page}`}`, config: { method: 'GET' }, ...args });

export const homeAPI = {
  fetchHome,
};
