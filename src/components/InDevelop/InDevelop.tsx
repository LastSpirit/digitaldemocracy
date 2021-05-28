import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import './styles.scss';
import { Link } from 'react-router-dom';

const InDevelop = () => (
  <div className="in-develop">
    <div className="container">
      <SettingsIcon
        fontSize="large"
        style={{ color: '#747373' }}
      />
      <span>Извините, эта часть сервиса находится в разработке</span>
      <Link to="/donation">Нажмите, чтобы пожертвовать сервису</Link>
    </div>
  </div>
);

export default InDevelop;
