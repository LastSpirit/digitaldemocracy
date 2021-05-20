import type { FC } from 'react';
import {
  Box,
  IconButton,
  Card,
  Typography
} from '@material-ui/core';
import { likes, frames } from '../../../icons/pictures/picturesExports/picturesExport';
import styles from './StatisticsCard.module.scss';

interface StatisticsCardPropsI {
  name?: string,
  photo?: string,
  percent?: string
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({ name, photo, percent }) => (
  <Card className={styles.card}>
    <Box className={styles.image}>
      <img
        src={frames.greenFrame}
        alt="frame"
        className={styles.frame}
      />
      <img
        src={photo}
        alt="avatar"
        className={styles.photo}
      />
    </Box>
    <Box className={styles.name}>
      <Typography className={styles.title}>{name}</Typography>
    </Box>
    <Box className={styles.likeButtons}>
      <IconButton
        className={styles.likeButton}
        sx={{ marginRight: '10px' }}
      >
        <img
          src={likes.like}
          alt="like"
          className={styles.likeButtonIcon}
        />
      </IconButton>
      <IconButton className={styles.likeButton}>
        <img
          src={likes.dislike}
          alt="dislike"
          className={styles.likeButtonIcon}
        />
      </IconButton>
    </Box>
    <Box>
      <Typography className={styles.percent}>{percent}</Typography>
    </Box>
  </Card>
);

export default StatisticsCard;
