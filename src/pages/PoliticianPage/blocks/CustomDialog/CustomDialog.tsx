import React from 'react';
import type { FC } from 'react';
import { Button, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './CustomDialog.module.scss';

interface IProps {
  open?: boolean;
  next?: boolean;
  info?: string;
  url?: string;
  setNext?: any;
  setInfo?: any;
  setUrl?: any;
  handleClose?: any;
}

export const CustomDialog: FC<IProps> = ({ open, next, info, url, setNext, setInfo, setUrl, handleClose }) => {
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
      {!next ? (
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setNext(true);
          }}
          method="POST"
        >
          <h2>Спасибо за ваше участие, мы обязательно ознакомимся с вашим предложением!</h2>
          <div className={styles.fieldWrapper}>
            <TextField
              id="info"
              label="Предлагаемая информация"
              className={styles.textField}
              fullWidth
              placeholder="Предлагаемая информация"
              rows={4}
              required
              multiline
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <TextField
              id="url"
              label="Ссылка для подтверждения"
              className={styles.textField}
              fullWidth
              placeholder="Ссылка для подтверждения"
              required
              rows={2}
              multiline
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={styles.submitButton}
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            Отправить
          </Button>
        </form>
      ) : (
        <h2>Ваше предложение отправлено на рассмотрение</h2>
      )}
    </Dialog>
  );
};

export default CustomDialog;
