import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { AuthorDataI } from '../slices/authorSlice';

interface NewsRequest {
  link: string;
}

interface NewsResponse {
  data?: AuthorDataI;
}

const fetchAuthorData: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { link } = args.payload;
  return callAPI({
    url: `author/${link}`,
    config: { method: 'GET' },
    ...args,
  });
};

export const authorAPIs = {
  fetchAuthorData,
};

export const authorAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authorAPIs,
    },
    dispatch
  );
};
