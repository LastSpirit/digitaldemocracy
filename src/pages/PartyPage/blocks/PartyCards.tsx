import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../PartyPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../hooks/useWindowSize';
import InDevelop from '../../../components/InDevelop/InDevelop';

const PartyCards = ({ data }) => {
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.cardsBlock}>
      <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.text}>Партия</div>
          <hr />
          <p className={styles.sub}>{data.politicians_count ?? 0} членов партии</p>
        </div>
      </div>
      {!isMobile && (
        <div className={styles.card}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div className={styles.badge}>
                <div className={styles.text}>2 место</div>
              </div>
              <div className={styles.percent}>12 %</div>
            </div>
            <PercentsLinearGraphic />
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyCards;
