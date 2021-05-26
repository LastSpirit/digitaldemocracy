import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { politicianSelectors } from '../../../../../slices/politicianSlice';
import CardSmall from '../../../../../components/CardSmall/CardSmall';
import styles from '../../../PoliticianPage.module.scss';

const NewsBlock = () => {
  const news = useSelector(politicianSelectors.getNews());
  return (
    <div className={styles.newsContainer}>
      {news && news.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'space-between'
          }}
        >
          {news?.map((item, index) => (
            <Grid
              key={index.toString()}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <CardSmall
                {...item}
              />
            </Grid>
          ))}
        </Grid>
      )
        : (
          <div className={styles.noNewsBlock}>
            <span>Здесь будут отображаться новости за выбранный период</span>
          </div>
        )}
    </div>
  );
};

export default NewsBlock;
