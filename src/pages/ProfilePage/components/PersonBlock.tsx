import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../ProfilePage.module.scss';
import { userActionCreators } from '../../../slices/userSlice';

interface PersonBlockProps {
  avatar?: string
}

const PersonBlock: FC<PersonBlockProps> = ({ avatar }) => {
  const { logout } = userActionCreators();
  return (
    <div className={styles.avatarBlock}>
      <div className={classNames(styles.avatar, { [styles.noAvatar]: !avatar })}>
        <img
          src={avatar}
          alt=""
        />
      </div>
      <Button
        className={styles.changeProfileButton}
      >
        Изменить профиль
      </Button>
      <Button
        onClick={logout}
        className={styles.changeProfileButton}
      >
        Выйти из профиля
      </Button>
    </div>
  );
};

export default PersonBlock;