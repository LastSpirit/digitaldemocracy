import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { MassMediaDataI } from '../slices/massMediaSlice';

interface NewsRequest {
  link?: string;
  params?: ParamsI;
}

interface ParamsI {
  orderBy?: string;
  sortBy?: string;
  page?: number;
  mediaId?: number;
}

interface NewsResponse {
  data?: MassMediaDataI;
}

const fetchMassMediaData: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { link } = args.payload;
  return callAPI({
    url: `media/${link}`,
    config: { method: 'GET', headers: { Accept: 'application/json' } },
    ...args,
  });
};

const fetchMassMediaNews: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { params } = args.payload;
  return callAPI({
    url: 'mediaNews',
    config: { method: 'GET', headers: { Accept: 'application/json' }, params },
    ...args,
  });
};

export const massmediaAPIs = {
  fetchMassMediaData,
  fetchMassMediaNews,
};

export const massmediaAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...massmediaAPIs,
    },
    dispatch
  );
};
