import { APIRequest, callAPI } from '../lib/axiosAPI';
import { HomeI } from '../slices/homeSlice';

interface HomeRequest {
  topic_id?: any
}

interface HomeResponse {
  data?: Array<HomeI>
}

interface HomeErrorResponse {
  page?: Array<string>
  topic_id?: Array<string>
}

const fetchHome: APIRequest<HomeRequest, HomeResponse, HomeErrorResponse> = (args) => callAPI({ url: `homePage?topic_id=${args.payload.topic_id}`, config: { method: 'GET' }, ...args });

export const homeAPI = {
  fetchHome,
};
