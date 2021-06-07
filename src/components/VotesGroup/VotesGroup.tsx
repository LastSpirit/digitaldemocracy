/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton } from '@material-ui/core';
import { ReactComponent as Like } from '../../icons/pictures/Like.svg';
import { ReactComponent as Dislike } from '../../icons/pictures/Dislike.svg';
import { ReactComponent as DislikeDisable } from '../../icons/pictures/DislikeDisable.svg';
import { ReactComponent as LikeDisable } from '../../icons/pictures/LikeDisable.svg';
import { useSearchParams } from '../../hooks/useSearchParams';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';
import styles from './VotesGroup.module.scss';

export const VotesGroup = () => {
  const { isMobile } = useWindowSize();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const { push } = useHistory();
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
        onClick={
          isAuthenticated
            ? () => {
                setLike(!like);
                setDislike(false);
              }
            : handleClickLogin
        }
      >
        {like ? (
          <Like className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        ) : (
          <LikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        )}
      </IconButton>
      <IconButton
        className={styles.likeButton}
        onClick={
          isAuthenticated
            ? () => {
                setDislike(!dislike);
                setLike(false);
              }
            : handleClickLogin
        }
      >
        {dislike ? (
          <Dislike className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        ) : (
          <DislikeDisable className={isMobile ? styles.likeButtonIconMobile : styles.likeButtonIcon} />
        )}
      </IconButton>
    </Box>
  );
};
