import { useCallback, useState } from 'react';
import { APIStatus } from '../../../../../lib/axiosAPI';
// import { politicianAPI } from '../../../../../api/politicianAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';

export const useFetchHistory = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const { fetchPositionHistory } = politicianAPI();
  const { setHistory } = politicianActionCreators();
  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    setTimeout(() => {
      setHistory([
        { id: 1, position: 'Первая должность', type: 'Выбран ленинским районом города Томска', percent: '16%', years: '2012-2013' },
        { id: 2, position: 'Вторая должность', type: 'Назначенный Мэром Томска', percent: '70%', years: '2014-2015' },
        { id: 3, position: 'Третья должность', type: 'Выбран ленинским районом города Новосибирск', percent: '56%', years: '2015-2016' },
        { id: 4, position: 'Четвертая должность', type: 'Назначенный Мэром Томска', percent: '56%', years: '2017-2020' },
      ]);
      setStatus(APIStatus.Success);
    }, 1000);
    // fetchPositionHistory({
    //   onSuccess: (response) => {
    //     setHistory(response);
    //     setStatus(APIStatus.Success);
    //   },
    //   onError: () => {
    //     setStatus(APIStatus.Failure);
    //   }
    // });
  }, []);

  return { fetch, status };
};
