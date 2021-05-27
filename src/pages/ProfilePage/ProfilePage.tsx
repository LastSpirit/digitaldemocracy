import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useFetchUserData } from './hooks/useFetchUserData';
import { userActionCreators, userSelectors } from '../../slices/userSlice';
import styles from './ProfilePage.module.scss';
import PersonBlock from './components/PersonBlock';
import InfoBlock from './components/InfoBlock';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import { BackButton } from '../../components/BackButton/BackButton';
import { ProfilePageNavigation } from './components/ProfilePageNavigation';

const ProfilePage = () => {
  const { status, fetch } = useFetchUserData();
  const data = useSelector(userSelectors.getUser());
  const { resetStatus } = userActionCreators();

  useEffect(() => {
    fetch();
    return () => {
      resetStatus();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <BackButton />
          <div className={styles.personContainer}>
            <PersonBlock avatar={data.avatar} />
            <InfoBlock fio={data?.first_name && data?.last_name ? data?.first_name + data?.last_name : data?.first_name || 'Имя Пользователя'} />
          </div>
          <ProfilePageNavigation />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ProfilePage;
