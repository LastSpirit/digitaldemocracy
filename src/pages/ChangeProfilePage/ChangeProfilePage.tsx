import React, { useEffect } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { BackButton } from 'src/components/BackButton/BackButton';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import styles from './ChangeProfilePage.module.scss';
import { ChangeBlock } from './blocks/ChangeBlock';

const ChangeProfilePage = () => {
  const { fetch, status } = useFetchProfileInfo();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        <BackButton />
        <div className={styles.root}>
          <ChangeBlock />
        </div>
      </WrapperAsyncRequest>
    </div>
  );
};

export default ChangeProfilePage;
