import type { FC } from 'react';
import { Box, Container, Typography, Grid, Button } from '@material-ui/core';
import { NewsI } from 'src/slices/SingleNewsSlice';
import CardSmall from 'src/components/CardSmall/CardSmall';
import styles from './SingleNewsList.module.scss';

interface NewsListI {
  news?: NewsI[],
  isMorePages?: boolean
}

const SingleNewsList: FC<NewsListI> = ({ news, isMorePages }) => (
  <Box className={styles.list}>
    <Container maxWidth="lg">
      <Box className={styles.headingContainer}>
        <Typography className={styles.heading}>Новости по теме</Typography>
      </Box>
      <Box className={styles.newsListContainer}>
        <Grid container spacing={2}>
          {news?.map((item) => (
            <Grid item lg={3} md={3} sm={12} key={item.id}>
              <CardSmall {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {isMorePages ? (
        <Box>
          <Button>
            <Typography className={styles.buttonText}>Показать больше</Typography>
          </Button>
        </Box>
      ) : null}
    </Container>
  </Box>
);

export default SingleNewsList;
