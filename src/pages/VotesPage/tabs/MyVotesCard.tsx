import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import VoteCard from 'src/components/VoteCard/VoteCard';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './MyVoteCard.module.scss';

const tempCards = [
  {
    id: 1,
    name: 'Card 1',
  },
  {
    id: 2,
    name: 'Card 2',
  },
  {
    id: 3,
    name: 'Card 3',
  },
  {
    id: 4,
    name: 'Card 4',
  },
  {
    id: 5,
    name: 'Card 5',
  },
];

const MyVoteCard = () => {
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);

  const handleIsMoreLoaded = () => {
    setIsMoreLoaded(true);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.CoutryContainer}>
        <Typography className={styles.CountryName}>
          <p> Мои выборы</p>
        </Typography>
      </div>

      <>
        <div className={styles.VotingCards}>
          {tempCards.slice(0, 4).map((card) => (
            <VoteCard key={card.id} />
          ))}
        </div>
        {tempCards?.length > 4 &&
          isMoreLoaded &&
          tempCards.slice(4).map((card) => (
            <div className={styles.VotingCards}>
              <VoteCard key={card.id} />
            </div>
          ))}
        {tempCards?.length > 4 && !isMoreLoaded && (
          <button type="button" className={styles.ShowOtherSelections} onClick={handleIsMoreLoaded}>
            Показать остальные выборы
          </button>
        )}
      </>
    </div>
  );
};

export default MyVoteCard;
