import type { FC } from 'react';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { likes, frames } from '../../../icons/pictures/picturesExports/picturesExport';
import styles from './StatisticsCard.module.scss';
import { VotesGroup } from '../../VotesGroup/VotesGroup';

interface StatisticsCardPropsI {
  name?: string;
  photo?: string;
  percent?: string;
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({ name, photo, percent }) => (
  <Card className={styles.card}>
    <Box className={styles.image}>
      <img src={frames.greenFrame} alt="frame" className={styles.frame} />
      <img src={photo} alt="avatar" className={styles.photo} />
    </Box>
    <Box className={styles.name}>
      <Typography className={styles.title}>{name}</Typography>
    </Box>
    <VotesGroup />
    <Box>
      <Typography className={styles.percent}>{percent}</Typography>
    </Box>
  </Card>
);

export default StatisticsCard;
