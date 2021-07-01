import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';

const PoliticianCards = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const { isMobile } = useWindowSize();
  const history = useHistory();
  // const trust = data?.rating ? (data?.rating > 50 ? 'Высокое доверие' : 'Низкое доверие') : 'Без рейтинга';
  // const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  // const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  return (
    <div className={styles.cardsBlock}>
      {/* <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.text}>{hiddenText || 'Описание отсутствует'}</div>
        </div>
      </div> */}
      {!isMobile ? (
        <div className={styles.card}>
          <div className={styles.secondCard}>
            <div className={styles.trustRow}>
              <div
                className={styles.badge}
                // style={{
                //   backgroundColor: badgeBackground,
                //   color: badgeColor,
                // }}
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
                // style={{
                //   backgroundColor: badgeBackground,
                //   color: badgeColor,
                // }}
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

export default PoliticianCards;
