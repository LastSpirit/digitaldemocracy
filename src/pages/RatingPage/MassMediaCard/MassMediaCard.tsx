import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import styles from './MassMediaCard.module.scss';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';
import { userSelectors } from '../../../slices/userSlice';
import { MassMediaDataI } from '../../../slices/massMediaSlice';
import { Loading } from '../../../components/Loading/Loading';
import { useChangeSubscribeMM } from '../hooks/useChangeSubscribeMM';
import { APIStatus } from '../../../lib/axiosAPI';

interface IProps extends MassMediaDataI {}

const MassMediaCard: FC<IProps> = ({ photo, rating, name, is_subscribed, id, short_link, place }) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribeMM(id);
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
      <Link to={`/mass-media/${short_link}/news`}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {!photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={photo} alt="" />}
          </div>
        </div>
      </Link>
      <div className={styles.second}>
        <div className={styles.badge}>
          <div className={styles.text}>{`Место ${place ?? '-'}`}</div>
        </div>
        <div className={styles.percent}>{`${rating ?? '-'} %`}</div>
      </div>
      <hr />
      <div className={styles.name}>{name}</div>
      <Button
        variant="outlined"
        color={is_subscribed ? 'secondary' : 'primary'}
        onClick={isAuthenticated ? change : handleClick}
        disabled={status === APIStatus.Loading}
        className={classNames([
          'MuiButton-containedPrimary',
          styles.subscriberButton,
          { '-disabled': !isAuthenticated },
        ])}
      >
        <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
          <span>
            {/* eslint-disable-next-line no-nested-ternary */}
            {status === APIStatus.Loading ? <Loading /> : is_subscribed ? 'Отписаться' : 'Следить'}
          </span>
        </Tooltip>
      </Button>
    </div>
  );
};

export default MassMediaCard;
