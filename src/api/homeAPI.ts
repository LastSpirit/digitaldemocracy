import { APIRequest, callAPI } from '../lib/axiosAPI';
import { HomeI } from '../slices/homeSlice';

interface HomeRequest {
  id: number
}

interface HomeResponse {
  data?: Array<HomeI>
}

interface HomeErrorResponse {
  page?: Array<string>
  topic_id?: Array<string>
}

const fetchHome: APIRequest<HomeRequest, HomeResponse, HomeErrorResponse> = (args) => callAPI({ url: 'homePage', config: { method: 'GET' }, ...args });

export const homeAPI = {
  fetchHome,
};
