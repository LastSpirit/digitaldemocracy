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
          <div className={styles.party} onClick={() => history.push('/party/1')} aria-hidden="true">
            {data?.party_logo && (
              <div className={styles['-img']}>
                <img src={data?.party_logo} alt="" />
              </div>
            )}
            <span>{data?.party}</span>
          </div>
          <hr color="#B0B0B0" />
          <div className={styles.positionAndAge}>
            <div className={styles.position}>{data?.position}</div>
            {(data?.age || data?.city) && (
              <span>{data?.age ? `${data?.age} лет${data?.city ? `, ${data?.city}` : ''}` : data?.city}</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.card}>
        {isMobile ? (
          <InDevelop />
        ) : (
          <div className={styles.secondCard}>
            <div className={styles.percents}>
              <span>2 место</span>
              <p>{data?.percent}</p>
            </div>
            <PercentsLinearGraphic />
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliticianCards;
