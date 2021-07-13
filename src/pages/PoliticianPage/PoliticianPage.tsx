import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import { getItem } from 'src/lib/localStorageManager';
import { useWindowSize } from 'src/hooks/useWindowSize';
import './datePickerStyles.scss';
import styles from './PoliticianPage.module.scss';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import PoliticianInfoBlock from './blocks/PoliticianInfoBlock/PoliticianInfoBlock';
import PoliticianNavigation from './blocks/PoliticianNavigation';
import { MobileButtons } from '../../components/MobileButtons/MobileButtons';
import { BackButton } from '../../components/BackButton/BackButton';
import { CustomDialog } from './blocks/CustomDialog/CustomDialog';
import { politicianActionCreators } from '../../slices/politicianSlice';

const PoliticianPage = () => {
  const { isMobile } = useWindowSize();
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
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <div className={styles.containerContent}>
            <BackButton />
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
