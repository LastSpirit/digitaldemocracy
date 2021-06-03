import { minHeight } from '@material-ui/system';
import React from 'react';
import InDevelop from '../../../../components/InDevelop/InDevelop';
import styles from './PositionDescription.module.scss';

export default function Description() {
  return (
    <div className={styles.root}>
      <h4>Председатель правительства</h4>
      <p>
        Определяет в соответствии с конституцией, федеральными конституционными законами,
        федеральными законами и указами президента основные направления деятельности правительства. Распределяет
        обязанности между членами правительства; систематически информирует президента Российской Федерации о работе
        правительства.
      </p>
    </div>
  );
}

export const PositionDescription = () => <Description />;
