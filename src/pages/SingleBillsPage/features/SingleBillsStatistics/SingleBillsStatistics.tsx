import type { FC } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { AuthorI, MediaI, PoliticiansI } from 'src/slices/SingleNewsSlice';
import StatisticsCard from './StatisticsCard';

import styles from './SingleBillsStatistics.module.scss';

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
          Ваше мнение по поводу законопроекта?
        </Typography>
        <Grid container className={styles.statisticsContainer}>
          <Grid item lg={6} md={12} sm={12}>
            {author && (
              <Box>
                <StatisticsCard
                  name={author?.name ? author?.name : 'Автор'}
                  photo={author?.photo}
                  percent={author?.percent}
                  short_link={author?.short_link}
                  rating={author?.rating}
                  field="/author"
                  likes={author?.number_of_likes}
                  dislikes={author?.number_of_dislikes}
                  isLiked={author?.is_user_liked}
                  isDisliked={author?.is_user_disliked}
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
