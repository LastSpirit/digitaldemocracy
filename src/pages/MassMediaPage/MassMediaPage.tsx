import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { BackButton } from 'src/components/BackButton/BackButton';
import styles from './MassMediaPage.module.scss';

import MassMediaInfoBlock from './blocks/MassMediaInfoBlock/MassMediaInfoBlock';
import MassMediaNavigation from './blocks/MassMediaNavigation';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import { useFetchMassMedia } from './hooks/useFetchMassMedia';
import { massmediaActionCreators } from '../../slices/massMediaSlice';

import { RootState } from '../../store/index';

const MassMediaPage = () => {
  const { status } = useSelector((s: RootState) => s.massmedia);
  const { fetchData } = useFetchMassMedia();
  const { resetData } = massmediaActionCreators();
  useEffect(() => {
    resetData();
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <BackButton />
          <MassMediaInfoBlock />
          <MassMediaNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default MassMediaPage;
