import React, { FC } from 'react';
import styles from '../ProfilePage.module.scss';
import { userInfoItems } from './types';

interface InfoBlockProps {
  fio?: string
}

const InfoBlock: FC<InfoBlockProps> = ({ fio }) => (
  <div className={styles.personBlock}>
    <div className={styles.fio}>
      <p>{fio}</p>
    </div>
    <div className={styles.hLine} />
    <div className={styles.infoBlock}>
      {userInfoItems.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
    </div>
    <div className={styles.hLineLite} />
  </div>
);

export default InfoBlock;
