import React from 'react';
import { useHistory } from 'react-router';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button } from '@material-ui/core';
import styles from './styles.module.scss';

export const BackButton = () => {
  const { goBack, length, push } = useHistory() as any;
  console.log(length);
  return (
    <div className={styles.buttonRow}>
      <Button variant="outlined" className={styles.backButton} onClick={() => (length > 2 ? goBack() : push('/'))}>
        <div className={styles.icon}>←</div>
        <div className={styles.text}>Назад</div>
      </Button>
    </div>
  );
};
