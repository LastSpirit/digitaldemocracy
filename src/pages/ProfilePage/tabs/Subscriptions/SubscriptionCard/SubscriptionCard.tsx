import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Tooltip } from '@material-ui/core';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import styles from './SubscriptionCard.module.scss';
import { useSearchParams } from '../../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../../types/routing';
import { PartyI } from '../../../../../slices/politicianSlice';
import { useUnsubscribe } from '../hooks/useUnsubscribe';
import { TypeSubscribe } from '../Subscriptions';

interface IProps {
  id?: number;
  name?: string;
  english_name?: string;
  photo?: string;
  is_subscribed?: boolean;
  percent?: string;
  number_of_subscribers?: number;
  party?: PartyI;
  party_logo?: string;
  position?: string | null;
  age?: number;
  city?: string;
  trust?: string;
  link?: string;
  rating?: string;
  short_link?: string;
  place?: number;
  type?: TypeSubscribe;
}

const SubscriptionCard: FC<IProps> = ({
  photo,
  rating,
  name,
  is_subscribed,
  id,
  short_link,
  position,
  place,
  type,
}) => {
  const { unsubscribe } = useUnsubscribe(type, id);
  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#363557',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '270px',
    },
  }))(Tooltip);

  const getLink = () => {
    switch (type) {
      case TypeSubscribe.POLITICIANS:
        return `/politician/${short_link}/politician_news`;
      case TypeSubscribe.AUTHORS:
        return `/author/${short_link}/news`;
      case TypeSubscribe.MEDIAS:
        return `/mass-media/${short_link}/news`;
      default:
        return '#';
    }
  };

  return (
    <div className={styles.root}>
      <LightTooltip title={position ?? ''}>
        <Link to={getLink()}>
          <div
            className={rating ? styles.avatarBlock : `${styles.avatarBlock} ${styles.avatarBlock__nonRaiting}`}
            style={rating ? { backgroundImage: `url(${avatarColorChanger(rating)})`, backgroundSize: 'cover' } : {}}
          >
            <div className={rating ? styles.avatar : `${styles.avatar} ${styles.avatar__nonRaiting}`}>
              {!photo ? (
                <PersonIcon className={styles.noAvatarIcon} />
              ) : (
                <img
                  src={photo}
                  alt=""
                  style={type === TypeSubscribe.MEDIAS ? { objectFit: 'contain' } : { objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </Link>
      </LightTooltip>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: badgeColorChanger(rating),
          }}
        >
          <div className={styles.text}>{place ? `Место ${place}` : 'Без рейтинга'}</div>
        </div>
        {rating && <div className={styles.percent}>{rating} %</div>}
      </div>
      <div className={styles.name}>{name}</div>
      <Button
        variant="outlined"
        color={'secondary'}
        onClick={unsubscribe}
        // disabled={/* status === APIStatus.Loading */}
        className={classNames([
          'MuiButton-containedPrimary',
          styles.subscriberButton,
          // { '-disabled': !isAuthenticated },
        ])}
      >
        Отписаться
      </Button>
    </div>
  );
};

export default React.memo(SubscriptionCard);