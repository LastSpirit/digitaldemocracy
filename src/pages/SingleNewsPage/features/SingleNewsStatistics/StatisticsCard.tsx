import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { VotesGroup } from 'src/components/VotesGroup/VotesGroup';
import { likes, frames } from 'src/icons/pictures/picturesExports/picturesExport';
import styles from './StatisticsCard.module.scss';

interface StatisticsCardPropsI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  field?: string;
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({ name, photo, percent, short_link, field }) => (
  <Card className={styles.card}>
    <Link to={`${field}/${short_link}`} className={styles.image}>
      <img src={frames.greenFrame} alt="frame" className={styles.frame} />
      <img src={photo} alt="avatar" className={styles.photo} />
    </Link>
    <Link to={`${field}/${short_link}`} className={styles.name}>
      <Typography className={styles.title}>{name}</Typography>
    </Link>
    <VotesGroup />
    <Box>
      <Typography className={styles.percent}>{percent}</Typography>
    </Box>
  </Card>
);

export default StatisticsCard;
