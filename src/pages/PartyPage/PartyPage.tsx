import React from 'react';
import { Container } from '@material-ui/core';
import styles from './PartyPage.module.scss';

import PartyInfoBlock from './blocks/PartyInfoBlock';
import PartyBlock from './blocks/PartyBlock';
import { BackButton } from '../../components/BackButton/BackButton';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';

import { APIStatus } from '../../lib/axiosAPI';

const PartyPage = () => {
  const status: APIStatus = APIStatus.Initial;
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <PartyInfoBlock />
          <PartyBlock />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default PartyPage;
