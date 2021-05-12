import type { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import watched from '../../../icons/pictures/watched.png';
import logo from '../../../icons/logo/2.svg';
import { AuthorI, MediaI } from '../../../slices/homeSlice';

const useStyles = makeStyles((theme) => ({
  bigCardContainer: {
    // maxWidth: '240px',
    minWidth: '180px',
    minHeight: 380,
    maxHeight: 420,
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
      minHeight: '150px',
      maxHeight: '370px'
    }
  },
  bigHeader: {
    display: 'flex',
    flexFlow: 'column',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '15px'
    }
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 500,
    lineHeight: '18px',
    fontFamily: 'Helvetica',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    }
  },
  cardNames: {
    fontSize: 14,
    color: '#747373',
    justifyContent: 'space-between',
    display: 'flex',
    textDecoration: 'underline',
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    }
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
    minHeight: '300px',
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
    margin: '0 auto',
  },
  bigTitle: {
    fontSize: '14px',
    lineHeight: '20px',
    height: '80px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      height: 'unset'
    }
  },
  text: {
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    }
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
          <Typography className={classes.text}>
            {publication_date || ''}
          </Typography>
          <Box className={classes.bigHeader}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                className={classes.imgSize}
                src={watched}
                alt="/"
              />
              {' '}
              <Typography
                sx={{

                  marginLeft: '7px',

                }}
                className={classes.text}
              >
                {number_of_views || ''}
              </Typography>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <img
                className={classes.imgSize}
                src={logo}
                alt="/"
              />
              {' '}
              <Typography
                sx={{

                  marginLeft: '7px',

                }}
                className={classes.text}
              >
                {votes}
              </Typography>

            </Box>
          </Box>
        </Box>
        <Box className={classes.content}>
          <Box
            className={classes.cardContent}
          >
            <Typography className={classes.bigTitle}>{title}</Typography>

          </Box>
          <Box className={classes.cardNames}>
            <Typography
              sx={{ padding: 0 }}
              className={classes.text}
            >
              {author?.title}
            </Typography>
            <Typography
              sx={{ padding: 0 }}
              className={classes.text}
            >
              {media?.name}
            </Typography>
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
