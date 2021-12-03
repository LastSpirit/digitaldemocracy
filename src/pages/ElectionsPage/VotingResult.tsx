import { Button, Link, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import badgeColorChanger from 'src/utils/badgeColorChanger';
import PersonIcon from '@material-ui/icons/Person';
import styles from './VotingResult.module.scss';

const VotingResult = ({ outsideWinners }) => {
  const [button, setButton] = useState(true);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {outsideWinners.photo || outsideWinners.logo ? (
            <img src={outsideWinners.photo || outsideWinners.logo} alt="" />
          ) : (
            <PersonIcon className={styles.noAvatarIcon} />
          )}
        </div>
      </div>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#B0B0B0',
          }}
        >
          <div className={styles.text}>
            {outsideWinners.place} {t('info.place')}
          </div>
        </div>
        <div className={styles.percent}>{outsideWinners.percent_rating_election}%</div>
      </div>

      <div className={styles.positionText}>
        <div className={styles.positionText_text}>{outsideWinners.name}</div>
      </div>
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
  );
};

export default VotingResult;
