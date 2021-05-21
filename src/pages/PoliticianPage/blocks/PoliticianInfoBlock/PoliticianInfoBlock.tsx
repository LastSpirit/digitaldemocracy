import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const PoliticianInfoBlock = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const [subscribed, setSubscribed] = useState(data?.is_subscribed);
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!data?.photo ? (
            <PersonIcon className={styles.noAvatarIcon} />
          ) : (
            <img
              src={data?.photo}
              alt=""
            />
          )}
        </div>
      </div>
      <div className={styles.personBlock}>
        <div className={styles.fioBlock}>
          <div className={styles.fio}>
            <p>{`${data?.name}`}</p>
            <div className={styles.subscribers}>
              <Button
                variant="outlined"
                color={subscribed ? 'secondary' : 'primary'}
                onClick={() => setSubscribed(!subscribed)}
              >
                {subscribed ? 'Отписаться' : 'Следить'}
              </Button>
              <div>
                {data?.number_of_subscribers}
                {' '}
                подписчиков
              </div>
              {isMobile && (
              <Button
                className={styles.changeButton}
                variant="outlined"
                color="primary"
              >
                Изменить
              </Button>
              )}
            </div>
          </div>
          {!isMobile && (
          <Button
            className={styles.changeButton}
            variant="outlined"
            color="primary"
          >
            Изменить
          </Button>
          )}
        </div>
        <PoliticianCards />
      </div>
    </div>
  );
};

export default PoliticianInfoBlock;
