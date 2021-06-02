import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchPromises = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setPromises } = politicianActionCreators();
  const { fetchPromises } = politicianAPI();
  const { politicianId }: { politicianId: string } = useParams();

  const fetch = useCallback(() => {
    fetchPromises({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setPromises(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId)
      }
    });
  }, []);

  return { fetch, status };
};
