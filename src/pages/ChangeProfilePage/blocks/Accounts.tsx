import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { APIStatus } from 'src/lib/axiosAPI';
import { Button } from '@material-ui/core';
import { Loading } from 'src/components/Loading/Loading';
import GoogleLogin from 'react-google-login';
import { OAuthConfig } from 'src/config';
import Google from 'src/icons/pictures/Google.png';
import Yandex from 'src/icons/pictures/Yandex.png';
import { useGoogleRegister } from '../hooks/useGoogleRegister';
import styles from '../ChangeProfilePage.module.scss';

export const Accounts = () => {
  const { googleOAuth, googleExit, googleError, status } = useGoogleRegister();
  const { data } = useSelector((s: RootState) => s.profile);
  const checkGoogleType = data?.userRegistrationTypes?.find((item) => item?.user_registration_type === 'Гугл аккаунт');
  return (
    <div className={styles.account}>
      <h4>Привязать учетную запись</h4>
      <div className={styles.border}>
        <img src={Yandex} alt="yandex" />
        <Button
          sx={{
            p: 1,
            paddingRight: 2,
            paddingLeft: 2,
            borderRadius: 100,
            mr: 3,
            textDecoration: 'none',
          }}
          size="small"
          variant="outlined"
          className={styles.accountButton}
        >
          Привязать
        </Button>
      </div>
      <div className={styles.border}>
        <img src={Google} alt="google" />
        <GoogleLogin
          className={styles.google}
          clientId={OAuthConfig.googleClientID}
          buttonText="Вход с аккаунтом Google"
          render={(renderProps) => (
            <Button
              sx={{
                p: 1,
                paddingRight: 2,
                paddingLeft: 2,
                borderRadius: 100,
                mr: 3,
                textDecoration: 'none',
              }}
              size="small"
              variant="outlined"
              className={styles.accountButton}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {status === APIStatus.Loading ? <Loading color="white" /> : checkGoogleType ? 'Отвязать' : 'Привязать'}
            </Button>
          )}
          onSuccess={checkGoogleType ? googleExit : googleOAuth}
          onFailure={(error) => {
            console.log(error);
          }}
        />
      </div>
      {(
        <div className={styles.message} style={{ color: 'red' }}>
          {googleError}
        </div>
      ) || null}
    </div>
  );
};

export default Accounts;
