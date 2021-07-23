import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Highcharts from 'highcharts';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import HighchartsReact from 'highcharts-react-official';
import { useFetchChart } from '../../../hooks/useFetchChart';
import { politicianActionCreators, politicianSelectors } from '../../../../../slices/politicianSlice';

Highcharts.setOptions({
  lang: {
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентрябрь',
      'Октябрь',
      'Новябрь',
      'Декабрь',
    ],
    weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Восресенье'],
    shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноябр', 'Дек'],
    resetZoom: 'Сбросить зумирование',
  },
});

export const Highchart = () => {
  const { fetch, status } = useFetchChart();
  const { setDate, setReset } = politicianActionCreators();
  const chartData = useSelector(politicianSelectors.getChartData());

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
