import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import { getItem } from 'src/lib/localStorageManager';
import MetaTags from 'react-meta-tags';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import PoliticianInfoBlock from './blocks/PoliticianInfoBlock/PoliticianInfoBlock';
import PoliticianNavigation from './blocks/PoliticianNavigation';
import { CustomDialog } from './blocks/CustomDialog/CustomDialog';
import { politicianActionCreators } from '../../slices/politicianSlice';
// import { useWindowSize } from 'src/hooks/useWindowSize';
// import { BackButton } from '../../components/BackButton/BackButton';
import './datePickerStyles.scss';
import styles from './PoliticianPage.module.scss';

const PoliticianPage = () => {
  // const { isMobile } = useWindowSize();
  const { status, fetch } = useFetchProfileInfo();
  const { setReset } = politicianActionCreators();
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);
  const token = getItem('token');
  const handleClickOpen = useCallback(() => {
    setNext(false);
    setOpen(true);
  }, [open, next]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  useEffect(() => {
    fetch();
  }, [token]);

  useEffect(() => {
    return () => {
      setReset();
    };
  }, []);
  return (
    <Container maxWidth="lg" className={styles.cont}>
      <MetaTags>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="politican page" />
        <meta
          property="og:image"
          content="https://dev-backoffice.digitaldemocracy.ru/storage/images/politician/f0b71bda-f9d0-4826-bd72-144b5a850454.jpg"
        />
      </MetaTags>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <div className={styles.containerContent}>
            <PoliticianInfoBlock handleClickOpen={handleClickOpen} />
            <PoliticianNavigation />
          </div>
          <CustomDialog open={open} next={next} setNext={setNext} handleClose={handleClose} />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default PoliticianPage;
