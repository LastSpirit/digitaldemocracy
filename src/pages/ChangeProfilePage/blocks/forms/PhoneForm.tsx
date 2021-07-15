import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import styles from '../../ChangeProfilePage.module.scss';

export const PhoneForm = () => {
  return (
    <div className={styles.phoneWrapper}>
      <p>Привязать номер телефона</p>
      <form className={styles.phone}>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputLabel htmlFor="phone" className={styles.inputLabel}>
              Введите телефон
            </InputLabel>
            <TextField type="text" id="phone" variant={'outlined'} fullWidth />
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
              Подтвердить телефон
            </Button>
          </div>
        </div>
      </form>
      <form className={styles.phone}>
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

export default PhoneForm;
