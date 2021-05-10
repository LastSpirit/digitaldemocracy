import type { FC } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import { NewsI } from '../../slices/SingleNewsSlice';
// import CardSmall from "../home/News/CardSmall";

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
  }
}));

interface NewsListI {
  news?: NewsI[]
}

const SingleNewsList: FC<NewsListI> = ({ news }) => {
  const classes = useStyles();
  console.log(news);
  return (
    <Box className={classes.list}>
      <Container maxWidth="lg">
        <Box className={classes.headingContainer}>
          <Typography className={classes.heading}>Новости по теме</Typography>
        </Box>
        <Box className={classes.newsContainer}>
          {/* <Grid container> */}

          {/* </Grid> */}
        </Box>
      </Container>

    </Box>
  );
};

export default SingleNewsList;
