import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { votesAPI } from '../../../api/votesApi';
import { electionsActionCreators } from '../../../slices/votesPageSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchUserElections = () => {
  const [statusElections, setStatusElections] = useState<APIStatus>(APIStatus.Initial);
  const { fetchUserElections } = votesAPI();
  const { setUserElections } = electionsActionCreators();
  const token = getItem('token');

  const fetchElections = useCallback((is_onlyBefore = 0) => {
    setStatusElections(APIStatus.Loading);
    fetchUserElections({
      onSuccess: (response) => {
        setUserElections(response);
        setStatusElections(APIStatus.Success);
      },
      onError: () => setStatusElections(APIStatus.Failure),
      payload: {
        token,
        is_onlyBefore,
      },
    });
  }, [token]);
  return { fetchElections, statusElections };
};
