import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../AuthorPage.module.scss';
import { authorSelectors } from '../../../../../slices/authorSlice';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { SortBadge } from './SortBadge';
import { sortMassMedia } from '../../../../../static/static';

export const AuthorNewsBlock = () => {
  const news = useSelector(authorSelectors.getNews());
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

export default AuthorNewsBlock;
