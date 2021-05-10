import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { User } from '../types/user';

export interface UserDataResponse extends User {}

const fetchUserData: APIRequest<{ token: string }, UserDataResponse> = (args) => callAPI({
  url: 'getUserForProfile',
  config: {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${args.payload.token}`
    }
  },
  ...args
});

const APIs = {
  fetchUserData
};

export const userAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs
  }, dispatch);
};
