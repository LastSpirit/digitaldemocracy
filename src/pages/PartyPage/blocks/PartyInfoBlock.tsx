import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useHistory } from 'react-router-dom';
import styles from '../PartyPage.module.scss';
import { partySelectors } from '../../../slices/partySlice';
import PartyCards from './PartyCards';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { APIStatus } from '../../../lib/axiosAPI';
import { Loading } from '../../../components/Loading/Loading';
import { userSelectors } from '../../../slices/userSlice';
import { endOfWords } from '../../../utils/endOfWords';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import FacebookShare from '../../../components/FacebookShare/FacebookShare';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { ModalParams } from '../../../types/routing';

const PartyInfoBlock: FC = () => {
  const data = useSelector(partySelectors.getPartyInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { goBack, length, push } = useHistory() as any;
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
      <div className={styles.buttonRow}>
        <Button variant="outlined" className={styles.backButton} onClick={() => (length > 2 ? goBack() : push('/'))}>
          <div className={styles.icon}>←</div>
          <div className={styles.text}>Назад</div>
        </Button>
      </div>
      <div className={styles.topItems}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {!data?.logo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.logo} alt="" />}
          </div>
        </div>
        <div className={styles.personBlock}>
          <div className={styles.fioBlock}>
            <div className={styles.fio}>
              <p>{data?.name}</p>
              <div className={styles.subscribers}>
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
          <PartyCards data={data} />
        </div>
      </div>
      {isMobile && (
        <>
          <div className={styles.card}>
            <div className={styles.secondCard}>
              <div className={styles.trustRow}>
                <div className={styles.badge}>
                  <div className={styles.text}>2 место</div>
                </div>
                <div className={styles.percent}>12 %</div>
              </div>
              <PercentsLinearGraphic />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PartyInfoBlock;
