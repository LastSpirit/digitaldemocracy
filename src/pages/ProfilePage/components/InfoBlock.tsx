import React, { FC } from 'react';
import styles from '../ProfilePage.module.scss';

interface InfoBlockProps {
  fio?: string
}

const InfoBlock: FC<InfoBlockProps> = ({ fio }) => (
  <div className={styles.personBlock}>
    <div className={styles.fio}>
      <p>{fio}</p>
    </div>
    <div className={styles.hLine} />
    <p>Российская федерация, Ханты-Мансийский автономный округ</p>
    <p>30 лет</p>
    <p>Мужской</p>
  </div>
);

export default InfoBlock;
