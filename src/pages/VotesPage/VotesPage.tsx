import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useTranslation } from 'react-i18next';
import { sortDropdownPoliticians } from 'src/static/static';
import { Box, Button, Container } from '@material-ui/core';
import { GridArrowDownwardIcon } from '@material-ui/data-grid';
import VotesCard from './tabs/VoteCards';
import styles from './VotesPage.module.scss';
import { SortDropdownVotes } from './tabs/SortDropdownVotes';
import { SortDropdownVotesMobile } from './tabs/SortDropdownVotesMobile';

const VotesPage = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const [world, setWorld] = useState(true);
  const [worldVotes, setWorldVotes] = useState(false);
  const [update, setUpdate] = useState(true);

  const [countries, setCountries] = useState([]);
  const loadCountriesNum = 25;
  const allCountries = Array(55).fill({
    id: 1,
    name: 'test',
  });

  useEffect(() => {
    const newCountries = allCountries.slice(0, loadCountriesNum);
    setCountries(newCountries);
  }, []);

  const handleShowMoreCountries = () => {
    if (allCountries.length - countries.length > 0) {
      const addedCountries = allCountries.slice(countries.length, countries.length + loadCountriesNum);
      const mergedCountries = countries.concat(addedCountries);
      setCountries(mergedCountries);
    }
  };

  return (
    <Container maxWidth="lg" className={styles.VotesContainer}>
      {!isMobile ? (
        <div className={styles.sortDrop}>
          {sortDropdownPoliticians(t).map(({ id, full_title, field }) => {
            return (
              <SortDropdownVotes
                key={id}
                text={full_title}
                field={field}
                world={world}
                setWorld={setWorld}
                update={update}
                setUpdate={setUpdate}
                worldVotes={worldVotes}
                setWorldVotes={setWorldVotes}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.sortDrop}>
          {sortDropdownPoliticians(t).map(({ id, full_title, field }) => {
            return (
              <SortDropdownVotesMobile
                key={id}
                text={full_title}
                field={field}
                world={world}
                setWorld={setWorld}
                update={update}
                setUpdate={setUpdate}
                worldVotes={worldVotes}
                setWorldVotes={setWorldVotes}
              />
            );
          })}
        </div>
      )}

      {countries.map((country) => (
        <VotesCard key={country.id} />
      ))}
      {allCountries.length - countries.length > 0 && (
        <Box className={styles.boxShowBtn}>
          <Button
            variant="outlined"
            onClick={handleShowMoreCountries}
            className={styles.showBtn}
            startIcon={<GridArrowDownwardIcon />}
          >
            {t('buttons.showMore')}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default VotesPage;
