import type { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';
import { NewI } from '../../../slices/newsSlice';

const useStyles = makeStyles((theme) => ({
  bigCardContainer: {
    maxWidth: '100%',
    minWidth: '200px',
    height: 214,
    background: '#F3F3F3',
    borderRadius: 20,
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '300px'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '270px'
    }
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

interface CardSmallProps extends NewI {}

const CardSmall: FC<CardSmallProps> = ({ title, viewed, date, author, site }) => {
  const classes = useStyles();
  return (
    <Box style={{ textAlign: 'center' }}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography>{date}</Typography>
          <Box className={classes.bigHeadre}>
            <Box>
              <img
                className={classes.imgSize}
                src={watched}
                alt="/"
              />
              {' '}
              {viewed}
            </Box>
            <Box>
              <img
                className={classes.imgSize}
                src={logo}
                alt="/"
              />
              {' '}
              {viewed}
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h4"
          className={classes.cardContent}
        >
          <Typography style={{ fontSize: 24 }}>{title}</Typography>
        </Typography>
        <Box className={classes.cardNames}>
          <Typography>{author}</Typography>
          <Typography>{site}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardSmall;