import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Button, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFetchChanges } from '../../hooks/useFetchChanges';
import { Loading } from '../../../../components/Loading/Loading';
import styles from './CustomDialog.module.scss';

interface IProps {
  open?: boolean;
  next?: boolean;
  setNext?: any;
  handleClose?: any;
}

export const CustomDialog: FC<IProps> = ({ open, next, setNext, handleClose }) => {
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [isRequiredUrl, setIsRequiredUrl] = useState(false);
  const [isRequiredInfo, setIsRequiredInfo] = useState(false);
  const { fetch, status } = useFetchChanges();

  useEffect(() => {
    if (status === 'Success') {
      setNext(true);
    } else if (status === 'Failure') {
      setError(true);
    } else if (status === 'Initial') {
      setError(false);
    }
  }, [status]);

  const clearForms = () => {
    setUrl('');
    setInfo('');
    setIsRequiredUrl(false);
    setIsRequiredInfo(false);
  };

  useEffect(() => {
    if (info) {
      setIsRequiredInfo(false);
    }
    if (url) {
      setIsRequiredUrl(false);
    }
  }, [isRequiredInfo, isRequiredUrl, info, url]);

  const handeClick = () => {
    if (!info || !url) {
      if (!info) {
        setIsRequiredInfo(true);
      }
      if (!url) {
        setIsRequiredUrl(true);
      }
    }
  };

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
        <IconButton
          onClick={() => {
            handleClose();
            clearForms();
          }}
          className={styles.cross}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {!next ? (
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            fetch(info, url);
          }}
          method="POST"
        >
          <div>
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
                helperText={isRequiredInfo ? 'Поле обязательно для заполнения' : false}
                error={isRequiredInfo}
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
                helperText={isRequiredUrl ? 'Поле обязательно для заполнения' : error ? 'Ссылка неверна' : false}
                error={error || isRequiredUrl}
              />
            </div>
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={styles.submitButton}
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onClick={handeClick}
          >
            {status === 'Loading' ? <Loading /> : 'Отправить'}
          </Button>
        </form>
      ) : (
        <h2>Ваше предложение отправлено на рассмотрение</h2>
      )}
    </Dialog>
  );
};

export default CustomDialog;
