import { Button, Link, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import badgeColorChanger from 'src/utils/badgeColorChanger';
import PersonIcon from '@material-ui/icons/Person';
import styles from './VotingResult.module.scss';

const VotingResultDD = () => {
  const [button, setButton] = useState(true);
  return (
    <div className={styles.root}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {true ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={'photo'} alt="" />}
        </div>
      </div>
      <div className={styles.name}>Партия РОСТ</div>
      <div className={styles.second}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: '#B0B0B0',
          }}
        >
          <div className={styles.text}>2 Место</div>
        </div>
        <div className={styles.percent}>42,2%</div>
      </div>

      <div className={styles.position}>
        <div className={styles.position_text}>Проголосовало: 25%</div>
        <div className={styles.position_text}>Проголосовало: 10 человек</div>
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

export default VotingResultDD;
