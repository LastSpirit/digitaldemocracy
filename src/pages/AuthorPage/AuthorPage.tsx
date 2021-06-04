import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import styles from './AuthorPage.module.scss';

import AuthorInfoBlock from './blocks/AuthorInfoBlock/AuthorInfoBlock';
import AuthorNavigation from './blocks/AuthorNavigation';
import { BackButton } from '../../components/BackButton/BackButton';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import { useFetchAuthor } from './hooks/useFetchAuthor';
import { authorActionCreators } from '../../slices/authorSlice';

import { APIStatus } from '../../lib/axiosAPI';

const AuthorPage = () => {
  const status: APIStatus = APIStatus.Initial;
  const { fetchData } = useFetchAuthor();
  const { resetData } = authorActionCreators();
  useEffect(() => {
    resetData();
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <AuthorInfoBlock />
          <AuthorNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default AuthorPage;
