import React, { useEffect, useState } from 'react';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@material-ui/core';
import { ratingSelectors } from '../../../slices/ratingSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchMedia } from '../hooks/useFetchMedia';
import { RootState } from '../../../store';
import { SortBadge } from './SortBadge';
import { sortRatingMedia } from '../../../static/static';
import { userSelectors } from '../../../slices/userSlice';
import MassMediaCard from '../MassMediaCard/MassMediaCard';
import styles from './Tabs.module.scss';
import { APIStatus } from '../../../lib/axiosAPI';

const MassMediaTab = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { media, isMorePages } = useSelector((s: RootState) => s.rating?.massMedia);
  const { fetch, status } = useFetchMedia();
  const sortDirection = useSelector((s: RootState) => s.rating.sort_direction);
  const sortField = useSelector((s: RootState) => s.rating.sort_field);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) {
      fetch(page);
    } else {
      fetch();
    }
  }, [sortDirection, sortField, isAuthenticated, page]);

  const handleMorePages = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.newsContainer}>
        <div className={styles.sortRow}>
          {sortRatingMedia(t).map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        <WrapperAsyncRequest status={isMorePages ? APIStatus.Success : status}>
          {media && media?.length > 0 ? (
            <>
              <div className={styles.news}>
                {media?.map((item, index) => (
                  <MassMediaCard key={item.id} {...item} />
                ))}
              </div>
              <WrapperAsyncRequest status={status} />
            </>
          ) : (
            <div className={styles.noNewsBlock}>
              <span>{t('tabs.warningMessageMassMedia')}</span>
            </div>
          )}
        </WrapperAsyncRequest>
        {isMorePages && status !== APIStatus.Loading && (
          <Box className={styles.containerBtn}>
            <Button className={styles.containerBtn}>
              <Typography
                className={styles.btnShowMore}
                onClick={handleMorePages}
              >
                {t('buttons.showMore')}
              </Typography>
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default MassMediaTab;
