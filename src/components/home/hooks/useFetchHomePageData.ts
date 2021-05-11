import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { homeAPI } from '../../../api/homeAPI';
import { homeSlice } from '../../../slices/homeSlice';

export const useFetchHomePageData = () => {
  const dispatch = useDispatch();
  const { setData, failFetch, startFetch, setNews } = homeSlice.actions;
  const { fetchHome } = homeAPI;

  const fetch = useCallback((page?: number, topic_id?: any) => {
    const action = !page || page === 1 ? setData : setNews;
    dispatch(startFetch());
    dispatch(fetchHome({
      onSuccess: (response) => {
        dispatch(action({ ...response, page }));
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
