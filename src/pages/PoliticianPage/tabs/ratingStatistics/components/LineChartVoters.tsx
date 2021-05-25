import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import styles from '../styles.module.scss';

const lines = [
  {
    title: 'Присутствуют',
    id: 'numberOfUsersFromRegion',
    color: '#807F7F',
    zIndex: 2
  },
  {
    title: 'Проголосовали',
    id: 'numberOfVotedUsers',
    color: '#222222',
    zIndex: 3
  },
  {
    title: 'Всего электората',
    id: 'totalElectorate',
    color: '#EDEDED',
    zIndex: 1
  },
];

const getWidth = (item: number, total: number) => {
  console.log(item, total);
  return (item * 100) / total < 1 ? 1 : (item * 100) / total;
};

export const LineChartVoters = () => {
  const data = useSelector(politicianSelectors.getRatingStatistic());
  return (
    <div className={styles.lineChartVotersContainer}>
      <div className={styles.lines}>
        {data?.numberOfVoters && lines.map(({ color, id, zIndex }, index) => {
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
        {lines.map(({ color, title }) => (
          <div className={styles.legend}>
            <div
              style={{ backgroundColor: color }}
              className={styles.legendMark}
            />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
