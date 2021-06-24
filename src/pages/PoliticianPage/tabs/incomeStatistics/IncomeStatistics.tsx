import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, StylesProvider, Box, IconButton, Card, Typography } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import styles from './IncomeStatistic.module.scss';
import { VotesGroup } from '../../../../components/VotesGroup/VotesGroup';
import { useFetchStatistic } from './hooks/useFetchStatistic';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';

export default function Statistic() {
  const data = useSelector(politicianSelectors.getStatistic());
  const { status, fetch } = useFetchStatistic();
  useEffect(() => {
    fetch();
  }, []);

  return (
    <WrapperAsyncRequest status={status}>
      {data?.length ? (
        <>
          <Card className={styles.card}>
            <h4>Статистика дохода</h4>
            <div className={styles.votesWrapper}>
              <div className={styles.votes}>
                <p>Как вы к этому относитесь?</p>
                <VotesGroup />
              </div>
            </div>
          </Card>
          <iframe title={`${data[0].id}`} loading="lazy" src={data[0].link} />
          <div className={styles.root}>
            <p>Ссылка на иcточник: </p>
            <IconButton className={styles.arrowButton} onClick={() => window.open(data[0].source_link)}>
              <CallMadeIcon className={styles.arrowLink} />
            </IconButton>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <h3> Данных пока нет</h3>
        </div>
      )}
    </WrapperAsyncRequest>
  );
}

export const IncomeStatistics = () => <Statistic />;
