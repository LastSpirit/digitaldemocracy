import { useCallback, useEffect } from 'react';
import { electionsAPIActions } from '../../../api/electionsAPI';
import { electionsActionCreators } from '../../../slices/electionsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchVoiceAdd = () => {
  const { failFetch, startFetch, successVoiceFetch, voiceFetch } = electionsActionCreators();
  const { fetchVoiceAdd } = electionsAPIActions();
  const token = getItem('token');

  const fetch = useCallback(
    (type: string, objectId: number, electionId: number) => {
      startFetch();
      fetchVoiceAdd({
        onSuccess: (response) => {
          successVoiceFetch();
          voiceFetch();
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
