import { APIRequest, callAPI } from '../lib/axiosAPI';
import { HomeI } from '../slices/homeSlice';

interface HomeRequest {}

interface HomeResponse {
  data?: Array<HomeI>
}

const fetchHome: APIRequest<HomeRequest, HomeResponse> = (args) => callAPI({ url: '/homePage', ...args });

export const homeAPI = {
  fetchHome,
};
