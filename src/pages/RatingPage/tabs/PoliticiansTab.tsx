import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { Checkbox } from '@material-ui/core';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchPoliticians } from '../hooks/useFetchPoliticians';
import { RootState } from '../../../store/index';
import { SortBadge } from './SortBadge';
import { SortDropdown } from './SortDropdown';
import { sortRatingPoliticians, sortDropdownPoliticians } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import PoliticiansCard from '../PoliticianCard/PoliticiansCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const PoliticiansTab = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { politicians } = useSelector((s: RootState) => s.rating?.politicians);
  const { fetch, status } = useFetchPoliticians();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [world, setWorld] = useState(false);

  useEffect(() => {
    fetch(world);
  }, [sortDirection, sortField, isAuthenticated, world]);

  return (
    <>
      <div className={styles.newsContainer}>
        <div className={styles.sortDrop}>
          {sortDropdownPoliticians(t).map(({ id, full_title, short_title, field }) => {
            return (
              <SortDropdown
                key={id}
                text={!isMobile ? full_title : short_title}
                field={field}
                world={world}
              />
            );
          })}
        </div>
        <div>
          <Checkbox value={world} onChange={() => setWorld(!world)} />
          {t('info.worldUser')}
        </div>
        <div className={styles.sortRow}>
          {sortRatingPoliticians(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        <WrapperAsyncRequest status={status}>
          {politicians && politicians?.length > 0 ? (
            <div className={styles.news}>
              {politicians?.map((item, index) => (
                <PoliticiansCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessagePoliticians')}</span>
            </div>
          )}
        </WrapperAsyncRequest>
      </div>
    </>
  );
};

export default React.memo(PoliticiansTab);
