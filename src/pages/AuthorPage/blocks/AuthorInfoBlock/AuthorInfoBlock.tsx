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

import styles from '../../AuthorPage.module.scss';
import { authorSelectors } from '../../../../slices/authorSlice';
import AuthorCards from './AuthorCards';
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

const AuthorInfoBlock: FC = () => {
  const data = useSelector(authorSelectors.getAuthorInfo());
  const { subscribeStatus } = useSelector((s: RootState) => s.author);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { setAuthorSubscribe } = useChangeSubscribe();
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
      {!isMobile ? (
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
            <div>
              <div className={styles.fioBlock}>
                <div className={styles.fio}>
                  <p>{data?.name}</p>
                  <Button
                    variant="outlined"
                    color={data?.is_subscribed ? 'secondary' : 'primary'}
                    onClick={isAuthenticated ? setAuthorSubscribe : handleClick}
                    disabled={subscribeStatus === APIStatus.Loading}
                    className={classNames([
                      'MuiButton-containedPrimary',
                      styles.subscriberButton,
                      { '-disabled': !isAuthenticated },
                    ])}
                  >
                    <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                      <span>
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
                </div>
              </div>
              <div className={styles.description}>
                <p>{data?.description ?? 'Описание отсутствует'}</p>
                {data?.number_of_subscribers && (
                  <div className={styles.subscribersBadge}>
                    {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottom}>
              <AuthorCards data={data} />
              <div className={styles.bottomRight}>
                {data?.link && (
                  <FacebookShare url={data?.link || 'facebook.com'}>
                    <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
                  </FacebookShare>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mobileRoot}>
          <p>{data?.name}</p>
          {data?.number_of_subscribers && (
            <div className={styles.mobSubscribers}>
              {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
            </div>
          )}
          <div className={styles.mobInfoBlock}>
            <div
              className={styles.mobAvatarBlock}
              style={{ backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }}
            >
              <div className={styles.mobAvatar}>
                {!data?.photo ? <PersonIcon className={styles.mobNoAvatarIcon} /> : <img src={data?.photo} alt="" />}
              </div>
            </div>
            <div className={styles.mobRightBlock}>
              <p>{data?.description ?? 'Описание отсутствует'}</p>
            </div>
          </div>
          <AuthorCards data={data} />
          <Button
            variant="outlined"
            color={data?.is_subscribed ? 'secondary' : 'primary'}
            onClick={isAuthenticated ? setAuthorSubscribe : handleClick}
            disabled={subscribeStatus === APIStatus.Loading}
            className={classNames([
              'MuiButton-containedPrimary',
              styles.mobSubscriberButton,
              { '-disabled': !isAuthenticated },
            ])}
          >
            <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
              <span>
                {subscribeStatus === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
              </span>
            </Tooltip>
          </Button>
          <div className={styles.MobBottom}>
            {data?.link && (
              <FacebookShare url={data?.link || 'facebook.com'}>
                <FacebookIcon fontSize={isMobile ? 'small' : 'large'} className={styles.facebook} />
              </FacebookShare>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfoBlock;
