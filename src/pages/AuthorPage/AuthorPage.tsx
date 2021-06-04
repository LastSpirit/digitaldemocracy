import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import styles from './AuthorPage.module.scss';

import AuthorInfoBlock from './blocks/AuthorInfoBlock/AuthorInfoBlock';
import AuthorNavigation from './blocks/AuthorNavigation';
import { BackButton } from '../../components/BackButton/BackButton';
import { WrapperAsyncRequest } from './blocks/Loading/WrapperAsyncRequest';
import { useFetchAuthor } from './hooks/useFetchAuthor';
import { authorActionCreators } from '../../slices/authorSlice';

import { RootState } from '../../store/index';

const AuthorPage = () => {
  const { status } = useSelector((s: RootState) => s.author);
  const { fetchData } = useFetchAuthor();
  const { resetData } = authorActionCreators();
  useEffect((): any => {
    fetchData();
    return () => resetData();
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
