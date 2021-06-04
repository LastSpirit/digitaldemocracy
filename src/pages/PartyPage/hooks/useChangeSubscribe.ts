import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { politicianActionCreators, politicianSelectors } from '../../../slices/politicianSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useChangeSubscribe = () => {
  const isSubscribe = useSelector(politicianSelectors.getIsSubscribe());
  const { setIsSubscribe } = politicianActionCreators();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { subscribe, unsubscribe } = politicianAPI();
  const { politicianId }: { politicianId: string } = useParams();
  const token = getItem('token');
  const api = isSubscribe ? unsubscribe : subscribe;

  const change = useCallback(() => {
    setStatus(APIStatus.Loading);
    api({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: () => {
        setIsSubscribe(!isSubscribe);
        setStatus(APIStatus.Success);
      },
      payload: {
        politician_id: Number(politicianId),
        token
      }
    });
  }, [isSubscribe]);

  return { change, status };
};
