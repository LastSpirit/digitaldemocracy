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
interface NewsErr {}

interface NewsVar {
  token?: string;
}

interface SubRequest {
  author_id?: number;
}

interface SubResponse {
  data?: AuthorDataI;
}
interface SubErr {}

interface SubVar {
  isSubscribed?: boolean;
  token?: string;
}

const fetchAuthorData: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { link } = args.payload;
  const { token } = args.variables;
  return callAPI({
    url: `author/${link}`,
    config: { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } },
    ...args,
  });
};

const fetchAuthorNews: APIRequest<NewsRequest, NewsResponse, NewsErr, NewsVar> = (args) => {
  const { params } = args.payload;
  const { token } = args.variables;
  return callAPI({
    url: 'authorNews',
    config: { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, params },
    ...args,
  });
};

const authorSubscribe: APIRequest<SubRequest, SubResponse, SubErr, SubVar> = (args) => {
  const { isSubscribed, token } = args.variables;
  return callAPI({
    url: isSubscribed ? 'unsubscribeFromAuthor' : 'subscribeToAuthor',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

export const authorAPIs = {
  fetchAuthorData,
  fetchAuthorNews,
  authorSubscribe,
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
