import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../../lib/axiosAPI';
import { politicianAPI } from '../../../../api/politicianAPI';
import { politicianActionCreators } from '../../../../slices/politicianSlice';

export const useFetchRatingStatistic = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchRatingStatistics } = politicianAPI();
  const { setRatingStatistics } = politicianActionCreators();
  const { politicianId }: { politicianId: string } = useParams();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchRatingStatistics({
      onError: () => setStatus(APIStatus.Failure),
      onSuccess: (response) => {
        setRatingStatistics(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId)
      }
    });
  }, []);

  return { fetch, status };
};
