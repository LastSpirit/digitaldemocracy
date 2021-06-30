import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, StylesProvider, Box, IconButton, Card, Typography } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { politicianSelectors, politicianActionCreators } from '../../../../slices/politicianSlice';
import styles from './IncomeStatistic.module.scss';
import { IncomeVotesGroup } from './VotesGroup/IncomeVotesGroup';
import { useFetchStatistic } from './hooks/useFetchStatistic';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';

export default function Statistic() {
  const data = useSelector(politicianSelectors.getStatistic());
  const { status, fetch } = useFetchStatistic();
  const { resetIncomeStatistic } = politicianActionCreators() as any;
  useEffect(() => {
    fetch();
    return () => resetIncomeStatistic();
  }, []);
  return (
    <WrapperAsyncRequest status={status}>
      {data?.length ? (
        data?.map(
          ({ id, link, source_link, number_of_likes, number_of_dislikes, is_user_liked, is_user_disliked }, index) => {
            return (
              <>
                <Card className={styles.card}>
                  <h4>Статистика дохода</h4>
                  <div className={styles.votesWrapper}>
                    <div className={styles.votes}>
                      <p>Как вы к этому относитесь?</p>
                      <IncomeVotesGroup
                        index={index}
                        id={id}
                        likes={number_of_likes}
                        dislikes={number_of_dislikes}
                        isLiked={is_user_liked}
                        isDisliked={is_user_disliked}
                      />
                    </div>
                  </div>
                </Card>
                <iframe title={`${id}`} loading="lazy" src={link} />
                <div className={styles.root}>
                  <p>Ссылка на иcточник: </p>
                  <IconButton className={styles.arrowButton} onClick={() => window.open(source_link)}>
                    <CallMadeIcon className={styles.arrowLink} />
                  </IconButton>
                </div>
              </>
            );
          }
        )
      ) : (
        <div className={styles.empty}>
          <h3> Данных пока нет</h3>
        </div>
      )}
    </WrapperAsyncRequest>
  );
}

export const IncomeStatistics = () => <Statistic />;
