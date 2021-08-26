import React, { useEffect } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchParties } from '../hooks/useFetchParties';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { sortRatingParties } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import PartyCard from '../PartyCard/PartyCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const PartiesTab = () => {
  const { t } = useTranslation();
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
    <>
      <div className={styles.newsContainer}>
        <div className={styles.sortRow}>
          {sortRatingParties(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        <WrapperAsyncRequest status={status}>
          {parties && parties?.length > 0 ? (
            <div className={styles.news}>
              {parties?.map((item, index) => (
                <PartyCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessageParties')}</span>
            </div>
          )}
        </WrapperAsyncRequest>
      </div>
    </>
  );
};

export default PartiesTab;
