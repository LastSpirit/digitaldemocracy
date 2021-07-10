import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useFetchChart } from '../../../hooks/useFetchChart';
import { politicianSelectors } from '../../../../../slices/politicianSlice';

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
    resetZoom: 'Сбрость зумирование',
  },
});

const afterSetExtremes = (zoomAxis) => {
  const { min } = zoomAxis;
  const { max } = zoomAxis;
  console.log(min);
  console.log(max);
};

export const Highchart = () => {
  const { fetch, status } = useFetchChart();
  const chartData = useSelector(politicianSelectors.getChartData());
  useEffect(() => {
    fetch();
  }, []);

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: 'График новостей политика',
    },
    xAxis: {
      type: 'datetime',
      events: {
        afterSetExtremes,
      },
    },
    yAxis: {
      title: {
        text: 'Количество новости',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click() {
              // eslint-disable-next-line react/no-this-in-sfc
              window.open(this.series.options.link);
            },
          },
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
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: 'area',
        name: 'Новостей',
        data: [...(chartData?.politicianRatingChange || [])],
        link: 'https://dev.digitaldemocracy.ru/singleNews/Twjy4sPZIdvE4KOKefLq',
      },
      {
        // type: 'area',
        name: 'Новостей',
        data: [...(chartData?.politicianVotingElectorateChange || [])],
        lineColor: 'black',
        link: 'https://dev.digitaldemocracy.ru/singleNews/Twjy4sPZIdvE4KOKefLq',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
