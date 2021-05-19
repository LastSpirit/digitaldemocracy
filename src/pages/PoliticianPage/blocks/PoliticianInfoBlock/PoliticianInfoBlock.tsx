import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';

const PoliticianInfoBlock = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const [subscribed, setSubscribed] = useState(data?.subscribed);
  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!data?.avatar ? (
            <PersonIcon className={styles.noAvatarIcon} />
          ) : (
            <img
              src={data?.avatar}
              alt=""
            />
          )}
        </div>
      </div>
      <div className={styles.personBlock}>
        <div className={styles.fioBlock}>
          <div className={styles.fio}>
            <p>{`${data?.first_name} ${data?.second_name}`}</p>
            <div className={styles.subscribers}>
              <Button
                variant="outlined"
                color={subscribed ? 'secondary' : 'primary'}
                onClick={() => setSubscribed(!subscribed)}
              >
                {subscribed ? 'Отписаться' : 'Следить'}
              </Button>
              <div>
                {data?.subscribers}
                {' '}
                подписчиков
              </div>
            </div>
          </div>
          <Button
            className={styles.changeButton}
            variant="outlined"
            color="primary"
          >
            Изменить
          </Button>
        </div>
        <PoliticianCards />
      </div>
    </div>
  );
};

export default PoliticianInfoBlock;
