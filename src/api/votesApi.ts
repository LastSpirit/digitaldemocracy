import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

const fetchListElections = (args) =>
  callAPI({
    url: `getListElection`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

export const ListelectionsAPI = {
    fetchListElections
};

export const listElectionsAPIActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ListelectionsAPI,
    },
    dispatch
  );
};
