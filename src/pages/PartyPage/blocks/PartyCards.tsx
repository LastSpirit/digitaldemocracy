import React from 'react';
import { useSelector } from 'react-redux';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import styles from '../PartyPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../hooks/useWindowSize';
import InDevelop from '../../../components/InDevelop/InDevelop';

const PartyCards = ({ data }) => {
  const trust = data?.rating ? (data?.rating > 50 ? 'Высокое доверие' : 'Низкое доверие') : 'Без рейтинга';
  const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.cardsBlock}>
      {!isMobile ? (
        <div className={data?.place ? styles.card : `${styles.card} ${styles.card__nonRaiting}`}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div
                className={data?.place ? styles.badge : `${styles.badge} ${styles.badge__nonRaiting}`}
                style={{
                  backgroundColor: badgeColorChanger(data?.rating),
                }}
              >
                <div className={styles.text}>{data?.place ? `Место ${data?.place}` : 'Без рейтинга'}</div>
              </div>
              { data?.rating && (<div className={styles.percent}>{data?.rating} %</div>) }
            </div>
            { data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              <div
                className={data?.place ? styles.mobBadge : `${styles.mobBadge} ${styles.mobBadge__nonRaiting}`}
                style={{
                  backgroundColor: badgeColorChanger(data?.rating),
                }}
              >
                <div className={styles.mobText}>{`Место ${data?.place ?? '-'}`}</div>
              </div>
              { data?.rating && (<div className={styles.mobPercent}>{data?.rating} %</div>) }
            </div>
            { data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyCards;
