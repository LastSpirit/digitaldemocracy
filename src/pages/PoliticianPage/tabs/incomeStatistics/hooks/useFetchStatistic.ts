import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchStatistic = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setStatistic } = politicianActionCreators();
  const { fetchStatistic } = politicianAPI();
  const { politicianId }: { politicianId: string } = useParams();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchStatistic({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setStatistic(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
      },
    });
  }, []);

  return { fetch, status };
};
