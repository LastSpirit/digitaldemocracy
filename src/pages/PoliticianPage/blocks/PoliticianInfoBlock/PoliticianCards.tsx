import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';

const PoliticianCards = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  return (
    <div className={styles.cardsBlock}>
      <div className={styles.card}>
        <div className={styles.infoCard}>
          <span>{data?.part}</span>
          <hr color="#B0B0B0" />
          <div className={styles.positionAndAge}>
            <div className={styles.position}>{data?.position}</div>
            {(data?.age || data?.city) && (
              <span>{data?.age ? `${data?.age} лет${data?.city ? `, ${data?.city}` : ''}` : data?.city }</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.card} />
    </div>
  );
};

export default PoliticianCards;
