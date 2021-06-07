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
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {!data?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.photo} alt="" />}
          </div>
        </div>
        <div className={styles.personBlock}>
          <div className={styles.fioBlock}>
            <div className={styles.fio}>
              <div className={styles.name}>
                <div>{data?.name}</div>
              </div>
              {data?.english_name && <div className={styles.englishName}>{data?.english_name}</div>}
              <div className={styles.subscribers}>
                <div className={styles.buttonBlock}>
                  {!isMobile && (
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
                  )}
                  {data?.number_of_subscribers && (
                    <div className={styles.subscribersBadge}>
                      {`${data?.number_of_subscribers} ${endOfWords(data?.number_of_subscribers, 'подписчик')}`}
                    </div>
                  )}
                  {data?.source_link && (
                    <FacebookShare url={data?.source_link || 'facebook.com'}>
                      <FacebookIcon
                        fontSize={isMobile ? 'small' : 'large'}
                        className={styles.facebook}
                        viewBox="3 3 18 18"
                      />
                    </FacebookShare>
                  )}
                </div>
                {!isMobile && (
                  <Button
                    className={classNames('MuiButton-containedPrimary', styles.changeButton, {
                      '-disabled': !isAuthenticated,
                    })}
                    variant="outlined"
                    color="primary"
                    onClick={isAuthenticated ? handleClickOpen : handleClick}
                  >
                    <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                      <span>Предложить изменения</span>
                    </Tooltip>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <PoliticianCards />
        </div>
      </div>
      {isMobile && (
        <>
          <Button
            variant="outlined"
            color={data?.is_subscribed ? 'secondary' : 'primary'}
            onClick={isAuthenticated ? change : handleClick}
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
          <div className={styles.card} style={{ marginTop: '10px' }}>
            <div className={styles.secondCard}>
              <div className={styles.trustRow}>
                <div className={styles.badge}>
                  <div className={styles.text}>{data?.trust || 'Без рейтинга'}</div>
                </div>
                <div className={styles.percent}>{`${data?.percent || '- %'}`}</div>
              </div>
              <PercentsLinearGraphic />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PoliticianInfoBlock;
