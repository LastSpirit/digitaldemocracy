import React from 'react';
import { useHistory } from 'react-router';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button } from '@material-ui/core';
import styles from './styles.module.scss';

export const BackButton = () => {
  const { push } = useHistory();
  return (
    <Button
      className={styles.backButton}
      onClick={() => push('/')}
    >
      <ArrowRightAltIcon
        className={styles.arrow}
      />
      <p>Назад</p>
    </Button>
  );
};
