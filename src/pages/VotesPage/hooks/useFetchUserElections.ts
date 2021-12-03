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

  const fetchElections = useCallback((is_onlyBefore = 0, strDate = null) => {
    let date = null;
    if (strDate) {
      const convertedDate = new Date(strDate);
      const dd = String(convertedDate.getDate()).padStart(2, '0');
      const mm = String(convertedDate.getMonth() + 1).padStart(2, '0');
      const yyyy = convertedDate.getFullYear();
      date = `${yyyy}-${mm}-${dd}`;
    }

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
        date,
      },
    });
  }, [token]);
  return { fetchElections, statusElections };
};
