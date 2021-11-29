import { useState, FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalParams } from 'src/types/routing';
import { userSelectors } from 'src/slices/userSlice';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { PoliticianInfoI, politicianSelectors } from 'src/slices/politicianSlice';
import classNames from 'classnames';
import { Container, Checkbox } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { electionsSelector } from 'src/slices/electionsSlice';
import hish from '../../icons/pictures/hish.png';
import styles from './ElectionsInfoBlock.module.scss';
import { PercentsLinearGraphic } from '../PoliticianPage/tabs/ratingStatistics/components/infographic/PercentsLinearGraphic';
import { useFetchVoiceAdd } from './hooks/useFetchVoiceAdd';
import { useFetchVoiceDelete } from './hooks/useFetchVoiceDelete';

interface IProps {
  handleClickOpen?: any;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface IProps {
  politician?: PoliticianInfoI;
  voteStatisticsInOtherRegion?: any;
  election?: any;
  party?: any;
  isNow?: boolean;
  isBefore?: boolean;
  isAfter?: boolean;
}
const ElectionsInfoСonsignment: FC<IProps> = ({ party, isBefore, isAfter, isNow }) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [checked, setChecked] = useState(party.election_vote_statistics.is_user_has_vote);
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);
  const { isMobile } = useWindowSize();
  const { t, i18n } = useTranslation();
  const { fetch: addVoice } = useFetchVoiceAdd();
  const { fetch: deleteVoice } = useFetchVoiceDelete();
  const dataVoice = useSelector(electionsSelector.getData());
  const data = useSelector(politicianSelectors.getPoliticianInfo());

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      deleteVoice(party?.type, party.id, dataVoice.election.id);
    } else if (!checked) {
      addVoice(party?.type, party.id, dataVoice.election.id);
    }
  };

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
                      <p>{party?.name}</p>
                      <div className={styles.description__info}>
                        <div className={styles.description}>
                          {party?.politicians_count} {t('elections.partyMembers')}
                        </div>
                      </div>
                      {party?.rating ? (
                        <div>
                          <div className={styles.description}>
                            <div className={styles.rating_grey}>{party?.rating}%</div>
                          </div>
                          <div className={styles.aboutRatings}>
                            <PercentsLinearGraphic vote_groups={party?.vote_groups} />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noRiting}>
                          <div className={styles.noRiting__btn}>{t('info.withoutRating')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.description__info_voice}>
                  <div>
                    {isNow && !party.is_silence && (
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
                    )}
                  </div>
                  {checked && !party?.is_silence && isNow ? (
                    <div className={styles.voice}>
                      <div>{t('elections.yourVoteIsTaken')}</div>
                    </div>
                  ) : (
                    <div className={styles.voice_empty}>
                      <div> </div>
                    </div>
                  )}
                  {(isNow || isAfter) && !party?.is_silence && (
                    <div>
                      <div className={styles.percentOther_grey}>{t('elections.votedParty')}:</div>
                      <div className={styles.percentNumber}>
                        {party?.election_vote_statistics.percent_rating_election}%
                      </div>
                      <div className={styles.percentOther_grey}>
                        {party?.election_vote_statistics.count_voted_users_on_election} {t('info.people')}
                      </div>
                    </div>
                  )}
                </div>
                {party?.is_silence && (
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
              <p className={styles.mobName}>{party?.name}</p>
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
                    {party?.politicians_count} {t('elections.partyMembers')}
                  </div>
                  <div className={styles.percent_black_big}>{party?.rating && `${party?.rating}%`}</div>
                </div>
              </div>
              {party?.rating ? (
                <div className={styles.aboutRatings}>
                  <PercentsLinearGraphic vote_groups={party?.vote_groups} />
                </div>
              ) : (
                <div className={styles.noRiting}>
                  <div className={styles.noRiting__btnMob}>{t('info.withoutRating')}</div>
                </div>
              )}
              {(isNow || isAfter) && !party?.is_silence && (
                <div className={styles.mobRightBlock}>
                  <div className={styles.percent_grey}>
                    {t('elections.voted')}: {party?.election_vote_statistics.count_voted_users_on_election}{' '}
                    {t('info.people')}
                  </div>
                  <div className={styles.percent_grey}>
                    {t('elections.rating')}:{' '}
                    <span className={styles.percent_span}>
                      {party?.election_vote_statistics.percent_rating_election}%
                    </span>
                  </div>
                </div>
              )}

              <div className={styles.mobCheckBlock}>
                {isNow && !party?.is_silence && (
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
                )}
                {checked && !party?.is_silence && isNow && (
                  <div className={styles.mobCheckBlock__voice}>
                    <div>{t('elections.yourVoteIsTaken')}</div>
                  </div>
                )}
              </div>
              {party?.is_silence && (
                <div className={styles.blockHish}>
                  <div className={styles.blockHish__img}>
                    <img className={styles.blockHish__imgSize} src={hish} alt="hish" />
                  </div>
                  <div className={styles.blockHish__text}>{t('elections.electionSilence')}</div>
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
