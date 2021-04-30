import type { FC } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';

const useStyles = makeStyles(() => ({
  bigCardContainer: {
    width: 325,
    height: 214,
    background: '#F3F3F3',
    borderRadius: 20,
    marginTop: 20,
  },
  bigHeadre: {
    display: 'flex',
    flexFlow: 'column',
  },
  cardContent: {
    fontSize: 24,
    marginBottom: 14,
    fontWeight: 400,
  },
  cardNames: {
    fontSize: 18,
    color: '#747373',
    justifyContent: 'space-around',
    display: 'flex',
    textDecoration: 'underline',
  },

  imgSize: {
    width: 14,
    height: 14,
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '14px 11px',
    color: '#747373',
  },
}));

const CardSmall: FC = () => {
  const classes = useStyles();
  return (
    <Container style={{ textAlign: 'center' }}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography>Дата новости</Typography>
          <Box className={classes.bigHeadre}>
            <Box>
              <img
                className={classes.imgSize}
                src={watched}
                alt="/"
              />
              {' '}
              2203
            </Box>
            <Box mr={1}>
              <img
                className={classes.imgSize}
                src={logo}
                alt="/"
              />
              {' '}
              2203
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h4"
          className={classes.cardContent}
        >
          <Typography style={{ fontSize: 24 }}>В Узбекистане вывели</Typography>
          <Typography style={{ fontSize: 24 }}> новый сорт чая</Typography>
        </Typography>
        <Box className={classes.cardNames}>
          <Typography>Алина Романова</Typography>
          <Typography>Rusbase.ru</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CardSmall;
