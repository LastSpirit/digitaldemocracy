import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { votesAPI } from '../../../api/votesApi';
import { electionsActionCreators } from '../../../slices/votesPageSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchListElections = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchListElections } = votesAPI();
  const { setVotes } = electionsActionCreators();
  const token = getItem('token');

  const fetch = useCallback((page = 1) => {
    setStatus(APIStatus.Loading);
    fetchListElections({
      onSuccess: (response) => {
        setVotes(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        token,
        page,
        // orderBy: sort_direction,
        // sortBy: sort_field,
        // country_politician_id: country_politician_idArray,
        // region_politician_id: region_politician_idArray,
        // city_politician_id: city_politician_idArray,
        // country_user_id: country_user_idArray,
        // region_user_id: region_user_idArray,
        // city_user_id: city_user_idArray,
        // is_world_votes: worldVotes ? 1 : 0,
        // is_world_politicians: world ? 1 : 0,
      },
    });
  }, [token]);
  return { fetch, status };
};
