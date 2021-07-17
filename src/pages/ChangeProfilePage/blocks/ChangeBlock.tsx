import React from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { userActionCreators } from 'src/slices/userSlice';
import { MainForm } from './forms/MainForm';
import { Accounts } from './Accounts';
import { PhoneForm } from './forms/PhoneForm';
import { EmailForm } from './forms/EmailForm';
import { PasswordForm } from './forms/PasswordForm';
import styles from '../ChangeProfilePage.module.scss';

export const ChangeBlock = () => {
  const { logout } = userActionCreators();
  const data = useSelector((s: RootState) => s.profile.data);

  return (
    <div className={styles.tabContent}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Личная информация</div>
        <Button
          className={styles.logoutButton}
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
          onClick={logout}
        >
          Выйти из аккаунта
        </Button>
      </div>
      <div className={styles.longVerticalBlock}>
        <div className={styles.helloMessage}>
          Все данные вашего профиля могут быть использованы только для верификации вашего профиля и для обезличенной
          статистики на данном ресурсе. Эти данные не будут использованы никаким другим образом, а также переданы
          кому-либо
        </div>
        <div className={styles.avatarBlock}>
          <div className={styles.avatarContainer}>
            <img src={data.userProfile?.avatar} alt="img" />
          </div>
          <form action="" method="POST" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            <input type="file" id="avatar" accept="image/*" hidden multiple />
            <label htmlFor="avatar" className={styles.uploadButton}>
              {/* <Button
                className={styles.uploadButton}
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
              > */}
              Загрузить фото
              {/* </Button> */}
            </label>
          </form>
        </div>
        <MainForm />
        <Accounts />
        <PhoneForm />
        <EmailForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default ChangeBlock;
