import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getItem } from 'src/lib/localStorageManager';
import { APIStatus } from '../../../../../lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';
import { politicianAPI } from '../../../../../api/politicianAPI';

export const useFetchAdditionalInformation = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const {
    setPromises,
    startPromiseLike,
    successPromiseLike,
    failPromiseLike,
    startPromiseDislike,
    successPromiseDislike,
    failPromiseDislike,
  } = politicianActionCreators();
  const { fetchPromises, politicianLike, politicianDislike } = politicianAPI();
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
  const setPromisesLike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isPromiseLiked = isLiked;
    const isPromiseDisliked = isDisliked;
    startPromiseLike({ id });
    politicianLike({
      onSuccess: () => {
        if (isPromiseLiked) {
          successPromiseLike({ index, id, status: false });
        } else {
          successPromiseLike({ index, id, status: true });
          if (isPromiseDisliked) {
            successPromiseDislike({ index, id, status: false });
          }
        }
      },
      onError: () => {
        failPromiseLike({ id });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'politician_promise',
        politician_promise_id: id,
      },
      variables: {
        isPromiseLiked,
        token,
      },
    });
  }, []);

  const setPromisesDislike = useCallback(({ index, id, isLiked, isDisliked }) => {
    const isPromiseLiked = isLiked;
    const isPromiseDisliked = isDisliked;
    startPromiseDislike({ id });
    politicianDislike({
      onSuccess: () => {
        if (isPromiseDisliked) {
          successPromiseDislike({ index, id, status: false });
        } else {
          successPromiseDislike({ index, id, status: true });
          if (isPromiseLiked) {
            successPromiseLike({ index, id, status: false });
          }
        }
      },
      onError: () => {
        failPromiseDislike({ id });
      },
      payload: {
        politician_id: politicianId,
        voting_place: 'politician_promise',
        politician_promise_id: id,
      },
      variables: {
        isPromiseDisliked,
        token,
      },
    });
  }, []);

  return { fetch, status, setPromisesLike, setPromisesDislike };
};
