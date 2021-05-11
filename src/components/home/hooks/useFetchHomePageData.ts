import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { homeAPI } from '../../../api/homeAPI';
import { homeSlice } from '../../../slices/homeSlice';

export const useFetchHomePageData = () => {
  const dispatch = useDispatch();
  const { setData, failFetch, startFetch } = homeSlice.actions;
  const { fetchHome } = homeAPI;

  const fetch = useCallback((page?: number, topic_id?: any) => {
    dispatch(startFetch());
    dispatch(fetchHome({
      onSuccess: (response) => {
        console.log(response);
        dispatch(setData(response));
      },
      payload: {
        topic_id,
        page
      },
      onError: (errorResponse) => {
        dispatch(failFetch());
        console.log(errorResponse);
      }

    }));
  }, []);

  return { fetch };
};
