import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { electionsActionCreators, electionsSelector } from 'src/slices/electionsSlice';
import ElectionsHero from './blocks/ElectionsHero/ElectionsHero';
import styles from './ElectionsPage.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ElectionsInfoPerson from './blocks/ElectionsInfoPerson';
import ElectionsInfoСonsignment from './ElectionsInfoСonsignment';
import VotingResult from './VotingResult';
import VotingResultDD from './VotingResultDD';
import { useFetchElections } from './hooks/useFetchElections';
import SingleNewsList from '../SingleNewsPage/features/SingleNewsList/SingleNewsList';

const ElectionsPage = () => {
  const { i18n } = useTranslation();
  const { fetch } = useFetchElections();
  const { isMobile } = useWindowSize();
  const { resetEctions } = electionsActionCreators();
  const data = useSelector(electionsSelector.getData());
  const status = useSelector(electionsSelector.getStatus());
  const { link } = useParams() as any;
  useEffect((): any => {
    fetch(link);
    window.scrollTo(0, 0);
    return () => resetEctions();
  }, [link]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          {data && <ElectionsHero data={data?.election} />}
          <div className={!isMobile ? styles.statistic : styles.statisticMobile}>
            <div className={styles.item}>
              <span className={styles.item_span}>Электорат: </span>
              <b>{data?.regionElection?.region?.title?.[i18n.language]}</b>
              <b>{data?.numberOfVotesElection?.totalElectorate}</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>Присутствуют на сайте:</span>
              <b>{data?.regionElection?.region?.title?.[i18n.language]}</b>
              <b>{data?.numberOfVotesElection?.numberOfUsersFromRegion}</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>Проголосовало:</span>
              <b>{data?.numberOfVotesElection?.numberOfVotedUsers}</b>
            </div>
          </div>
          {data?.politicians && data?.politicians.length > 0 ? (
            data?.politicians.map((item) => (
              <ElectionsInfoPerson key={item?.politician?.id} {...item} />
            ))
          ) : null}
          {data?.parties && data?.parties.length > 0 ? (
            data?.parties?.map((item) => (
              <ElectionsInfoСonsignment key={item?.id} {...item} />
            ))
          ) : null}
          <h2 className={styles.h2}>{'Итог голосования на платформе DD:'}</h2>
          <div className={styles.votingResult}>
            <VotingResultDD />
          </div>
          <h2 className={styles.h2}>{'Результаты выборов:'}</h2>
          <div className={styles.votingResult}>
            <VotingResult />
          </div>
          <div className={!isMobile ? styles.statisticVotin : styles.statisticVotinMobile}>
            <div className={styles.item}>
              <span className={styles.item_span}>Электорат: {data?.numberOfVotesElection?.totalElectorate}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>Явка: {data?.numberOfVotesElection?.numberOfVotedUsers}</span>
            </div>
          </div>
          {data?.news && data?.news.length > 0 && <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />}
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ElectionsPage;
