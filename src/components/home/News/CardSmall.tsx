import type { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';
import { AuthorI, MediaI } from '../../../slices/homeSlice';

const useStyles = makeStyles((theme) => ({
  bigCardContainer: {
    maxWidth: '250px',
    minWidth: '250px',
    minHeight: 450,
    maxHeight: 450,
    background: '#F3F3F3',
    borderRadius: 20,
    marginTop: 16,
    fontFamily: 'Helvetica',
    padding: '14px 18px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      minHeight: '150px'
    }
  },
  bigHeader: {
    display: 'flex',
    flexFlow: 'column',
  },
  cardContent: {
    fontSize: 18,
    marginBottom: 14,
    fontWeight: 400,
  },
  cardNames: {
    fontSize: 18,
    color: '#747373',
    justifyContent: 'space-between',
    display: 'flex',
    textDecoration: 'underline',
  },

  imgSize: {
    width: 14,
    height: 14,
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#747373',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '380px',
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'unset'
    }
  },
  imageContainer: {
    width: '100%',
    height: '180px',
    textAlign: 'center'
  },
  image: {
    width: 'inherit',
    height: '180px',
    maxWidth: '275px',
    maxHeight: '180px',
    objectFit: 'cover',
    borderRadius: '20px',
    margin: '0 auto'
  }
}));

interface CardSmallProps {
  media?: MediaI,
  author?: AuthorI,
  votes: number,
  title: string,
  publication_date: Date,
  number_of_views: number,
  short_link?: string,
  image?: string
}

const CardSmall: FC<CardSmallProps> = ({ media, author, number_of_views, publication_date, title, votes, short_link, image }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box onClick={() => history.push(`singleNews/${short_link}`)}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography>{publication_date || ''}</Typography>
          <Box className={classes.bigHeader}>
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
        <Box className={classes.content}>
          <Box
            className={classes.cardContent}
          >
            <Typography style={{ fontSize: 18, lineHeight: '25px', textOverflow: 'ellipsis' }}>{title}</Typography>

          </Box>
          <Box className={classes.cardNames}>
            <Typography>{author?.title}</Typography>
            <Typography>{media?.name}</Typography>
          </Box>
          <Box className={classes.imageContainer}>
            <img
              src={image}
              alt="news"
              className={classes.image}
            />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default CardSmall;
