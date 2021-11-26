import { useCallback, useEffect } from 'react';
import { electionsAPIActions } from '../../../api/electionsAPI';
import { electionsActionCreators } from '../../../slices/electionsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchVoiceDelete = () => {
  const { failFetch, startFetch, successFetch } = electionsActionCreators();
  const { fetchVoiceDelete } = electionsAPIActions();
  const token = getItem('token');

  const fetch = useCallback(
    (type: string, objectId: number, electionId: number,) => {
      startFetch();
      fetchVoiceDelete({
        onSuccess: (response) => {
          successFetch();
          console.log(response);
        },
        payload: {
          token,
          type,
          objectId,
          electionId,
        },
        onError: (errorResponse) => {
          failFetch();
          console.log(errorResponse);
        },
      });
    },
    [token]
  );
  return { fetch };
};
