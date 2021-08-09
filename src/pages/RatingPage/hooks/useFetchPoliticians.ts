import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchPoliticians = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchRatingPoliticians } = ratingAPI();
  const { setPoliticians } = ratingActionCreators();
  const { sort_direction, sort_field, sort_geography, sort_vote } = useSelector((s: RootState) => s.rating);
  const token = getItem('token');

  const { country_user_id, region_user_id, city_user_id } = sort_vote;
  const { country_politician_id, region_politician_id, city_politician_id } = sort_geography;
  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchRatingPoliticians({
      onSuccess: (response) => {
        setPoliticians(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        token,
        params: {
          orderBy: sort_direction,
          sortBy: sort_field,
          country_politician_id,
          region_politician_id,
          city_politician_id,
          country_user_id,
          region_user_id,
          city_user_id,
        },
      },
    });
  }, [sort_direction, sort_field, token, city_politician_id, sort_geography, city_user_id]);

  return { fetch, status };
};
