import React from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useChangeSubscribe } from '../../hooks/useChangeSubscribe';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../../components/Loading/Loading';
import { userSelectors } from '../../../../slices/userSlice';

const PoliticianInfoBlock = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { status, change } = useChangeSubscribe();

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!data?.photo ? (
            <PersonIcon className={styles.noAvatarIcon} />
          ) : (
            <img
              src={data?.photo}
              alt=""
            />
          )}
        </div>
      </div>
      <div className={styles.personBlock}>
        <div className={styles.fioBlock}>
          <div className={styles.fio}>
            <p>{data?.name}</p>
            {data?.english_name && <p className={styles.englishName}>{data?.english_name}</p>}
            <div className={styles.subscribers}>
              <Button
                variant="outlined"
                color={data?.is_subscribed ? 'secondary' : 'primary'}
                onClick={isAuthenticated ? change : undefined}
                disabled={status === APIStatus.Loading}
                className={classNames(['MuiButton-containedPrimary', styles.subscriberButton, { '-disabled': !isAuthenticated }])}
              >
                <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                  <span>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {status === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
                  </span>
                </Tooltip>
              </Button>
              <div>
                {data?.number_of_subscribers}
                {' '}
                подписчиков
              </div>
              {isMobile && (
              <Button
                className={styles.changeButton}
                variant="outlined"
                color="primary"
              >
                Предложить изменения
              </Button>
              )}
            </div>
          </div>
          {!isMobile && (
          <Button
            className={styles.changeButton}
            variant="outlined"
            color="primary"
          >
            Предложить изменения
          </Button>
          )}
        </div>
        <PoliticianCards />
      </div>
    </div>
  );
};

export default PoliticianInfoBlock;
