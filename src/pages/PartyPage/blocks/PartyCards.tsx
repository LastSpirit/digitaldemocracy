import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../PartyPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../hooks/useWindowSize';
import InDevelop from '../../../components/InDevelop/InDevelop';

const PartyCards = ({ data }) => {
  const { isMobile } = useWindowSize();
  const maxLength = isMobile ? 160 : 180;
  const hiddenText =
    data?.description?.length >= maxLength ? `${data?.description.slice(0, maxLength)} ...` : data?.description;
  return (
    <div className={styles.cardsBlock}>
      <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.text}>{hiddenText}</div>
        </div>
      </div>
      {!isMobile && (
        <div className={styles.card}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div className={styles.badge}>
                <div className={styles.text}>{data?.trust}</div>
              </div>
              <div className={styles.percent}>{`${data?.percent} %`}</div>
            </div>
            <PercentsLinearGraphic />
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyCards;
