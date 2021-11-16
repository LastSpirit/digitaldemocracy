import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { politicianActionCreators, politicianSelectors } from 'src/slices/politicianSlice';
import classNames from 'classnames';
import { Container, Checkbox } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { LineChartVoters } from '../PoliticianPage/blocks/PoliticianInfoBlock/LineChartVoters';
import styles from './ElectionsInfoBlock.module.scss';

interface IProps {
  handleClickOpen?: any;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ElectionsInfoСonsignment = () => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);
  const { isMobile } = useWindowSize();
  const { t, i18n } = useTranslation();
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const { setReset } = politicianActionCreators();

  useEffect(() => {
    return () => {
      setReset();
    };
  }, []);
  return (
    <Container maxWidth="lg" className={styles.cont}>
      <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
        {!isMobile ? (
          <>
            <div className={!checked ? styles.topItems : classNames(styles.topItems, styles.topItems_green)}>
              <div
                className={
                  data?.rating ? styles.avatarBlock : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
                }
                style={
                  data?.rating
                    ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                    : {}
                }
              >
                <div className={data?.rating ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)}>
                  {!data?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.photo} alt="" />}
                </div>
              </div>
              <div className={styles.personBlockParty}>
                <div className={styles.fioBlock}>
                  <div className={styles.fio}>
                    <div className={styles.descriptionParty}>
                      <p>Единая Россия</p>
                      <div className={styles.description}>
                        Всеросси́йская полити́ческая па́ртия «Еди́ная Росси́я» — российская политическая партия, крупнейшая
                        политическая партия Российской Федерации[16], «партия власти»
                      </div>
                      <div className={styles.description__info}>
                        <div className={styles.description}>3000000 членов партии</div>
                      </div>
                      <div className={styles.description}>
                        <div className={styles.rating_grey}>62,2%</div>
                      </div>
                      <div className={styles.aboutRatings}>
                        <LineChartVoters />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.description__info_voice}>
                  <div>
                    <Checkbox
                      className={styles.сheckbox}
                      checked={checked}
                      onChange={handleChange}
                      {...label}
                      defaultChecked
                      sx={{
                        color: '#248232 !important',
                        '&.Mui-checked': { color: '#248232 !important' },
                        '& .MuiSvgIcon-root': { fontSize: 60 },
                      }}
                    />
                  </div>
                  {checked ? (
                    <div className={styles.voice}>
                      <div>Ваш голос принят</div>
                    </div>
                  ) : (
                    <div className={styles.voice_empty}>
                      <div> </div>
                    </div>
                  )}
                  <div className={styles.percentOther_grey}> Проголосовало за эту партию:</div>
                  <div className={styles.percentNumber}>62,2%</div>
                  <div className={styles.percentOther_grey}>10 человек</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.mobileRoot}>
            <div
              className={
                !checked
                  ? styles.mobileRoot__border
                  : classNames(styles.mobileRoot__border, styles.mobileRoot__border_green)
              }
            >
              <p className={styles.mobName}>Единая россия</p>
              <div className={styles.mobInfoBlock}>
                <div
                  className={
                    data?.rating
                      ? styles.mobAvatarBlock
                      : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)
                  }
                  style={
                    data?.rating
                      ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' }
                      : {}
                  }
                >
                  <div
                    className={
                      data?.rating ? styles.mobAvatar : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)
                    }
                  >
                    {!data?.photo ? (
                      <PersonIcon className={styles.mobNoAvatarIcon} />
                    ) : (
                      <img src={data?.photo} alt="" />
                    )}
                  </div>
                </div>
                <div className={styles.mobRightBlock}>
                  <div className={styles.mobEnglishName}>
                    Всеросси́йская полити́ческая па́ртия «Еди́ная Росси́я» — российская политическая партия, крупнейшая
                    политическая партия Российской Федерации[16], «партия власти»
                  </div>
                  <div className={styles.mobEnglishName}>3000000 членов партии</div>
                </div>
              </div>
              <div className={styles.mobRightBlock}>
                <div className={styles.percent_black_big}>62,2%</div>
              </div>
              <LineChartVoters />
              <div className={styles.mobRightBlock}>
                <div className={styles.percent_grey}>Проголосовало: 10 человек</div>
                <div className={styles.percent_grey}>
                  Рейтинг: <span className={styles.percent_span}>62,2%</span>
                </div>
              </div>
              <div className={styles.mobCheckBlock}>
                <Checkbox
                  className={styles.mobCheckBlock__box}
                  checked={checked}
                  onChange={handleChange}
                  {...label}
                  defaultChecked
                  sx={{
                    color: '#248232 !important',
                    '&.Mui-checked': { color: '#248232 !important' },
                    '& .MuiSvgIcon-root': { fontSize: 30 },
                  }}
                />
                {checked && (
                  <div className={styles.mobCheckBlock__voice}>
                    <div>Ваш голос принят</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ElectionsInfoСonsignment;
