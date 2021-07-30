import React, { useEffect } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
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
  const { isMobile } = useWindowSize();
  const { politicians } = useSelector((s: RootState) => s.rating?.politicians);
  const { fetch, status } = useFetchPoliticians();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  useEffect(() => {
    fetch();
  }, [sortDirection, sortField, isAuthenticated]);
  return (
    <WrapperAsyncRequest status={status}>
      <div className={styles.newsContainer}>
        <div className={styles.sortRow}>
          {sortRatingPoliticians.map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
          {sortDropdownPoliticians.map(({ id, full_title, short_title, field }) => {
            return <SortDropdown key={id} text={!isMobile ? full_title : short_title} />;
          })}
        </div>
        {politicians && politicians?.length > 0 ? (
          <div className={styles.news}>
            {politicians?.map((item, index) => (
              <PoliticiansCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className={styles.noNewsBlock}>
            <span>Здесь будут отображаться политики</span>
          </div>
        )}
      </div>
    </WrapperAsyncRequest>
  );
};

export default React.memo(PoliticiansTab);
