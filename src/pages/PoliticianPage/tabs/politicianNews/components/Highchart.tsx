import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Highcharts from 'highcharts';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import HighchartsReact from 'highcharts-react-official';
import { useFetchChart } from '../../../hooks/useFetchChart';
import { politicianActionCreators, politicianSelectors } from '../../../../../slices/politicianSlice';

export const Highchart = () => {
  const { t } = useTranslation();
  const { fetch, status } = useFetchChart();
  const { setDate, setReset } = politicianActionCreators();
  const chartData = useSelector(politicianSelectors.getChartData());

  Highcharts.setOptions({
    lang: {
      months: Object.values(t('mountsFullName')),
      weekdays: Object.values(t('days')),
      shortMonths: Object.values(t('mountsShortName')),
      resetZoom: t('info.resetZoom'),
    },
  });

  const afterSetExtremes = (zoomAxis) => {
    const { min } = zoomAxis;
    const { max } = zoomAxis;
    setDate({ min: Math.floor(min / 1000), max: Math.floor(max / 1000) });
    setReset();
  };

  useEffect(() => {
    fetch();
  }, []);

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      events: {
        afterSetExtremes,
      },
    },
    yAxis: {
      title: {
        text: '0% - 100%',
      },
      max: 100,
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
        ],
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: '%',
        data: [...(chartData?.politicianRatingChange || [])],
        zoneAxis: 'y',
        zones: [
          {
            value: 49,
            color: 'rgb(190, 59, 33)',
          },
          {
            color: 'rgb(36, 130, 50)',
          },
        ],
      },
      {
        type: 'area',
        name: 'Всего электората',
        data: [
          ...(chartData?.politicianVotingElectorateChange?.map((item) => ({
            x: item[0],
            y: item[1],
            votes: item[2],
          })) || []),
        ],
        lineColor: 'rgb(128, 127, 127)',
        tooltip: {
          pointFormat: '{series.name}: {point.y}<br/>Проголосовало: {point.votes}',
        },
      },
    ],
  };

  return (
    <WrapperAsyncRequest status={status}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </WrapperAsyncRequest>
  );
};
