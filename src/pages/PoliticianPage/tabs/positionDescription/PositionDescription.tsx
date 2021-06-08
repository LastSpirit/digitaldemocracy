import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
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
      <div className={styles.link}>
        <p>Ссылка на иcточник: </p>
        <IconButton className={styles.arrowButton} onClick={() => window.open('https://google.com')}>
          <CallMadeIcon className={styles.arrowLink} />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className={styles.empty}>
      <h3> Данных пока нет</h3>
    </div>
  );
}

export const PositionDescription = () => <Description />;
