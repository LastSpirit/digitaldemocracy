import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useHistory } from 'react-router-dom';
import { RootState } from 'src/store';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';

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
import FacebookShare from '../../../../components/FacebookShare/FacebookShare';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../types/routing';

const MassMediaInfoBlock: FC = () => {
  const data = useSelector(massmediaSelectors.getMassMediaInfo());
  const { subscribeStatus } = useSelector((s: RootState) => s.massmedia);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { setMassMediaSubscribe } = useChangeSubscribe();
  const { goBack, length, push } = useHistory() as any;
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };
  const trust = data?.rating
    ? parseInt(data?.rating, 10) > 50
      ? 'Высокое доверие'
      : 'Низкое доверие'
    : 'Без рейтинга';
  const badgeBackground = trust === 'Высокое доверие' ? 'green' : trust === 'Низкое доверие' ? 'red' : null;
  const badgeColor = trust === 'Высокое доверие' ? '#fff' : '#222';
  return (
    <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
      <div className={styles.topItems}>
        <div
          className={styles.avatarBlock}
          style={{ backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }}
        >
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
                    onClick={isAuthenticated ? setMassMediaSubscribe : handleClick}
                    disabled={subscribeStatus === APIStatus.Loading}
                    className={classNames([
                      'MuiButton-containedPrimary',
                      styles.subscriberButton,
                      { '-disabled': !isAuthenticated },
                    ])}
                  >
                    <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                      <span>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {subscribeStatus === APIStatus.Loading ? (
                          <Loading />
                        ) : data?.is_subscribed ? (
                          'Отписаться'
                        ) : (
                          'Следить'
                        )}
                      </span>
                    </Tooltip>
                  </Button>
                )}
                {data?.number_of_subscribers && (
                  <div className={styles.subscribersBadge}>
                    {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                  </div>
                )}
                {data?.link && (
                  <FacebookShare url={data?.link || 'facebook.com'}>
                    <FacebookIcon
                      fontSize={isMobile ? 'small' : 'large'}
                      className={styles.facebook}
                      // viewBox="3 3 18 18"
                    />
                  </FacebookShare>
                )}
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
            onClick={isAuthenticated ? setMassMediaSubscribe : handleClick}
            disabled={subscribeStatus === APIStatus.Loading}
            className={classNames([styles['subscriberButton-mobile'], { '-disabled': !isAuthenticated }])}
          >
            <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
              <span>
                {/* eslint-disable-next-line no-nested-ternary */}
                {subscribeStatus === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
              </span>
            </Tooltip>
          </Button>
          <div className={styles.card}>
            <div className={styles.secondCard}>
              <div className={styles.trustRow}>
                <div
                  className={styles.badge}
                  style={{
                    backgroundColor: badgeBackground,
                    color: badgeColor,
                  }}
                >
                  <div className={styles.text}>{trust}</div>
                </div>
                <div className={styles.percent}>{`${data?.rating || '-'} %`}</div>
              </div>
              <PercentsLinearGraphic vote_groups={data?.vote_groups} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MassMediaInfoBlock;
