import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

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
  },
});

export const Test = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    axios('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json').then(({ data }) =>
      setChartData(data)
    );
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
        data: chartData,
        link: 'https://dev.digitaldemocracy.ru/singleNews/Twjy4sPZIdvE4KOKefLq',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
