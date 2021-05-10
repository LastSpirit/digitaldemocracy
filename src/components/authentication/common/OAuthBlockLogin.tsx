import React from 'react';
import GoogleLogin from 'react-google-login';
import { Box, Typography } from '@material-ui/core';
import styles from './OAuthBlockLogin.module.scss';
import { OAuthConfig } from '../../../config';
import { useOAuthRegister } from './hooks/useOAuthRegister';
import Yandex from '../../../icons/Yandex';

const OAuthBlockLogin = () => {
  const { yandexOAuth, googleOAuth, yandexError, googleError } = useOAuthRegister();

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.item}>
          <GoogleLogin
            className={styles.google}
            clientId={OAuthConfig.googleClientID}
            buttonText="Вход с аккаунтом Google"
            onSuccess={googleOAuth}
            onFailure={googleOAuth}
          />
        </Box>
        <Box className={styles.item}>
          <Box
            onClick={() => yandexOAuth()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <Yandex />
            <Typography
              color="black"
              sx={{ ml: 2, paddingBottom: '0px!important', fontFamily: 'unset!important' }}
            >
              Вход с аккаунтом Yandex
            </Typography>
          </Box>
        </Box>
      </Box>
      {(googleError || yandexError) && (
      <Box
        className={styles.error}
        style={{ textAlign: googleError ? 'left' : 'right' }}
      >
        {googleError || yandexError}
      </Box>
      )}
    </Box>
  );
};

export default OAuthBlockLogin;