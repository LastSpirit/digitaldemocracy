import React from 'react';
import { Button } from '@material-ui/core';
import Google from 'src/icons/pictures/Google.png';
import Yandex from 'src/icons/pictures/Yandex.png';
import styles from '../ChangeProfilePage.module.scss';

export const Accounts = () => {
  return (
    <div className={styles.account}>
      <p>Привязать учетную запись</p>
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
    </div>
  );
};

export default Accounts;
