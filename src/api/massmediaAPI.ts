import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { MassMediaDataI } from '../slices/massMediaSlice';

interface NewsRequest {
  link: string;
}

interface NewsResponse {
  data?: MassMediaDataI;
}

const fetchMassMediaData: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { link } = args.payload;
  return callAPI({
    url: `media/${link}`,
    config: { method: 'GET' },
    ...args,
  });
};

export const massmediaAPIs = {
  fetchMassMediaData,
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
