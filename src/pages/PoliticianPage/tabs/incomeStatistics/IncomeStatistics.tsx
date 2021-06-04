import React from 'react';
import { useSelector } from 'react-redux';
import { Button, StylesProvider, Box, IconButton, Card, Typography } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import styles from './IncomeStatistic.module.scss';

const StatisticsCard = () => (
  <Card className={styles.card}>
    <Box>
      <IconButton sx={{ marginRight: '10px' }}>
        <div>Like</div>
      </IconButton>
      <IconButton>
        <div>Dislike</div>
      </IconButton>
    </Box>
    <Box style={{ margin: '0 10px' }}>
      <Typography>20%</Typography>
    </Box>
  </Card>
);

export default function Statistic() {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const [state, setState] = React.useState(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOo6he5bj5p-_xohXaEsguSvKvX7wb_spkKsj2PyzQN5LRDVRzS4jy0jxAMFR4qq689Vg1GXoVgd2J/pubhtml?widget=true&amp;headers=false'
  );

  console.log('DATA', data);

  return data?.id === 6 ? (
    <>
      <StatisticsCard />
      <iframe title="idPolitican" loading="lazy" src={state} />
      <div className={styles.root}>
        <p>Ссылка на иcточник: </p>
        <IconButton className={styles.arrowButton} onClick={() => window.open('https://google.com')}>
          <CallMadeIcon className={styles.arrowLink} />
        </IconButton>
      </div>
    </>
  ) : (
    <div className={styles.empty}>
      <h3> Данных пока нет</h3>
    </div>
  );
}

export const IncomeStatistics = () => <Statistic />;
