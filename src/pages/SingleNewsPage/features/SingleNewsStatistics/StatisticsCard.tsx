import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Card, Typography } from '@material-ui/core';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
  return (
    <div className={styles.card}>
      <Link to={`${field}/${short_link}`} className={styles.image}>
        <img src={avatarColorChanger(rating)} alt="frame" className={styles.frame} />
        <div className={styles.photoContainer}>
          <img src={photo} alt="avatar" className={isMasmedia ? styles.massmediaPhoto : styles.photo} />
        </div>
      </Link>
      <div className={styles.cardContent}>
        <div className={styles.title}>{name}</div>

        <div className={styles.bottomItem}>
          {percent ? (
            <div className={styles.percent}>
              {percentIsPositive ? (
                <ArrowUpwardIcon className={styles.upIcon} />
              ) : (
                <ArrowDownwardIcon className={styles.downIcon} />
              )}
              <div className={styles.text}>{percent}</div>
            </div>
          ) : (
            <></>
          )}
          {field === '/mass-media' ? (
            <MassmediaVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
          ) : field === '/author' ? (
            <AuthorVotesGroup likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
          ) : field === '/politician' ? (
            <PoliticianVotesGroup
              likes={likes}
              dislikes={dislikes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              index={politicianIndex}
              id={id}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default StatisticsCard;
