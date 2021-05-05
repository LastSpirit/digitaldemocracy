import axios, { AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { RootState } from '../store';

export type GenericAppThunk<RootState> = ThunkAction<void, RootState, null, Action<string>>;

export interface ErrorI {
  message: string
  success: boolean
}

export interface CallAPIParams {
  url: string
  payload?: any
  onSuccess?: (response: any, headers?: any) => void
  includeHeaders?: string[]
  onError?: (errorResponse: ErrorI) => void
  reducerData?: any
  config?: AxiosRequestConfig
  customBaseUrl?: string
}

export enum APIStatus {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure',
}

export type CallAPI<AppThunk> = (params: CallAPIParams) => AppThunk;

const baseURL = 'https://dev-backoffice.digitaldemocracy.ru/api/';

export const getCallAPI = <RootState>(): CallAPI<GenericAppThunk<RootState>> => (
  props
) => async () => {
  const { url, payload, onSuccess, onError, config, includeHeaders, customBaseUrl } = props;

  try {
    const method = config?.method;
    let response;
    if (method && method.toLowerCase() === 'get') {
      response = await axios.get((customBaseUrl || baseURL) + url, config);
    } else {
      response = await axios.post((customBaseUrl || baseURL) + url, payload, config);
    }
    const headers = includeHeaders ? pick(response.headers, includeHeaders) : undefined;
    if (response.data.success && response.data.data && onSuccess) onSuccess(response.data.data, headers);
    if ((!response.data.success || !response.data.data) && onError) onError(response.data.message);
  } catch (err) {
    console.log(err);
    if (onError) onError(err);
  }
};

export const callAPI = getCallAPI<RootState>();

export interface APIRequestParams<Req, Res> {
  payload?: Req
  onSuccess?: (response: Res) => void
  onError?: (errorResponse: ErrorI) => void
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
