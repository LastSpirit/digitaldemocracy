import React from 'react';
import { Button } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';

import styles from './Tabs.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const SortBadge = ({ text, field }) => {
  const { isMobile } = useWindowSize();
  const { setSortDirection, setSortField } = ratingActionCreators();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const active = sortField === field;
  return (
    <Button
      variant="outlined"
      className={active ? styles['sortBadge-active'] : styles.sortBadge}
      onClick={() => {
        if (!active) {
          setSortField(field);
          setSortDirection('asc');
        }
        if (active && sortDirection === 'asc') {
          setSortDirection('desc');
        }
        if (active && sortDirection === 'desc') {
          setSortDirection('asc');
        }
      }}
    >
      <div className={styles.text}>{text}</div>
      {sortField === field ? (
        sortDirection === 'asc' ? (
          <ExpandMoreIcon className={styles.icon} />
        ) : (
          <ExpandLessIcon className={styles.icon} />
        )
      ) : (
        <div className={styles.emptyIcon}>
          <></>
        </div>
      )}
    </Button>
  );
};

export default SortBadge;
