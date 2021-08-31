import React, { useEffect } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchAuthors } from '../hooks/useFetchAuthors';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { sortRatingAuthors } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import AuthorCard from '../AuthorCard/AuthorCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const AuthorTab = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { authors } = useSelector((s: RootState) => s.rating?.authors);
  const { fetch, status } = useFetchAuthors();
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
          {sortRatingAuthors(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        <WrapperAsyncRequest status={status}>
          {authors && authors?.length > 0 ? (
            <div className={styles.news}>
              {authors?.map((item, index) => (
                <AuthorCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessageAuthors')}</span>
            </div>
          )}
        </WrapperAsyncRequest>
      </div>
    </>
  );
};

export default AuthorTab;
