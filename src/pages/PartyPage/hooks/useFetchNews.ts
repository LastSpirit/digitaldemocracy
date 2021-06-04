import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { politicianAPI } from '../../../api/politicianAPI';
import { politicianActionCreators } from '../../../slices/politicianSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchNews = () => {
  const { fetchNews } = politicianAPI();
  const { setNews } = politicianActionCreators();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>();
  const { politicianId }: { politicianId: string } = useParams();
  const fetch = (start_date: string, end_date: string) => {
    setStatus(APIStatus.Loading);
    fetchNews({
      onSuccess: (response) => {
        setNews(response);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setError(errorResponse);
        setStatus(APIStatus.Failure);
      },
      payload: {
        politician_id: Number(politicianId),
        end_date,
        start_date,
      }
    });
  };

  return { fetch, error, status };
};
