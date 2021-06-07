import React from 'react';
import type { FC } from 'react';
import { Button, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './DialogSuggest.module.scss';
import Logo from '../../../components/Logo';

interface IProps {
  open?: boolean;
  handleClose?: any;
}

export const DialogSuggest: FC<IProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      disableScrollLock={true}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.crossWrapper}>
        <IconButton onClick={handleClose} className={styles.cross}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.textWrapper}>
        <div>Дорогой друг!</div>
        <div>Спасибо за ваше активное участие в политической жизни страны.</div>
        <div>Наши модераторы проверят новость на достоверность, а затем обязательно ее опубликуют ;)</div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
    </Dialog>
  );
};

export default DialogSuggest;
