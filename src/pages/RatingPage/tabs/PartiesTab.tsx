import React, { useEffect } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchParties } from '../hooks/useFetchParties';
import { RootState } from '../../../store/index';
import { SortBadge } from './SortBadge';
import { sortRatingParties } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import PartyCard from '../PartyCard/PartyCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const PartiesTab = () => {
  const { isMobile } = useWindowSize();
  const { parties } = useSelector((s: RootState) => s.rating?.parties);
  const { fetch, status } = useFetchParties();
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
          {sortRatingParties.map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        {parties && parties?.length > 0 ? (
          <div className={styles.news}>
            {parties?.map((item, index) => (
              <PartyCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className={styles.noNewsBlock}>
            <span>Здесь будут отображаться партии</span>
          </div>
        )}
      </div>
    </WrapperAsyncRequest>
  );
};

export default PartiesTab;
