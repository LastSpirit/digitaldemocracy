import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import styles from '../styles.module.scss';

const lines = (t) => [
  {
    title: t('info.present') || 'Присутствуют',
    id: 'numberOfUsersFromRegion',
    color: '#807F7F',
    zIndex: 2
  },
  {
    title: t('info.voted') || 'Проголосовали',
    id: 'numberOfVotedUsers',
    color: '#222222',
    zIndex: 3
  },
  {
    title: t('info.totalElectorate') || 'Всего электората',
    id: 'totalElectorate',
    color: '#EDEDED',
    zIndex: 1
  },
];

const getWidth = (item: number, total: number) => ((item * 100) / total < 1 ? 1 : (item * 100) / total);

export const LineChartVoters = () => {
  const { t } = useTranslation();
  const data = useSelector(politicianSelectors.getRatingStatistic());
  return (
    <div className={styles.lineChartVotersContainer}>
      <div className={styles.lines}>
        {data?.numberOfVoters && lines(t).map(({ color, id, zIndex }, index) => {
          const item = getWidth(data.numberOfVoters[id], data.numberOfVoters.totalElectorate);
          return (
            <Tooltip
              title={data.numberOfVoters[id]}
              key={index.toString()}
            >
              <div
                className={styles.line}
                style={{ backgroundColor: color, width: `${item}%`, zIndex }}
              />
            </Tooltip>
          );
        })}
      </div>
      <div className={styles.legends}>
        {data?.numberOfVoters && lines(t).map(({ color, title, id }) => (
          <div className={styles.legend}>
            <div
              style={{ backgroundColor: color }}
              className={styles.legendMark}
            />
            <span>
              {title}
            </span>
            <span className={styles.count}>
              (
              {data.numberOfVoters[id]}
              )
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
