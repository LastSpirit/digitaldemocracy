import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { RootState } from '../store';

export type GenericAppThunk<RootState> = ThunkAction<void, RootState, null, Action<string>>;

export interface CallAPIParams {
  url: string
  payload?: any
  onSuccess?: (response: any, headers?: any) => void
  includeHeaders?: string[]
  onError?: (errorResponse: AxiosError) => void
  reducerData?: any
  config?: AxiosRequestConfig
}

export enum APIStatus {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure',
}

export type CallAPI<AppThunk> = (params: CallAPIParams) => AppThunk;

const baseURL = 'https://jsonplaceholder.typicode.com'; // Change real baseUrl

export const getCallAPI = <RootState>(): CallAPI<GenericAppThunk<RootState>> => (
  props
) => async () => {
  const { url, payload, onSuccess, onError, config, includeHeaders } = props;

  try {
    const method = config?.method;
    let response;
    if (method && method.toLowerCase() === 'get') {
      response = await axios.get(baseURL + url, config);
    } else {
      response = await axios.post(baseURL + url, payload, config);
    }
    const headers = includeHeaders ? pick(response.headers, includeHeaders) : undefined;
    if (onSuccess) onSuccess(response.data, headers);
  } catch (err) {
    console.error(err);
    if (onError) onError(err);
  }
};

export const callAPI = getCallAPI<RootState>();

export interface APIRequestParams<Req, Res> {
  payload?: Req
  onSuccess?: (response: Res) => void
  onError?: (errorResponse: AxiosError) => void
  config?: AxiosRequestConfig
}

export type GenericAPIRequest<RootState, Req = null, Res = null> = (
  params: APIRequestParams<Req, Res>
) => GenericAppThunk<RootState>;

export type APIRequest<Req = null, Res = null> = GenericAPIRequest<
RootState,
Req,
Res
>;
