import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import styles from './Loading.module.scss';

export const FailLoading = () => {
  const { goBack, length, push } = useHistory() as any;
  return (
    <>
      <div className={styles.buttonRow}>
        <Button variant="outlined" className={styles.backButton} onClick={() => (length > 2 ? goBack() : push('/'))}>
          <div className={styles.icon}>←</div>
          <div className={styles.text}>Назад</div>
        </Button>
      </div>
      <Alert variant="outlined" severity="warning">
        К сожалению, нам не удалось найти автора по Вашему запросу. Нажмите кнопку &apos;Назад&lsquo; для перехода на
        прошлую страницу.
      </Alert>
    </>
  );
};