import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import styles from './PartyCard.module.scss';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';
import { userSelectors } from '../../../slices/userSlice';
import { PartyI } from '../../../slices/politicianSlice';
import { Loading } from '../../../components/Loading/Loading';
import { APIStatus } from '../../../lib/axiosAPI';

interface IProps extends PartyI {}

const PartyCard: FC<IProps> = ({ logo, rating, name, id, short_link, place }) => {
  return (
    <div className={styles.root}>
      <Link to={`/party/${short_link}`}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {!logo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={logo} alt="" />}
          </div>
        </div>
      </Link>
      <div className={styles.second}>
        <div className={styles.badge}>
          <div className={styles.text}>{`Место ${place ?? '-'}`}</div>
        </div>
        <div className={styles.percent}>{rating ?? '-'} %</div>
      </div>
      <hr />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default PartyCard;
