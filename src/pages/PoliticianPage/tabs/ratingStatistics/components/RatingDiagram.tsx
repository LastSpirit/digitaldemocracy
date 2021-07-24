import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import styles from '../styles.module.scss';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import { Loading } from '../../../../../components/Loading/Loading';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

export const RatingDiagram = () => {
  const data = useSelector(politicianSelectors.getRatingStatistic());
  const chartData = data?.voicesByRegion?.map(({ region_with_type, total }) => ([region_with_type, total]));
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.diagramContainer}>
      {chartData && chartData.length !== 0 && (
        <div className={styles.wrapper}>
          <Chart
            width={isMobile ? '300px' : '500px'}
            height="300px"
            chartType="PieChart"
            className={styles.chart}
            loader={<Loading />}
            data={[
              ['Task', 'Hours per Day'],
              ...chartData
            ]}
            options={{
              title: 'Статистика голосования по регионам',
              is3D: true,
              animation: {
                duration: 1000,
                easing: 'out',
                startup: true,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
