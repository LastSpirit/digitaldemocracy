import { Button, Link, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import badgeColorChanger from 'src/utils/badgeColorChanger';
import PersonIcon from '@material-ui/icons/Person';
import styles from './VotingResult.module.scss';

const VotingResult = ({ outsideWinners }) => {
  const [button, setButton] = useState(true);
  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!outsideWinners.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={outsideWinners.photo} alt="" />}
        </div>
      </div>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#B0B0B0',
          }}
        >
          <div className={styles.text}>{outsideWinners.place} Место</div>
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
          marginTop: '40px',
        }}
      >
        {button ? 'Следить' : 'Отписаться'}
      </Button>
    </div>
  );
};

export default VotingResult;
