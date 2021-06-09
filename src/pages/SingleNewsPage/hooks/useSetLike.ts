import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store';
import { singleNewsAPIActions } from 'src/api/singleNewsAPI';
import { singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { getItem } from 'src/lib/localStorageManager';

export const useSetLike = () => {
  const isMassmediaLiked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_liked);
  const isMassmediaDisliked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_disliked);
  const { data } = useSelector((s: RootState) => s?.singleNews);
  const {
    startMassmediaLike,
    successMassmediaLike,
    failMassmediaLike,
    startMassmediaDislike,
    successMassmediaDislike,
    failMassmediaDislike,
  } = singleNewsActionCreators();
  const { massmediaLike, massmediaDislike } = singleNewsAPIActions();
  const token = getItem('token');
  const setMassMediaLike = useCallback(() => {
    console.log('like', isMassmediaLiked, isMassmediaDisliked);
    startMassmediaLike();
    massmediaLike({
      onSuccess: () => {
        if (isMassmediaLiked) {
          successMassmediaLike(false);
        } else {
          successMassmediaLike(true);
          if (isMassmediaDisliked) {
            successMassmediaDislike(false);
          }
        }
      },
      onError: () => {
        failMassmediaLike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        media_id: data?.currentNews?.media?.id,
      },
      variables: {
        isMassmediaLiked,
        token,
      },
    });
  }, [isMassmediaLiked, isMassmediaDisliked]);
  const setMassMediaDislike = useCallback(() => {
    console.log('dislike', isMassmediaDisliked, isMassmediaLiked);
    startMassmediaDislike();
    massmediaDislike({
      onSuccess: () => {
        if (isMassmediaDisliked) {
          successMassmediaDislike(false);
        } else {
          successMassmediaDislike(true);
          if (isMassmediaLiked) {
            successMassmediaLike(false);
          }
        }
      },
      onError: () => {
        failMassmediaDislike();
      },
      payload: {
        news_id: data?.currentNews?.id,
        media_id: data?.currentNews?.media?.id,
      },
      variables: {
        isMassmediaDisliked,
        token,
      },
    });
  }, [isMassmediaDisliked, isMassmediaLiked]);

  return { setMassMediaLike, setMassMediaDislike };
};

export default useSetLike;
