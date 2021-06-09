/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton } from '@material-ui/core';
import { ReactComponent as Like } from 'src/icons/pictures/Like.svg';
import { ReactComponent as Dislike } from 'src/icons/pictures/Dislike.svg';
import { ReactComponent as DislikeDisable } from 'src/icons/pictures/DislikeDisable.svg';
import { ReactComponent as LikeDisable } from 'src/icons/pictures/LikeDisable.svg';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { RootState } from 'src/store';
import { APIStatus } from 'src/lib/axiosAPI';
import styles from './VotesGroup.module.scss';
import { useSetLike } from '../../hooks/useSetLike';

export const MassmediaVotesGroup = () => {
  const { isMobile } = useWindowSize();
  const isMassmediaLiked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_liked);
  const isMassmediaDisliked = useSelector((s: RootState) => s?.singleNews?.data?.currentNews?.media?.is_user_disliked);
  const { likeStatus, dislikeStatus } = useSelector((s: RootState) => s?.singleNews);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { setMassMediaLike, setMassMediaDislike } = useSetLike();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClickLogin = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

  return (
    <Box className={styles.likeButtons}>
      <IconButton
        className={styles.likeButton}
        sx={{ marginRight: '10px' }}
        onClick={() => {
          if (likeStatus !== APIStatus.Loading) {
            if (isAuthenticated) {
              setMassMediaLike();
            } else {
              handleClickLogin();
            }
          }
        }}
      >
        {isMassmediaLiked ? (
          <Like className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        ) : (
          <LikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        )}
      </IconButton>
      <IconButton
        className={styles.likeButton}
        onClick={() => {
          if (dislikeStatus !== APIStatus.Loading) {
            if (isAuthenticated) {
              setMassMediaDislike();
            } else {
              handleClickLogin();
            }
          }
        }}
      >
        {isMassmediaDisliked ? (
          <Dislike className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        ) : (
          <DislikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        )}
      </IconButton>
    </Box>
  );
};
