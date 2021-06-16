/* eslint-disable import/no-cycle */
import React, { useState, FC } from 'react';
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

interface IProps {
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export const MassmediaVotesGroup: FC<IProps> = ({ likes, dislikes, isLiked, isDisliked }) => {
  const { isMobile } = useWindowSize();
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
      <div className={styles.buttonContainer}>
        <IconButton
          className={styles.likeButton}
          sx={{ marginRight: '10px' }}
          onClick={() => {
            if (likeStatus !== APIStatus.Loading && dislikeStatus !== APIStatus.Loading) {
              if (isAuthenticated) {
                setMassMediaLike();
              } else {
                handleClickLogin();
              }
            }
          }}
        >
          {isLiked ? (
            <Like className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
          ) : (
            <LikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
          )}
        </IconButton>
        <div className={styles.votes}>{likes}</div>
      </div>
      <div className={styles.buttonContainer}>
        <IconButton
          className={styles.likeButton}
          onClick={() => {
            if (dislikeStatus !== APIStatus.Loading && likeStatus !== APIStatus.Loading) {
              if (isAuthenticated) {
                setMassMediaDislike();
              } else {
                handleClickLogin();
              }
            }
          }}
        >
          {isDisliked ? (
            <Dislike className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
          ) : (
            <DislikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
          )}
        </IconButton>
        <div className={styles.votes}>{dislikes}</div>
      </div>
    </Box>
  );
};
