import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import { useWindowSize } from 'src/hooks/useWindowSize';
import './datePickerStyles.scss';
import styles from './PoliticianPage.module.scss';
import { useFetchProfileInfo } from './hooks/useFetchProfileInfo';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import PoliticianInfoBlock from './blocks/PoliticianInfoBlock/PoliticianInfoBlock';
import PoliticianNavigation from './blocks/PoliticianNavigation';
import { MobileButtons } from '../../components/MobileButtons/MobileButtons';
import { BackButton } from '../../components/BackButton/BackButton';
import { CustomDialog } from './blocks/CustomDialog/CustomDialog';

const PoliticianPage = () => {
  const { isMobile } = useWindowSize();
  const { status, fetch } = useFetchProfileInfo();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const [next, setNext] = useState(false);
  const handleClickOpen = () => {
    setNext(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInfo('');
    setUrl('');
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.cont}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          {!isMobile && <BackButton />}
          {isMobile && <MobileButtons handleClickOpen={handleClickOpen} />}
          <PoliticianInfoBlock handleClickOpen={handleClickOpen} />
          <PoliticianNavigation />
          <CustomDialog
            open={open}
            next={next}
            info={info}
            url={url}
            setNext={setNext}
            setInfo={setInfo}
            setUrl={setUrl}
            handleClose={handleClose}
          />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default PoliticianPage;
