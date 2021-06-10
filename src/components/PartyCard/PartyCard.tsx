import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { ModalParams } from '../../types/routing';
import { userSelectors } from '../../slices/userSlice';
import { PoliticianInfoI } from '../../slices/politicianSlice';
import { Loading } from '../Loading/Loading';
import { useChangeSubscribe } from '../../pages/PartyPage/hooks/useChangeSubscribe';
import { APIStatus } from '../../lib/axiosAPI';

interface IProps extends PoliticianInfoI {}

const PartyCard: FC<IProps> = ({ photo, percent, name, is_subscribed, id }) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { status, change } = useChangeSubscribe(id);
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

export default PartyCard;
