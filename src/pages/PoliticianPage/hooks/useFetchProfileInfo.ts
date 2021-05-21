import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { politicianActionCreators } from '../../../slices/politicianSlice';

export const useFetchProfileInfo = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchProfileInfo } = politicianAPI();
  const { setPoliticianInfo } = politicianActionCreators();
  const { politicianId }: { politicianId: string } = useParams();
  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchProfileInfo({
      onSuccess: (response) => {
        setPoliticianInfo(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        id: Number(politicianId),
      }
    });
  }, []);

  return { fetch, status };
};
