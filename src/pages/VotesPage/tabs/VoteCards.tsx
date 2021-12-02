import { Typography } from '@material-ui/core';
import React, { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import VoteCard from 'src/components/VoteCard/VoteCard';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { votesSelectors } from 'src/slices/votesPageSlice';
import { useTranslation } from 'react-i18next';
import styles from './VoteCards.module.scss';

interface ElectionsI {
  props?: any;
}

const VoteCards: FC<ElectionsI> = ({ props }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(props?.cards);
  }, [props]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleIsMoreLoaded = () => {
    setIsMoreLoaded(true);
  };

  const getCountryName = () => {
    const language = i18n?.language ?? 'ru';

    return props?.country?.title[language];
  };

  return (
    <div className={styles.Container}>
      <div className={styles.CoutryContainer}>
        <Typography className={styles.CountryName} onClick={handleClick}>
          <p> {getCountryName()}</p>
          {open ? <ExpandMoreIcon sx={{ marginLeft: '15px' }} /> : <ExpandLessIcon sx={{ marginLeft: '15px' }} />}
        </Typography>
      </div>
      {open && (
        <>
          <div className={styles.VotingCards}>
            {cards.slice(0, 4).map((card) => (
              <VoteCard key={card.id} props={card} />
            ))}
          </div>

          <div className={styles.VotingCards}>
            {cards?.length > 4 && isMoreLoaded && cards.slice(4).map((card) => <VoteCard key={card.id} props={card} />)}
          </div>
          {cards?.length > 4 && !isMoreLoaded && (
            <button type="button" className={styles.ShowOtherSelections} onClick={handleIsMoreLoaded}>
              Показать остальные выборы
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VoteCards;
