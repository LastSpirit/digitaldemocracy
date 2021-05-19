import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import './styles.scss';

const InDevelop = () => (
  <div className="in-develop">
    <div className="container">
      <SettingsIcon
        fontSize="large"
        style={{ color: '#747373' }}
      />
      <span>Извините, эта часть сервиса находится в разработке</span>
    </div>
  </div>
);

export default InDevelop;
