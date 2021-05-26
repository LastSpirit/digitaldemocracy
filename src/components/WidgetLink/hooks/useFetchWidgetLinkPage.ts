import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { widgetLinkAPI } from '../../../api/widgetLinkAPI';
import { widgetLinkSlice } from '../../../slices/widgetLinkSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchWidgetLinkData = () => {
  const dispatch = useDispatch();
  const { setData, addNews, setNews } = widgetLinkSlice.actions;
  const { fetchWidgetLink } = widgetLinkAPI;
  const [fetchNewsStatus, setFetchNewsStatus] = useState<APIStatus>(APIStatus.Initial);
  const [fetchDataStatus, setFetchDataStatus] = useState<APIStatus>(APIStatus.Initial);

  const setStatus = (fetchOnlyNews: boolean, status: APIStatus) => {
    if (fetchOnlyNews) {
      setFetchNewsStatus(status);
    } else setFetchDataStatus(status);
  };

  const fetch = useCallback((id?: string, page?: number, topic_id?: any, fetchOnlyNews?: boolean) => {
    let action;
    if (topic_id) {
      action = setNews;
    } else if (fetchOnlyNews) {
      action = addNews;
    } else {
      action = setData;
    }
    setStatus(fetchOnlyNews, APIStatus.Loading);
    dispatch(fetchWidgetLink({
      onSuccess: (response) => {
        setStatus(fetchOnlyNews, APIStatus.Success);
        dispatch(action({ ...response, page }));
      },
      payload: {
        topicId: topic_id === -1 ? undefined : topic_id,
        page,
        id
      },
      onError: (errorResponse) => {
        setStatus(fetchOnlyNews, APIStatus.Failure);
        console.log(errorResponse);
      }

    }));
  }, [fetchNewsStatus, fetchDataStatus]);

  return { fetch, fetchNewsStatus, fetchDataStatus };
};
