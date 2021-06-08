import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { singleNewsAPIActions } from '../../../api/singleNewsAPI';
import { singleNewsActionCreators } from '../../../slices/SingleNewsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchSingleNews = () => {
  const { setData, failFetch, startFetch } = singleNewsActionCreators();
  const { fetchSingleNews } = singleNewsAPIActions();
  const token = getItem('token');
  const { link } = useParams() as any;

  const fetch = useCallback(() => {
    startFetch();
    fetchSingleNews({
      onSuccess: (response) => {
        setData(response);
      },
      payload: {
        token,
        link,
      },
      onError: (errorResponse) => {
        failFetch();
        console.log(errorResponse);
      },
    });
  }, []);
  return { fetch };
};
