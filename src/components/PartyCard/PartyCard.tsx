import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';

interface IProps {
  url?: any;
  percent?: number;
  name: string;
  subscribe?: boolean;
}

const PartyCard: FC<IProps> = ({ url, percent, name, subscribe }) => {
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
  // const handle = () => {
  //   const newPath = matchPath(`/politician/${short_link}`, { path: '/politician/:link' });
  //   history.push(newPath.url);
  // };
  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {url ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={url} alt="" />}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.badge}>
          <div className={styles.text}>Место</div>
        </div>
        <div className={styles.percent}>{percent}%</div>
      </div>
      <hr />
      <div className={styles.name}>{name}</div>
      <div
        className={isAuthenticated ? (!subscribe ? styles.subscribe : styles.subscribed) : styles.subscribe}
        aria-hidden
        onClick={handleClick}
      >
        <p>{isAuthenticated ? (subscribe ? 'Подписка' : 'Подписаться') : 'Подписаться'}</p>
      </div>
    </div>
  );
};

export default PartyCard;
