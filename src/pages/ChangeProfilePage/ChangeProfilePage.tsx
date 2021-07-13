import React from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { BackButton } from 'src/components/BackButton/BackButton';
import styles from './ChangeProfilePage.module.scss';
import { Navigation } from './blocks/Navigation';
import { ChangeBlock } from './blocks/ChangeBlock';

const ChangeProfilePage = () => {
  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={APIStatus.Success}>
        <BackButton />
        <div className={styles.navigation}>
          {/* <Navigation /> */}
          <ChangeBlock />
        </div>
      </WrapperAsyncRequest>
    </div>
  );
};

export default ChangeProfilePage;
