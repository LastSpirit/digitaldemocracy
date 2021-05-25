import React, { useEffect } from 'react';
import { useFetchRatingStatistic } from './useFetchRatingStatistic';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { Metrics } from './components/Metrics';
import { RatingDiagram } from './components/RatingDiagram';
import { LineChartVoters } from './components/LineChartVoters';

export const RatingStatistics = () => {
  const { status, fetch } = useFetchRatingStatistic();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <WrapperAsyncRequest status={status}>
      <Metrics />
      <RatingDiagram />
      <LineChartVoters />
    </WrapperAsyncRequest>
  );
};
