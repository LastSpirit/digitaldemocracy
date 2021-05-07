import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { singleNewsAPI } from '../../../api/singleNewsAPI';
import { singleNewsSlice } from '../../../slices/SingleNewsSlice';

export const useFetchSingleNews = () => {
  const dispatch = useDispatch();
  const { setData, failFetch, startFetch } = singleNewsSlice.actions;
  const { fetchSingleNews } = singleNewsAPI;

  const fetch = useCallback(() => {
    dispatch(startFetch());
    dispatch(fetchSingleNews({
      onSuccess: (response) => {
        console.log(response);
        dispatch(setData(response.data));
      },
      payload: {
        link: 'PxaLoPnREWXnA5N8VW6h'
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
