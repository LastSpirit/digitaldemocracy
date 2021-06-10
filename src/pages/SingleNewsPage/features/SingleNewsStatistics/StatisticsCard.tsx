import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { likes, frames } from 'src/icons/pictures/picturesExports/picturesExport';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import { MassmediaVotesGroup } from '../VotesGroup/MassmediaVotesGroup';
import { AuthorVotesGroup } from '../VotesGroup/AuthorVotesGroup';
import { PoliticianVotesGroup } from '../VotesGroup/PoliticianVotesGroup';
import styles from './StatisticsCard.module.scss';

interface StatisticsCardPropsI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  field?: string;
  rating?: string;
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({ name, photo, percent, short_link, field, rating }) => {
  return (
    <Card className={styles.card}>
      <Link to={`${field}/${short_link}`} className={styles.image}>
        <img src={avatarColorChanger(rating)} alt="frame" className={styles.frame} />
        <img src={photo} alt="avatar" className={styles.photo} />
      </Link>
      <Link to={`${field}/${short_link}`} className={styles.name}>
        <Typography className={styles.title}>{name}</Typography>
      </Link>
      {field === '/mass-media' ? (
        <MassmediaVotesGroup />
      ) : field === '/author' ? (
        <AuthorVotesGroup />
      ) : field === '/politician' ? (
        <PoliticianVotesGroup />
      ) : (
        <></>
      )}
      <Box>
        <Typography className={styles.percent}>{percent}</Typography>
      </Box>
    </Card>
  );
};
export default StatisticsCard;
