import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import styles from '../../ChangeProfilePage.module.scss';

export const EmailForm = () => {
  return (
    <div className={styles.emailWrapper}>
      <p>Привязать e-mail</p>
      <form className={styles.email}>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputLabel htmlFor="email" className={styles.inputLabel}>
              E-mail
            </InputLabel>
            <TextField type="text" id="email" variant={'outlined'} fullWidth />
          </div>
          <div className={styles.buttons}>
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
              className={styles.button}
            >
              Подтвердить почту
            </Button>
          </div>
        </div>
      </form>
      <form className={styles.email}>
        <div className={styles.password}>
          <div className={styles.input}>
            <InputLabel htmlFor="password" className={styles.inputLabel}>
              Придумайте пароль
            </InputLabel>
            <TextField type="password" id="password" variant={'outlined'} fullWidth />
          </div>
          <div className={styles.input}>
            <InputLabel htmlFor="passwordrepet" className={styles.inputLabel}>
              Повторите пароль
            </InputLabel>
            <TextField type="password" id="passwordrepet" variant={'outlined'} fullWidth />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputLabel htmlFor="code" className={styles.inputLabel}>
              Введите код
            </InputLabel>
            <TextField type="text" id="code" variant={'outlined'} fullWidth />
          </div>
          <div className={styles.buttons}>
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
              className={styles.button}
            >
              Ввести код
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
