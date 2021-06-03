import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../MassMediaPage.module.scss';
import { massmediaSelectors } from '../../../../../slices/massMediaSlice';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { SortBadge } from './SortBadge';
import { sortMassMedia } from '../../../../../static/static';

const NewsBlock = () => {
  const news = useSelector(massmediaSelectors.getNews());
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.newsContainer}>
      <div className={styles.sortRow}>
        {sortMassMedia.map(({ id, full_title, short_title, field }) => {
          return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
        })}
      </div>
      {news && news.length > 0 ? (
        <div className={styles.news}>
          {news?.map((item, index) => (
            <div className={styles.outerCardContainer}>
              <CardSmall {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noNewsBlock}>
          <span>Здесь будут отображаться новости за выбранный период</span>
        </div>
      )}
    </div>
  );
};

export default NewsBlock;
