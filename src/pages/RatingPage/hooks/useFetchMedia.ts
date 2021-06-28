import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchMedia = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchRatingMassMedia } = ratingAPI();
  const { setMedia } = ratingActionCreators();
  const { sort_direction, sort_field } = useSelector((s: RootState) => s.rating);
  const token = getItem('token');

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchRatingMassMedia({
      onSuccess: (response) => {
        setMedia(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        token,
        params: {
          orderBy: sort_direction,
          sortBy: sort_field,
        },
      },
    });
  }, [sort_direction, sort_field, token]);

  return { fetch, status };
};
