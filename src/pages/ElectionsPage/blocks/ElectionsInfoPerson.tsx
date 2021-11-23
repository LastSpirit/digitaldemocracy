import { useEffect, useState, FC } from 'react';
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
import { PercentsLinearGraphic } from './PercentsLinearGraphic/PercentsLinearGraphic';
import { PoliticianInfoI } from '../../../slices/politicianSlice';
import { LineChartVoters } from './LineChartVoters';
import hish from '../../../icons/pictures/hish.png';
import styles from '../ElectionsInfoBlock.module.scss';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IProps {
  politician?: PoliticianInfoI;
  voteStatisticsInOtherRegion?: any;
}
const ElectionsInfoPerson: FC<IProps> = ({ politician, voteStatisticsInOtherRegion }) => {
  const { isMobile } = useWindowSize();
  const [checked, setChecked] = useState(false);
  // const { setReset } = politicianActionCreators();
  const { t, i18n } = useTranslation();
  // const data = useSelector(politicianSelectors.getPoliticianInfo());
  // const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  // const {
  //   [ModalParams.Auth]: { setValue: setAuthValue },
  // } = useSearchParams(ModalParams.Auth);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // useEffect(() => {
  //   return () => {
  //     setReset();
  //   };
  // }, []);
  return (
    <Container maxWidth="lg" className={styles.cont}>
      <div className={isMobile ? styles['profileInfoContainer-mobile'] : styles.profileInfoContainer}>
        {!isMobile ? (
          <>
            <div className={!checked ? styles.topItems : classNames(styles.topItems, styles.topItems_green)}>
              <div
                className={
                  politician?.rating ? styles.avatarBlock : classNames(styles.avatarBlock, styles.avatarBlock__nonRaiting)
                }
                style={
                  politician?.rating
                    ? { backgroundImage: `url(${avatarColorChanger(politician?.rating)})`, backgroundSize: 'cover' }
                    : {}
                }
              >
                <div className={politician?.rating ? styles.avatar : classNames(styles.avatar, styles.avatar__nonRaiting)}>
                  {!politician?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={politician?.photo} alt="" />}
                </div>
              </div>
              <div className={styles.personBlock}>
                <div className={styles.fioBlock}>
                  <div className={styles.fio}>
                    <p>{politician?.name}</p>
                    <div className={styles.description__info}>{politician?.english_name}</div>
                    { politician?.rating && (
                      <div className={styles.description}>
                        <div className={styles.rating}>
                          Рейтинг: {politician?.region?.title?.[i18n.language]} - {politician?.rating}%
                        </div>
                      </div>
                    )}
                    {politician?.place && politician?.rating && <PercentsLinearGraphic vote_groups={politician?.vote_groups} />}
                    <LineChartVoters data={politician} />
                    {voteStatisticsInOtherRegion && (
                      <div className={styles.aboutRatingsOther}>
                        <div className={styles.description}>
                          <div className={styles.rating}>
                            Рейтинг: {voteStatisticsInOtherRegion?.regionElection?.title?.[i18n.language]} - {voteStatisticsInOtherRegion?.rating}%
                          </div>
                        </div>
                        {voteStatisticsInOtherRegion?.rating && <PercentsLinearGraphic vote_groups={voteStatisticsInOtherRegion?.vote_groups} />}
                        <LineChartVoters data={voteStatisticsInOtherRegion} />
                      </div>
                    )}
                  </div>
                </div>
                {true ? (
                  <div className={styles.aboutRatings}>
                    <div className={styles.percentBlock}>
                      <div>
                        <Checkbox
                          className={styles.сheckbox}
                          checked={checked}
                          onChange={handleChange}
                          {...label}
                          sx={{
                            color: '#248232 !important',
                            '&.Mui-checked': { color: '#248232 !important' },
                            '& .MuiSvgIcon-root': { fontSize: 60 },
                          }}
                        />
                        <div className={styles.description}>
                          {checked ? (
                            <div className={styles.voice}>
                              <div>Ваш голос принят</div>
                            </div>
                          ) : (
                            <div className={styles.voice_empty_politic}>
                              <div> </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.percentOther}>Проголосовало</div>
                      <div className={styles.percentOther}>за этого кандидата:</div>
                      <div className={styles.percentNumber}>{politician?.election_vote_statistics?.percent_rating_election}%</div>
                      <div className={styles.percentOther_green}>{politician?.election_vote_statistics?.count_voted_users_on_election} человек</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.hish}>
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
              {/* {data?.position && <div className={styles.age}>{data?.position}</div>} */}
              <div className={styles.mobInfoBlock}>
                <div
                  className={
                    politician?.rating
                      ? styles.mobAvatarBlock
                      : classNames(styles.mobAvatarBlock, styles.mobAvatarBlock__nonRaiting)
                  }
                  style={
                    politician?.rating
                      ? { backgroundImage: `url(${avatarColorChanger(politician?.rating)})`, backgroundSize: 'cover' }
                      : {}
                  }
                >
                  <div
                    className={
                      politician?.rating ? styles.mobAvatar : classNames(styles.mobAvatar, styles.mobAvatar__nonRaiting)
                    }
                  >
                    {!politician?.photo ? (
                      <PersonIcon className={styles.mobNoAvatarIcon} />
                    ) : (
                      <img src={politician?.photo} alt="" />
                    )}
                  </div>
                </div>
                <div className={styles.mobRightBlock}>
                  <p>Путин Владимир Владимирович</p>
                  <div className={styles.mobEnglishName}>Putin Vladimir Vladimirovich</div>
                </div>
              </div>
              <div className={styles.mobRightBlock}>
                <div className={styles.percent_black}>Рейтинг: Республика Северная Осетия-Алания - 62,2%</div>
              </div>
              <LineChartVoters />
              <div className={styles.mobRightBlock}>
                <div className={styles.percent_black}>Рейтинг: Республика Северная Осетия-Алания - 62,2%</div>
              </div>
              <LineChartVoters />
              <div className={styles.mobRightBlock}>
                <div className={styles.percent_grey}>Проголосовало: 10 человек</div>
                <div className={styles.percent_grey}>
                  Рейтинг: <span className={styles.percent_span}>62,2%</span>
                </div>
              </div>
              {true ? (
                <div className={styles.mobCheckBlock}>
                  <Checkbox
                    className={styles.mobCheckBlock__box}
                    checked={checked}
                    onChange={handleChange}
                    {...label}
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

export default ElectionsInfoPerson;
