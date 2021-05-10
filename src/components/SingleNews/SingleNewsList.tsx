import type { FC } from 'react';
import { Box, makeStyles, Container, Typography, Grid, Button } from '@material-ui/core';
import { NewsI } from '../../slices/SingleNewsSlice';
import CardSmall from '../home/News/CardSmall';

const useStyles = makeStyles(() => ({
  list: {
    marginBottom: 55
  },
  heading: {
    fontSize: '30px',
    lineHeight: '30px',
    fontWeight: 300,
    fontFamily: 'Helvetica',
    color: '#7a7a7a',
    padding: 0
  },
  headingContainer: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e5e5'
  },
  newsContainer: {
    marginBottom: '100px'
  },
  buttonText: {
    color: '#363557',
    fontSize: '20px',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

interface NewsListI {
  news?: NewsI[],
  isMorePages?: boolean
}

const SingleNewsList: FC<NewsListI> = ({ news, isMorePages }) => {
  const classes = useStyles();
  console.log(news);
  return (
    <Box className={classes.list}>
      <Container maxWidth="lg">
        <Box className={classes.headingContainer}>
          <Typography className={classes.heading}>Новости по теме</Typography>
        </Box>
        <Box className={classes.newsContainer}>
          <Grid container>
            {news?.map((item) => (
              <Grid
                item
                lg={3}
                md={3}
                sm={12}
                key={item.id}
              >
                <CardSmall {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {isMorePages
          ? (
            <Box>
              <Button>
                <Typography className={classes.buttonText}>
                  Показать больше
                </Typography>

              </Button>
            </Box>
          )
          : null}

      </Container>

    </Box>
  );
};

export default SingleNewsList;
