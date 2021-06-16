import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../MassMediaPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';

const MassMediaCards = ({ data }) => {
  const { isMobile } = useWindowSize();
  // const maxLength = isMobile ? 160 : 180;
  // const hiddenText =
  //   data?.description?.length >= maxLength ? `${data?.description.slice(0, maxLength)} ...` : data?.description;
  const hiddenText = data?.description;
  return (
    <div className={styles.cardsBlock}>
      <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.text}>{hiddenText || 'Описание отсутствует'}</div>
        </div>
      </div>
      {!isMobile && (
        <div className={styles.card}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div className={styles.badge}>
                <div className={styles.text}>{data?.trust || 'Без рейтинга'}</div>
              </div>
              <div className={styles.percent}>{data?.rating || '-'} %</div>
            </div>
            <PercentsLinearGraphic vote_groups={data?.vote_groups} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MassMediaCards;
