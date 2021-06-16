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
  return (
    <div className={styles.cardsBlock}>
      <div className={styles.card}>
        <div className={styles.infoCard}>
          <div
            className={styles.party}
            onClick={() => history.push(`/party/${data?.party?.short_link}`)}
            aria-hidden="true"
          >
            {data?.party?.logo && (
              <div className={styles['-img']}>
                <img src={data?.party?.logo} alt="" />
              </div>
            )}
            <div className={styles.title}>{data?.party?.name}</div>
          </div>
          <hr color="#B0B0B0" />
          <div className={styles.positionAndAge}>
            <div className={styles.position}>{data?.position}</div>
            {(data?.age || data?.city) && (
              <div className={styles.age}>
                {data?.age ? `${data?.age} лет${data?.city ? `, ${data?.city}` : ''}` : data?.city}
              </div>
            )}
          </div>
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

export default PoliticianCards;
