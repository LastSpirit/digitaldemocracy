import type { FC } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { AuthorI, MediaI, PoliticiansI } from 'src/slices/SingleNewsSlice';
import StatisticsCard from './StatisticsCard';

import styles from './SingleNewsStatistics.module.scss';

interface StatisticsPropsI {
  author?: AuthorI;
  media?: MediaI;
  politicians?: PoliticiansI[];
}

const SingleNewsStatistics: FC<StatisticsPropsI> = ({ author, media, politicians }) => {
  return (
    <Box className={styles.statistics}>
      <Container maxWidth="lg">
        <Typography className={styles.heading} sx={{ marginBottom: '15px' }}>
          Ваше мнение по поводу новости
        </Typography>
        <Grid container className={styles.statisticsContainer}>
          {politicians && politicians?.length > 0 && (
            <Grid item lg={6} md={12} sm={12} className={styles.politicians}>
              <Box className={styles.headings}>
                <Typography className={styles.heading}>Оцените политиков</Typography>
              </Box>
              {politicians?.map((item) => (
                <StatisticsCard key={item?.name} name={item?.name} photo={item?.photo} percent={item?.percent} />
              ))}
            </Grid>
          )}
          <Grid item lg={6} md={12} sm={12}>
            {media && (
              <Box sx={{ marginBottom: '20px' }}>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}>Доверяете ли вы СМИ как источнику новости?</Typography>
                </Box>
                <StatisticsCard
                  name={media?.name}
                  photo={media?.photo}
                  percent={media?.percent}
                  short_link={media?.short_link}
                  field="/mass-media"
                />
              </Box>
            )}
            {author && (
              <Box>
                <Box className={styles.headings}>
                  <Typography className={styles.heading}>Доверяете ли вы автору новости?</Typography>
                </Box>
                <StatisticsCard
                  name={author?.name ? author?.name : 'Автор'}
                  photo={author?.photo}
                  percent={author?.percent}
                  short_link={author?.short_link}
                  field="/author"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleNewsStatistics;
