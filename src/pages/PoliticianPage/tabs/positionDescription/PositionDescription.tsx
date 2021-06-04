import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PositionDescription.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';

export default function Description() {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  return data?.id === 6 ? (
    <div className={styles.root}>
      <h4>Председатель правительства</h4>
      <p>
        Определяет в соответствии с конституцией, федеральными конституционными законами, федеральными законами и
        указами президента основные направления деятельности правительства. Распределяет обязанности между членами
        правительства; систематически информирует президента Российской Федерации о работе правительства.
      </p>
    </div>
  ) : (
    <div className={styles.empty}>
      <h3> Данных пока нет</h3>
    </div>
  );
}

export const PositionDescription = () => <Description />;
