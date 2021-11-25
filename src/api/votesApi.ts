import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const fetchListElections = (args) => {
  return callAPI({
    url: 'getListElections',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

export const ListelectionsAPI = {
  fetchListElections
};

export const votesAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ListelectionsAPI,
    },
    dispatch
  );
};
