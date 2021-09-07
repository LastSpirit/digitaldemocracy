import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { userSelectors } from 'src/slices/userSlice';
import { useFetchPoliticianDossierGraph } from '../hooks/useFetchPoliticianDossierGraph';
import { WrapperAsyncRequest } from '../../../../../components/Loading/WrapperAsyncRequest';
import styles from '../styles.module.scss';

interface IPoliticianDossierGraph {
  setIsGraphShown: any,
  politicianId: number
}

const PoliticianDossierChart: React.FC<IPoliticianDossierGraph> = ({ setIsGraphShown, politicianId }) => {
  const { status, fetch: fetchDossierChartData } = useFetchPoliticianDossierGraph();
  const { t } = useTranslation();
  const { graph } = useSelector(userSelectors.getDossier());
  useEffect(() => {
    fetchDossierChartData(politicianId);
  }, []);

  const changedChartData = graph.map((subArr) => [subArr[1], subArr[0]]);

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      events: {},
    },
    yAxis: {
      title: {
        text: '0% - 100%',
      },
      max: 100,
    },
    tooltip: {
      xDateFormat: '%A, %b %e',
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
        data: changedChartData,
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
    ],
  };
  Highcharts.setOptions({
    lang: {
      months: Object.values(t('mountsFullName')),
      weekdays: Object.values(t('days')),
      shortMonths: Object.values(t('mountsShortName')),
      resetZoom: t('info.resetZoom'),
    },
  });

  return (
    <WrapperAsyncRequest status={status}>
      <div>
        <span
          className={styles.hideChartBtn}
          onClick={() => setIsGraphShown(false)}
          onKeyDown={() => setIsGraphShown(false)}
          role={'button'}
          tabIndex={0}
        >
          {t('buttons.hideChart')}
        </span>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </WrapperAsyncRequest>
  );
};

export default PoliticianDossierChart;
