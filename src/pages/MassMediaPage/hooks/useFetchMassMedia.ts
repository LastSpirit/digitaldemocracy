import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { massmediaAPIActions } from '../../../api/massmediaAPI';
import { massmediaActionCreators } from '../../../slices/massMediaSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchMassMedia = () => {
  const { fetchMassMediaData } = massmediaAPIActions();
  const { setMassMediaData } = massmediaActionCreators();
  const { link }: { link: string } = useParams();
  const token = getItem('token');
  const fetchData = useCallback(() => {
    fetchMassMediaData({
      onSuccess: (response) => {
        setMassMediaData(response);
      },
      onError: (err) => {},
      payload: {
        link,
      },
    });
  }, [link]);

  return { fetchData };
};
