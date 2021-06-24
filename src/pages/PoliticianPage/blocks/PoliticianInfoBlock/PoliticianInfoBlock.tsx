import React, { useState } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookIcon from '@material-ui/icons/Facebook';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';

import InputTextField from '../../../../components/widgets/inputs/InputTextField';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';
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

interface IProps {
  handleClickOpen?: any;
}

const PoliticianInfoBlock: FC<IProps> = ({ handleClickOpen }) => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { status, change } = useChangeSubscribe();

  const { push } = useHistory();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthValue('/login');
    }
  };

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
          <div>
            <div className={styles.fioBlock}>
              <div className={styles.fio}>
                <p>{data?.name}</p>
                <Button
                  variant="outlined"
                  color={data?.is_subscribed ? 'secondary' : 'primary'}
                  onClick={isAuthenticated ? change : handleClick}
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
                {/* <div className={styles.subscribers}> */}
                {/* {!isMobile && (
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
                        eslint-disable-next-line no-nested-ternary
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
                )} */}
                {/* {data?.number_of_subscribers && (
                  <div className={styles.subscribersBadge}>
                    {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                  </div>
                )} */}
                {/* </div> */}
              </div>
            </div>
            <div className={styles.description}>
              {/* <p>{data?.description ?? 'Описание отсутствует'}</p> */}
              {data?.english_name && <div className={styles.englishName}>{data?.english_name}</div>}
              {data?.number_of_subscribers && (
                <div
                  className={styles.subscribersBadge}
                  style={data?.english_name ? { textAlign: 'end' } : { textAlign: 'start' }}
                >
                  {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                </div>
              )}
            </div>
            {(data?.age || data?.city) && (
              <div className={styles.age}>
                {data?.age ? `${data?.age} лет${data?.city ? `, ${data?.city}` : ''}` : data?.city}
              </div>
            )}
            <div
              onClick={() => push(`/party/${data?.party?.short_link}`)}
              aria-hidden="true"
              className={styles.title}
            >
              {data?.party?.name}
            </div>
          </div>
          <div className={styles.bottom}>
            <PoliticianCards />
            <div className={styles.bottomRight}>
              <Button
                className={classNames('comeIn', styles.changeButton, {
                  '-disabled': !isAuthenticated,
                })}
                variant="outlined"
                color="primary"
                onClick={isAuthenticated ? handleClickOpen : handleClick}
              >
                <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                  <span>Предложить изменения в профиле</span>
                </Tooltip>
              </Button>

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
      </div>
      {/* {isMobile && (
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
                eslint-disable-next-line no-nested-ternary
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
      )} */}
    </div>
  );
};

export default PoliticianInfoBlock;
