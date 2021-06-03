import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../MassMediaPage.module.scss';
import { massmediaSelectors } from '../../../../../slices/massMediaSlice';

const NewsBlock = () => {
  const news = useSelector(massmediaSelectors.getNews());
  return (
    <div className={styles.newsContainer}>
      {news && news.length > 0 ? (
        <>
          {news?.map((item, index) => (
            <div className={styles.outerCardContainer}>
              <CardSmall {...item} />
            </div>
          ))}
        </>
      ) : (
        <div className={styles.noNewsBlock}>
          <span>Здесь будут отображаться новости за выбранный период</span>
        </div>
      )}
    </div>
  );
};

export default NewsBlock;
