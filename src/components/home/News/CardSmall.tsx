import type { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';
import { AuthorI, MediaI } from '../../../slices/homeSlice';

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

interface CardSmallProps {
  media?: MediaI,
  author?: AuthorI,
  votes: number,
  title: string,
  publication_date: Date,
  number_of_views: number
}

const CardSmall: FC<CardSmallProps> = ({ media, author, number_of_views, publication_date, title, votes }) => {
  const classes = useStyles();
  return (
    <Box style={{ textAlign: 'center' }}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography>{publication_date || ''}</Typography>
          <Box className={classes.bigHeadre}>
            <Box>
              <img
                className={classes.imgSize}
                src={watched}
                alt="/"
              />
              {' '}
              {number_of_views || ''}
            </Box>
            <Box>
              <img
                className={classes.imgSize}
                src={logo}
                alt="/"
              />
              {' '}
              {votes}
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
          <Typography>{author?.title}</Typography>
          <Typography>{media?.name}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardSmall;
