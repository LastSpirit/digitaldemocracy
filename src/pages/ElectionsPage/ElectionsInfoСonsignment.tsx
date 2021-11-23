import { useEffect, useState, FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { politicianActionCreators, PoliticianInfoI, politicianSelectors } from 'src/slices/politicianSlice';
import classNames from 'classnames';
import { Container, Checkbox } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useSearchParams } from 'src/hooks/useSearchParams';

import { LineChartVoters } from '../PoliticianPage/blocks/PoliticianInfoBlock/LineChartVoters';
import hish from '../../icons/pictures/hish.png';
import styles from './ElectionsInfoBlock.module.scss';
import { PercentsLinearGraphic } from '../PoliticianPage/tabs/ratingStatistics/components/infographic/PercentsLinearGraphic';

interface IProps {
  handleClickOpen?: any;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface IProps {
  politician?: PoliticianInfoI;
  voteStatisticsInOtherRegion?: any;
  election?: any;
  item?: any;
}
const ElectionsInfoСonsignment: FC<IProps> = ({ item, election }) => {
  console.log(election, 'ElectionsInfoСonsignment');
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
                      <p>{item?.name}</p>
                      <div className={styles.description__info}>
                        <div className={styles.description}>{item?.politicians_count} членов партии</div>
                      </div>
                      <div className={styles.description}>
                        <div className={styles.rating_grey}>{item?.rating}%</div>
                      </div>
                      <div className={styles.aboutRatings}>
                        <PercentsLinearGraphic vote_groups={item?.vote_groups} />
                      </div>
                    </div>
                  </div>
                </div>
                {item?.is_silence ? (
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
                    <div className={styles.percentNumber}>
                      {item?.election_vote_statistics.percent_rating_election}%
                    </div>
                    <div className={styles.percentOther_grey}>
                      {item?.election_vote_statistics.count_voted_users_on_election} человек
                    </div>
                  </div>
                ) : (
                  <div className={styles.hishParty}>
                    <img className={styles.imgSize} src={hish} alt="hish" />
                  </div>
                )}
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
              <p className={styles.mobName}>{item?.name}</p>
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
                  <div className={styles.mobEnglishName}>{item?.politicians_count} членов партии</div>
                  <div className={styles.percent_black_big}>{item?.rating}%</div>
                </div>
              </div>
              {/* <div className={styles.mobRightBlock}>
                <div className={styles.percent_black_big}>{item?.rating}%</div>
              </div> */}
              <div className={styles.aboutRatings}>
                <PercentsLinearGraphic vote_groups={item?.vote_groups} />
              </div>
              {item?.is_silence && (
                <div className={styles.mobRightBlock}>
                  <div className={styles.percent_grey}>
                    Проголосовало: {item?.election_vote_statistics.count_voted_users_on_election} человек
                  </div>
                  <div className={styles.percent_grey}>
                    Рейтинг:{' '}
                    <span className={styles.percent_span}>
                      {item?.election_vote_statistics.percent_rating_election}%
                    </span>
                  </div>
                </div>
              )}
              {item?.is_silence ? (
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
              ) : (
                <div className={styles.blockHish}>
                  <div className={styles.blockHish__img}>
                    <img className={styles.blockHish__imgSize} src={hish} alt="hish" />
                  </div>
                  <div className={styles.blockHish__text}>День тишины</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ElectionsInfoСonsignment;
