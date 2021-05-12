import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useFetchUserData } from './hooks/useFetchUserData';
import { userSelectors } from '../../slices/userSlice';
import styles from './ProfilePage.module.scss';
import PersonBlock from './components/PersonBlock';
import InfoBlock from './components/InfoBlock';
import UserActivityBlock from './components/UserActivityBlock/UserActivityBlock';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';

const ProfilePage = () => {
  const { status, fetch } = useFetchUserData();
  const data = useSelector(userSelectors.getUser());
  const { push } = useHistory();

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
          <div className={styles.personContainer}>
            <PersonBlock avatar={data.avatar} />
            <InfoBlock fio={data?.first_name && data?.last_name ? data?.first_name + data?.last_name : data?.first_name || 'Имя Пользователя'} />
          </div>
          <UserActivityBlock />
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ProfilePage;
