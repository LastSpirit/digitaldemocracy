import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AuthorDataI } from 'src/slices/authorSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface NewsRequest {
  link?: string;
  params?: ParamsI;
}

interface ParamsI {
  orderBy?: string;
  sortBy?: string;
  page?: number;
  authorId?: number;
}

interface NewsResponse {
  data?: AuthorDataI;
}

const fetchAuthorData: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { link } = args.payload;
  return callAPI({
    url: `author/${link}`,
    config: { method: 'GET', headers: { Accept: 'application/json' } },
    ...args,
  });
};

const fetchAuthorNews: APIRequest<NewsRequest, NewsResponse> = (args) => {
  const { params } = args.payload;
  return callAPI({
    url: 'authorNews',
    config: { method: 'GET', headers: { Accept: 'application/json' }, params },
    ...args,
  });
};

export const authorAPIs = {
  fetchAuthorData,
  fetchAuthorNews,
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
