import React, { useState } from 'react';
import { userAPI } from 'src/api/userAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { userActionCreators } from 'src/slices/userSlice';
import { getItem } from '../../../../../lib/localStorageManager';

export const useFetchDossierTable = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { fetchDossierTable } = userAPI();
  const { setDossierTablePoliticians } = userActionCreators();
  const token = getItem('token');
  const fetch = () => {
    setStatus(APIStatus.Loading);
    fetchDossierTable({
      onSuccess: (response) => {
        setStatus(APIStatus.Success);
        setDossierTablePoliticians(response.politicians);
      },
      onError: (error) => {
        console.log('error', error);
      },
      payload: {
        token,
      },
    });
  };
  return { fetch, status };
};
