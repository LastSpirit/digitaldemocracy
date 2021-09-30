import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import styles from '../../PoliticianPage.module.scss';
import { useFetchLineChartVoters } from '../../hooks/useFetchLineChartVoters';

const lines = (t) => [
  {
    width: 33.3,
    title: t('info.voted') || 'Проголосовали',
    id: 'numberOfVotedUsers',
    color: '#747373',
    zIndex: 3,
  },
  {
    width: 66.6,
    title: t('info.present') || 'Присутствуют',
    id: 'numberOfUsersFromRegion',
    color: '#C1C1C1',
    zIndex: 2,
  },
  {
    width: 100,
    title: t('info.totalElectorate') || 'Всего электората',
    id: 'totalElectorate',
    color: '#E1E0E0',
    zIndex: 1,
  },
];

const getWidth = (item: number, total: number) => ((item * 100) / total < 1 ? 1 : (item * 100) / total);

export const LineChartVoters = () => {
  const { t } = useTranslation();
  const numberOfVotes = useSelector(politicianSelectors.getVoteCountStatistics());
  const { fetch } = useFetchLineChartVoters();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className={styles.lineChartVotersContainer}>
      <div className={styles.lines}>
        {numberOfVotes &&
          lines(t).map(({ color, id, zIndex, width }, index) => {
            const item = getWidth(numberOfVotes[id], numberOfVotes.totalElectorate);

            return (
              <Tooltip title="" key={index.toString()}>
                <div className={styles.line} style={{ backgroundColor: color, width: `${width}%`, zIndex }}>
                  <span className={styles.count}>{`${numberOfVotes[id]} ${t('info.people')} `}</span>
                </div>
              </Tooltip>
            );
          })}
      </div>
      <div className={styles.legends}>
        {numberOfVotes &&
          lines(t).map(({ color, title, id }) => (
            <div className={styles.legend}>
              <span>{title}</span>
              <div style={{ backgroundColor: color }} className={styles.legendMark} />
            </div>
          ))}
      </div>
    </div>
  );
};
