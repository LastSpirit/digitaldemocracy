import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyles.scss';
import styles from './PoliticianPage.module.scss';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import PoliticianInfoBlock from './blocks/PoliticianInfoBlock/PoliticianInfoBlock';
import PoliticianNavigation from './blocks/PoliticianNavigation';

const PoliticianPage = () => {
  const { push } = useHistory();
  const { status, fetch } = useFetchProfileInfo();

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <Button
            className={styles.backButton}
            onClick={() => push('/')}
          >
            <ArrowRightAltIcon
              className={styles.arrow}
            />
            <p>Назад</p>
          </Button>
          <PoliticianInfoBlock />
          <PoliticianNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default PoliticianPage;
