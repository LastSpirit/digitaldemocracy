import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { badgeColorChanger } from 'src/utils/badgeColorChanger';
import styles from '../PartyPage.module.scss';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../hooks/useWindowSize';
import InDevelop from '../../../components/InDevelop/InDevelop';

const PartyCards = ({ data }) => {
  const { t } = useTranslation();
  const trust = data?.rating ? (data?.rating > 50 ? t('info.highTrust') : t('info.lowTrust')) : t('info.withoutRating');
  const badgeBackground = trust === t('info.highTrust') ? 'green' : trust === t('info.lowTrust') ? 'red' : null;
  const badgeColor = trust === t('info.highTrust') ? '#fff' : '#222';
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.cardsBlock}>
      {!isMobile ? (
        <div className={data?.place && data?.rating ? styles.card : `${styles.card} ${styles.card__nonRaiting}`}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div
                className={data?.place && data?.rating ? styles.badge : `${styles.badge} ${styles.badge__nonRaiting}`}
                style={{
                  backgroundColor: data?.place && data?.rating ? badgeColorChanger(data?.rating) : '#C4C4C4',
                }}
              >
                <div className={styles.text}>{data?.place && data?.rating ? `${t('info.place')} ${data?.place}` : t('info.withoutRating')}</div>
              </div>
              { data?.place && data?.rating && (<div className={styles.percent}>{data?.rating} %</div>) }
            </div>
            { data?.place && data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      ) : (
        <div className={styles.mobCard}>
          <div className={styles.mobSecondCard}>
            <div className={styles.mobTrustRow}>
              <div
                className={data?.place && data?.rating ? styles.mobBadge : `${styles.mobBadge} ${styles.mobBadge__nonRaiting}`}
                style={{
                  backgroundColor: data?.place && data?.rating ? badgeColorChanger(data?.rating) : '#C4C4C4',
                }}
              >
                <div className={styles.mobText}>{`${t('info.place')} ${data?.place}`}</div>
              </div>
              { data?.place && data?.rating && (<div className={styles.mobPercent}>{data?.rating} %</div>) }
            </div>
            { data?.place && data?.rating && (<PercentsLinearGraphic vote_groups={data?.vote_groups} />) }
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyCards;
