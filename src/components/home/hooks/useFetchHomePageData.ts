import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { homeAPI } from '../../../api/homeAPI';
import { homeSlice } from '../../../slices/homeSlice';

export const useFetchHomePageData = () => {
  const dispatch = useDispatch();
  const { setData, setStatus } = homeSlice.actions;
  const { fetchHome } = homeAPI;

  const fetch = useCallback(() => {
    dispatch(setStatus(APIStatus.Loading));
    dispatch(fetchHome({
      onSuccess: (response) => {
        console.log(response.data);
        dispatch(setData(response.data));
        dispatch(setStatus(APIStatus.Success));
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      }

    }));
  }, []);

  useEffect(() => {
    fetch();
  }, []);
};
