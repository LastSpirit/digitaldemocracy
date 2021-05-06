import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { newsSlice } from '../../../slices/newsSlice';

export const useFetchNews = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setData } = newsSlice.actions;

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    dispatch(setData([{
      title: 'title',
      image: '',
      author: 'Ivan Ivanov',
      date: 17.11,
      site: 'google.com',
      viewed: 21,
    }, {
      title: 'title 2',
      image: '',
      author: 'Ivan Ivanov 2',
      date: 17.11,
      site: 'yandex.com',
      viewed: 2121,
    }, {
      title: 'title',
      image: '',
      author: 'Ivan Ivanov',
      date: 17.11,
      site: 'google.com',
      viewed: 21,
    },
    { title: 'title',
      image: '',
      author: 'Ivan Ivanov',
      date: 17.11,
      site: 'google.com',
      viewed: 21,
    }, {
      title: 'title 2',
      image: '',
      author: 'Ivan Ivanov 2',
      date: 17.11,
      site: 'yandex.com',
      viewed: 2121,
    }, {
      title: 'title',
      image: '',
      author: 'Ivan Ivanov',
      date: 17.11,
      site: 'google.com',
      viewed: 21, }]));
    // dispatch(fetchNews({
    //   onError: () => {
    //     setStatus(APIStatus.Failure);
    //   },
    //   onSuccess: (response) => {
    //     dispatch(setData(response.data));
    //     setStatus(APIStatus.Success);
    //   }
    // }));
  }, []);

  return {
    fetch,
    status,
  };
};
