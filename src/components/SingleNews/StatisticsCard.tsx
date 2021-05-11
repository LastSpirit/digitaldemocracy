import type { FC } from 'react';
import {
  Box,
  IconButton,
  Card,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { likes, frames } from '../../icons/pictures/picturesExports/picturesExport';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#ededed',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '555px',
    borderRadius: '10px',
    padding: '0 20px 0 0',
    marginBottom: '17px',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    width: 88,
    height: 88,
    marginRight: 25
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 88,
    height: 88,
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '88px',
    height: '88px',
    objectFit: 'cover',
    zIndex: 3,
    borderRadius: '50%',
    background: 'white'
  },
  name: {
    maxWidth: '180px',
    marginRight: 20
  },
  title: {
    fontSize: '18px',
    color: '#222',
    fontFamily: 'Helvetica',
    fontWeight: 300
  },
  likeButtons: {
    display: 'flex',
    marginRight: 20
  },
  likeButton: {
    padding: 0,
    cursor: 'pointer'
  },
  likeButtonIcon: {
    width: 50,
    height: 50,
  },
  percent: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 300
  }
}));

interface StatisticsCardPropsI {
  name?: string,
  photo?: string,
  percent?: string
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({ name, photo, percent }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Box className={classes.image}>
        <img
          src={frames.greenFrame}
          alt="frame"
          className={classes.frame}
        />
        <img
          src={photo}
          alt="avatar"
          className={classes.photo}
        />
      </Box>
      <Box className={classes.name}>
        <Typography className={classes.title}>{name}</Typography>
      </Box>
      <Box className={classes.likeButtons}>
        <IconButton
          className={classes.likeButton}
          sx={{ marginRight: '10px' }}
        >
          <img
            src={likes.like}
            alt="like"
            className={classes.likeButtonIcon}
          />
        </IconButton>
        <IconButton className={classes.likeButton}>
          <img
            src={likes.dislike}
            alt="dislike"
            className={classes.likeButtonIcon}
          />
        </IconButton>
      </Box>
      <Box>
        <Typography className={classes.percent}>{percent}</Typography>
      </Box>
    </Card>
  );
};

export default StatisticsCard;
