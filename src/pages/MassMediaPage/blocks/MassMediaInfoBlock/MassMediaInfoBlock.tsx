import React from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../../MassMediaPage.module.scss';
import { massmediaSelectors } from '../../../../slices/massMediaSlice';
import MassMediaCards from './MassMediaCards';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useChangeSubscribe } from '../../hooks/useChangeSubscribe';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../../components/Loading/Loading';
import { userSelectors } from '../../../../slices/userSlice';
import { endOfWords } from '../../../../utils/endOfWords';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';

const MassMediaInfoBlock = () => {
  const data = useSelector(massmediaSelectors.getMassMediaInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { status, change } = useChangeSubscribe();
  return (
    <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
      <div className={styles.topItems}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {!data?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.photo} alt="" />}
          </div>
        </div>
        <div className={styles.personBlock}>
          <div className={styles.fioBlock}>
            <div className={styles.fio}>
              <p>{data?.name}</p>
              <div className={styles.subscribers}>
                {!isMobile && (
                  <Button
                    variant="outlined"
                    color={data?.is_subscribed ? 'secondary' : 'primary'}
                    onClick={isAuthenticated ? change : undefined}
                    disabled={status === APIStatus.Loading}
                    className={classNames([
                      'MuiButton-containedPrimary',
                      styles.subscriberButton,
                      { '-disabled': !isAuthenticated },
                    ])}
                  >
                    <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                      <span>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {status === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
                      </span>
                    </Tooltip>
                  </Button>
                )}
                <div className={styles.subscribersBadge}>
                  {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                </div>
              </div>
            </div>
          </div>
          <MassMediaCards data={data} />
        </div>
      </div>
      {isMobile && (
        <>
          <Button
            variant="outlined"
            color={data?.is_subscribed ? 'secondary' : 'primary'}
            onClick={isAuthenticated ? change : undefined}
            disabled={status === APIStatus.Loading}
            className={classNames([styles['subscriberButton-mobile'], { '-disabled': !isAuthenticated }])}
          >
            <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
              <span>
                {/* eslint-disable-next-line no-nested-ternary */}
                {status === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
              </span>
            </Tooltip>
          </Button>
          <div className={styles.card}>
            <div className={styles.secondCard}>
              <div className={styles.trustRow}>
                <div className={styles.badge}>
                  <div className={styles.text}>{data?.trust}</div>
                </div>
                <div className={styles.percent}>{`${data?.percent} %`}</div>
              </div>
              <PercentsLinearGraphic />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MassMediaInfoBlock;