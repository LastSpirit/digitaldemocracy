import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

const fetchElections = (args) =>
  callAPI({
    url: `getElection/${args.payload.link}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

export const electionsAPI = {
  fetchElections
};

export const electionsAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...electionsAPI,
    },
    dispatch
  );
};
