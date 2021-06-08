import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchPromises = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setPromises } = politicianActionCreators();
  const { fetchPromises } = politicianAPI();
  const politicianId = useSelector((s: RootState) => s?.politician?.data?.id);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchPromises({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setPromises(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
      },
    });
  }, []);

  return { fetch, status };
};
