import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../AuthorPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';

const AuthorCards = ({ data }) => {
  const { isMobile } = useWindowSize();
  // const maxLength = isMobile ? 160 : 180;
  // const hiddenText =
  //   data?.description?.length >= maxLength ? `${data?.description.slice(0, maxLength)} ...` : data?.description;
  const hiddenText = data?.description;
  const trust = data?.rating ? (data?.rating > 50 ? 'Высокое доверие' : 'Низкое доверие') : 'Без рейтинга';
  const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  return (
    <div className={styles.cardsBlock}>
      {!isMobile ? (
        <div className={styles.card}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div
                className={styles.badge}
                style={{
                  backgroundColor: badgeBackground,
                  color: badgeColor,
                }}
              >
                <div className={styles.text}>{`Место ${data?.place ?? '-'}`}</div>
              </div>
              <div className={styles.percent}>{data?.rating || '-'} %</div>
            </div>
            <PercentsLinearGraphic vote_groups={data?.vote_groups} />
          </div>
        </div>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              <div
                className={styles.mobBadge}
                style={{
                  backgroundColor: badgeBackground,
                  color: badgeColor,
                }}
              >
                <div className={styles.mobText}>{`Место ${data?.place ?? '-'}`}</div>
              </div>
              <div className={styles.mobPercent}>{data?.rating || '-'} %</div>
            </div>
            <PercentsLinearGraphic vote_groups={data?.vote_groups} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorCards;
