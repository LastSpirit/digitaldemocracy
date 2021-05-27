import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { singleNewsAPI } from '../../../api/singleNewsAPI';
import { singleNewsSlice } from '../../../slices/SingleNewsSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchSingleNews = (link: string) => {
  const dispatch = useDispatch();
  const { setData, failFetch, startFetch } = singleNewsSlice.actions;
  const { fetchSingleNews } = singleNewsAPI;
  const token = getItem('token');

  const fetch = useCallback(() => {
    dispatch(startFetch());
    dispatch(fetchSingleNews({
      onSuccess: (response) => {
        dispatch(setData(response));
      },
      payload: {
        token,
        link
      },
      onError: (errorResponse) => {
        dispatch(failFetch());
        console.log(errorResponse);
      }
    }));
  }, []);

  useEffect(() => {
    fetch();
  }, []);
};
