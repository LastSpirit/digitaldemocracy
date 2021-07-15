import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import styles from '../../ChangeProfilePage.module.scss';

export const PasswordForm = () => {
  return (
    <div className={styles.passwordWrapper}>
      <p>Сменить пароль</p>
      <form className={styles.email}>
        <div className={styles.password}>
          <div className={styles.input}>
            <InputLabel htmlFor="passwordold" className={styles.inputLabel}>
              Введите старый пароль
            </InputLabel>
            <TextField type="password" id="passwordold" variant={'outlined'} fullWidth />
          </div>
          <div className={styles.input}>
            <InputLabel htmlFor="passwordNew" className={styles.inputLabel}>
              Введите новый пароль
            </InputLabel>
            <TextField type="password" id="passwordNew" variant={'outlined'} fullWidth />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputLabel htmlFor="passwordNewRepeat" className={styles.inputLabel}>
              Повторите новый пароль
            </InputLabel>
            <TextField type="password" id="passwordNewRepeat" variant={'outlined'} fullWidth />
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
              Подтвердить изменения
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
