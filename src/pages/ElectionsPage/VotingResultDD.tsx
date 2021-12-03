import { Button, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import badgeColorChanger from 'src/utils/badgeColorChanger';
import PersonIcon from '@material-ui/icons/Person';
import styles from './VotingResult.module.scss';

const VotingResultDD = ({ winners }) => {
  const [button, setButton] = useState(true);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {winners.photo || winners.logo ? (
            <img src={winners.photo || winners.logo} alt="" />
          ) : (
            <PersonIcon className={styles.noAvatarIcon} />
          )}
        </div>
      </div>
      <Link
        to={
          winners?.type === 'politician'
            ? `/politician/${winners?.short_link}/politician_news`
            : `/party/${winners?.short_link}/`
        }
      >
        <p className={styles.name}>{winners.name}</p>
      </Link>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#B0B0B0',
          }}
        >
          <div className={styles.text}>
            {winners.place} {t('info.place')}
          </div>
        </div>
        <div className={styles.percent}>{winners.election_vote_statistics.percent_rating_election}%</div>
      </div>
      <div className={styles.position}>
        <div className={styles.position_text}>
          {t('elections.voted')}: {winners.election_vote_statistics.count_voted_users_on_election} {t('info.people')}
        </div>
      </div>
      <div className={styles.button}>
        <Button
          variant="outlined"
          onClick={button ? () => setButton(false) : () => setButton(true)}
          style={{
            backgroundColor: button ? '#363557' : '#fff',
            borderColor: button ? '#363557' : '#BE3B21',
            color: button ? '#fff' : '#BE3B21',
            width: '100%',
          }}
        >
          {button ? t('buttons.subscribe') : t('buttons.unsubscribe')}
        </Button>
      </div>
    </div>
  );
};

export default VotingResultDD;
