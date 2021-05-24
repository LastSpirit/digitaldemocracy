import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyles.scss';
import styles from './PoliticianPage.module.scss';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import PoliticianInfoBlock from './blocks/PoliticianInfoBlock/PoliticianInfoBlock';
import PoliticianNavigation from './blocks/PoliticianNavigation';
import { BackButton } from '../../components/BackButton/BackButton';

const PoliticianPage = () => {
  const { status, fetch } = useFetchProfileInfo();

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <BackButton />
          <PoliticianInfoBlock />
          <PoliticianNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default PoliticianPage;
