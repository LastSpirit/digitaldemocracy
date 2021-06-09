import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';
import { PoliticianInfoI } from '../../slices/politicianSlice';

interface IProps extends PoliticianInfoI {}

const PartyCard: FC<IProps> = ({ photo, percent, name, is_subscribed }) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={photo} alt="" />}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.badge}>
          <div className={styles.text}>Место 2</div>
        </div>
        <div className={styles.percent}>{percent}</div>
      </div>
      <hr />
      <div className={styles.name}>{name}</div>
      <div
        className={isAuthenticated ? (!is_subscribed ? styles.subscribe : styles.subscribed) : styles.subscribe}
        aria-hidden
        onClick={handleClick}
      >
        <p>{isAuthenticated ? (is_subscribed ? 'Подписка' : 'Подписаться') : 'Подписаться'}</p>
      </div>
    </div>
  );
};

export default PartyCard;
