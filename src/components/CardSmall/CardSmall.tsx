import type { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory, matchPath } from 'react-router';
import watched from '../../icons/pictures/watched.png';
import logo from '../../icons/logo/2.svg';
import { AuthorI, MediaI } from '../../slices/homeSlice';
import { HashtagsI, NewTopicsI, RegionI } from '../../slices/newsSlice';
import classes from './CardSmall.module.scss';

interface CardSmallProps {
  media?: MediaI;
  author?: AuthorI;
  votes?: number;
  title?: string;
  publication_date?: string;
  number_of_views?: number;
  short_link?: string;
  image?: string;
}

const CardSmall: FC<CardSmallProps> = ({
  media,
  author,
  number_of_views,
  publication_date,
  title,
  votes,
  short_link,
  image,
}) => {
  const history = useHistory();
  const handle = () => {
    const newPath = matchPath(`/singleNews/${short_link}`, { path: '/singleNews/:link' });
    history.push(newPath.url);
  };
  return (
    <Box onClick={handle}>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.mainHeader}>
          <Typography className={classes.text}>{publication_date || ''}</Typography>
          <Box className={classes.bigHeader}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img className={classes.imgSize} src={watched} alt="/" />
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
              <img className={classes.imgSize} src={logo} alt="/" />
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
          <Box className={classes.cardContent}>
            <Typography className={classes.bigTitle}>{title}</Typography>
          </Box>
          <Box className={classes.cardNames}>
            <Typography sx={{ padding: 0 }} className={classes.text}>
              {author?.title}
            </Typography>
            <Typography sx={{ padding: 0 }} className={classes.text}>
              {media?.name}
            </Typography>
          </Box>
          <Box className={classes.imageContainer}>
            <img src={image} alt="news" className={classes.image} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardSmall;
