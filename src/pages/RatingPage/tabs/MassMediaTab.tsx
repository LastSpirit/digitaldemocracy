import React, { useEffect } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchMedia } from '../hooks/useFetchMedia';
import { RootState } from '../../../store/index';
import { SortBadge } from './SortBadge';
import { sortRatingMedia } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import MassMediaCard from '../MassMediaCard/MassMediaCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const MassMediaTab = () => {
  const { isMobile } = useWindowSize();
  const { media } = useSelector((s: RootState) => s.rating?.massMedia);
  const { fetch, status } = useFetchMedia();
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
          {sortRatingMedia.map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        {media && media?.length > 0 ? (
          <div className={styles.news}>
            {media?.map((item, index) => (
              <MassMediaCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className={styles.noNewsBlock}>
            <span>Здесь будут отображаться авторы</span>
          </div>
        )}
      </div>
    </WrapperAsyncRequest>
  );
};

export default MassMediaTab;
