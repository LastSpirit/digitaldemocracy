import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './styles.module.scss';

export const DonationPage = () => (
  <div className={styles.donation}>
    <div className={styles.container}>
      <SettingsIcon
        fontSize="large"
        style={{ color: '#747373' }}
      />
      <span>Извините, эта часть сервиса находится в разработке</span>
    </div>
  </div>
);
