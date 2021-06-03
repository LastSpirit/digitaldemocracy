import React from 'react';
import { Container } from '@material-ui/core';
import styles from './MassMediaPage.module.scss';

import MassMediaInfoBlock from './blocks/MassMediaInfoBlock/MassMediaInfoBlock';
import MassMediaNavigation from './blocks/MassMediaNavigation';
import { BackButton } from '../../components/BackButton/BackButton';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';

import { APIStatus } from '../../lib/axiosAPI';

const MassMediaPage = () => {
  const status: APIStatus = APIStatus.Initial;
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <MassMediaInfoBlock />
          <MassMediaNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default MassMediaPage;
