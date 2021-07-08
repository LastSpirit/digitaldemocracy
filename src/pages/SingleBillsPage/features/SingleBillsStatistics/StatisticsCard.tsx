import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { AuthorVotesGroup } from '../VotesGroup/AuthorVotesGroup';
import styles from './StatisticsCard.module.scss';

interface StatisticsCardPropsI {
  name?: string;
  photo?: string;
  percent?: string;
  short_link?: string;
  field?: string;
  rating?: string;
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  politicianIndex?: number;
  id?: number;
  isMasmedia?: boolean;
}

const StatisticsCard: FC<StatisticsCardPropsI> = ({
  name,
  photo,
  percent,
  short_link,
  field,
  rating,
  likes,
  dislikes,
  isLiked,
  isDisliked,
  politicianIndex,
  id,
  isMasmedia,
}) => {
  const percentIsPositive = percent?.includes('+') && !percent?.includes('-');
  const { isMobile } = useWindowSize();
  return (
    <>
      {isMobile ? (
        <div className={styles['card-mobile']}>
          <div className={styles.topItems}>
            <div className={styles.cardContent}>
              <Link to={`${field}/${short_link}`} className={styles.title}>
                Название законопроекта
              </Link>
            </div>
          </div>
          <div className={styles.bottomItems}>
            <AuthorVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <Link to={`${field}/${short_link}`} className={styles.title}>
              Название законопроекта
            </Link>
            <div className={styles.bottomItem}>
              <AuthorVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StatisticsCard;
