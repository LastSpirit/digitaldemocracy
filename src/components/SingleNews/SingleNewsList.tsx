import type { FC } from 'react';
import { Box, makeStyles, Container, Typography, Grid, Button } from '@material-ui/core';
import { NewsI } from '../../slices/SingleNewsSlice';
import CardSmall from '../home/News/CardSmall';

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: 30
  },
  heading: {
    fontSize: '25px',
    lineHeight: '30px',
    fontWeight: 300,
    fontFamily: 'Helvetica',
    color: '#7a7a7a',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    },
  },
  headingContainer: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e5e5',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
      paddingBottom: '15px',
    },
  },
  newsContainer: {
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '50px',
    },
  },
  buttonText: {
    color: '#363557',
    fontSize: '20px',
    textDecoration: 'underline',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
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
