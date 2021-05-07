import type { FC } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  hero: {
    paddingTop: 50
  },
  newsContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: '20px',
    padding: '10px 20px',
    display: 'flex'
  },
  newsTitle: {
    width: '60%',
    borderRight: '1px solid #b0b0b0',
    paddingRight: '50px',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 50,
    color: '#222222',
    maxWidth: '600px',
    lineHeight: '55px',
    marginBottom: '20px'
  },
  arrows: {
    display: 'flex'
  }
}));

const SingleNewsHero: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.hero}>
      <Container maxWidth="lg">
        <Box className={classes.newsContainer}>
          <Box className={classes.newsTitle}>
            <Typography className={classes.title}>В Узбекистане вывели новый сорт чая</Typography>
            <Box className={classes.arrows} />
          </Box>
          <Box>Meduza</Box>
        </Box>
      </Container>

    </Box>
  );
};

export default SingleNewsHero;
