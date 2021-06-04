import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { authorAPIActions } from '../../../api/authorAPI';
import { authorActionCreators } from '../../../slices/authorSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchAuthor = () => {
  const { fetchAuthorData } = authorAPIActions();
  const { setAuthorData } = authorActionCreators();
  const { link }: { link: string } = useParams();
  const token = getItem('token');
  const fetchData = useCallback(() => {
    fetchAuthorData({
      onSuccess: (response) => {
        setAuthorData(response);
      },
      onError: (err) => {},
      payload: {
        link,
      },
    });
  }, [link]);

  return { fetchData };
};
