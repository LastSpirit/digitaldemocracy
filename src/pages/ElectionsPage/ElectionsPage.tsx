import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { electionsActionCreators, electionsSelector } from 'src/slices/electionsSlice';
import ElectionsHero from './blocks/ElectionsHero/ElectionsHero';
import styles from './ElectionsPage.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ElectionsInfoPerson from './ElectionsInfoPerson';
import ElectionsInfoСonsignment from './ElectionsInfoСonsignment';
import VotingResult from './VotingResult';
import VotingResultDD from './VotingResultDD';
import { useFetchElections } from './hooks/useFetchElections';
import SingleNewsList from '../SingleNewsPage/features/SingleNewsList/SingleNewsList';

const ElectionsPage = () => {
  const { t, i18n } = useTranslation();
  const { fetch } = useFetchElections();
  const { isMobile } = useWindowSize();
  const { resetEctions } = electionsActionCreators();
  const data = useSelector(electionsSelector.getData());
  const status = useSelector(electionsSelector.getStatus());
  const statusVoice = useSelector(electionsSelector.getStatusVoice());
  const { link } = useParams() as any;
  const [isAfter, setIsAfter] = useState(false);
  const [isBefore, setIsBefore] = useState(false);
  const [isNow, setisNow] = useState(false);
  useEffect((): any => {
    fetch(link);
    window.scrollTo(0, 0);
    return () => resetEctions();
  }, [link]);

  useEffect((): any => {
    setIsAfter(data?.isAfter);
    setIsBefore(data?.isBefore);
    setisNow(data?.isNow);
  }, [data]);

  useEffect((): any => {
    if (statusVoice === 'Success') {
      fetch(link);
    }
  }, [statusVoice]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          {data && <ElectionsHero data={data?.election} />}
          <div className={!isMobile ? styles.statistic : styles.statisticMobile}>
            <div className={styles.item}>
              <span className={styles.item_span}>{t('elections.electorate')}</span>
              <b>{data?.regionElection?.region?.title?.[i18n.language]}</b>
              <b>{data?.numberOfVotesElection?.totalElectorate}</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>{t('elections.presentOnSite')}</span>
              <b>{data?.regionElection?.region?.title?.[i18n.language]}</b>
              <b>{data?.numberOfVotesElection?.numberOfUsersFromRegion}</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>{t('elections.voted')}</span>
              <b>{data?.numberOfVotesElection?.numberOfVotedUsers}</b>
            </div>
          </div>
          {data?.politicians &&
            data?.politicians.length > 0 &&
            data?.politicians.map((item) => (
              <ElectionsInfoPerson
                key={item?.politician?.id}
                election={data?.election}
                isNow={isNow}
                isBefore={isBefore}
                isAfter={isAfter}
                {...item}
              />
            ))}
          {data?.parties &&
            data?.parties.length > 0 &&
            data?.parties.map((item) => (
              <ElectionsInfoСonsignment
                key={item?.id}
                party={item}
                isNow={isNow}
                isBefore={isBefore}
                isAfter={isAfter}
                election={data?.election}
              />
            ))}
          {isAfter && (
            <div>
              <h2 className={styles.h2}>{t('elections.resultDD')}</h2>
              <div className={styles.votingResult}>
                {data?.winners?.map((item) => (
                  <VotingResultDD key={item.id} winners={item} />
                ))}
              </div>
              <h2 className={styles.h2}>{t('elections.electionResults')}</h2>
              <div className={styles.votingResult}>
                {data?.outsideWinners?.map((item) => (
                  <VotingResult key={item.id} outsideWinners={item} />
                ))}
              </div>
              <div className={!isMobile ? styles.statisticVotin : styles.statisticVotinMobile}>
                <div className={styles.item}>
                  <span className={styles.item_span}>
                    {t('elections.electorate')}: {data?.numberOfVotesElection?.totalElectorate}
                  </span>
                </div>
                <div className={styles.item}>
                  <span className={styles.item_span}>
                    {t('elections.turnout')}: {data?.numberOfVotesElection?.numberOfVotedUsers}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className={styles.newsTop}>
            {data?.news && data?.news.length > 0 && (
              <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />
            )}
          </div>
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ElectionsPage;
