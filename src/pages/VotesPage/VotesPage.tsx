import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useTranslation } from 'react-i18next';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { userSelectors } from 'src/slices/userSlice';
import { sortDropdownCountryVotes } from 'src/static/static';
import { Box, Button, Container } from '@material-ui/core';
import { GridArrowDownwardIcon } from '@material-ui/data-grid';
import { electionsActionCreators } from 'src/slices/votesPageSlice';
import { RootState } from '../../store';
import { useFetchListElections } from './hooks/useFetchListElections';
import { useFetchUserElections } from './hooks/useFetchUserElections';
import VotesCard from './tabs/VoteCards';
import styles from './VotesPage.module.scss';
import { SortDropdownVotes } from './tabs/SortDropdownVotes';
import { SortDropdownVotesMobile } from './tabs/SortDropdownVotesMobile';
import { VoteCalendar } from './tabs/VoteCalendar';
import MyVotesCard from './tabs/MyVotesCard';

const VotesPage = () => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { elections, isMorePages } = useSelector((s: RootState) => s.votes?.data);
  const userElections = useSelector((s: RootState) => s.votes?.userElections);
  const listElections = useSelector((s: RootState) => s.votes?.data);
  const { fetch, status } = useFetchListElections();
  const { fetchElections, statusElections } = useFetchUserElections();
  const [world, setWorld] = useState(true);
  const [worldVotes, setWorldVotes] = useState(false);
  const [update, setUpdate] = useState(true);
  const { resetEctions } = electionsActionCreators();
  const [isOnlyBefore, setIsOnlyBefore] = useState(0);
  const [page, setPage] = useState(1);
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  const [visibleElections, setVisibleElections] = useState([]);
  const [visibleUserElections, setVisibleUserElections] = useState([]);

  const resetElections = (onlyBefore) => {
    setVisibleElections([]);
    setVisibleUserElections([]);
    const newPage = 1;
    setPage(newPage);

    fetch(page, onlyBefore, calendarValue);
    if (!isAuthenticated) {
      return;
    }
    fetchElections(onlyBefore, calendarValue);
  };

  const handleChange = () => {
    const newOnlyBefore = isOnlyBefore === 0 ? 1 : 0;

    setIsOnlyBefore(newOnlyBefore);
    if (newOnlyBefore === 1) {
      setCalendarValue(null);
    }
    // const targetDate = new Date();
    // targetDate.setDate(targetDate.getDate() + 1);
    // setCalendarValue(targetDate);

    resetElections(newOnlyBefore);
  };

  useEffect(() => {
    if (userElections?.length > 0) {
      setVisibleUserElections(userElections);
    }
  }, [userElections]);

  // useEffect(() => {
  //   if (listElections?.length > 0) {
  //     setVisibleElections(listElections);
  //   }
  // }, [listElections]);

  useEffect(() => {
    if (elections && Object.values(elections).length > 0) {
      const visibleElectionsCopy = [...visibleElections];
      /* eslint-disable-next-line */
      for (const [key, value] of Object.entries(elections)) {
        const cards = value as any;
        if (cards.length > 0) {
          const country = cards[0]?.country;
          const index = visibleElectionsCopy.findIndex((e) => e.id === country.id);
          if (index === -1) {
            const election = {
              id: country.id,
              country,
              cards,
            };
            visibleElectionsCopy.push(election);
          }
        }
      }
      setVisibleElections(visibleElectionsCopy);
    }
  }, [elections, calendarValue]);

  // useEffect(() => {
  //   fetch(page, isOnlyBefore, calendarValue);
  // }, [isAuthenticated, update, page, calendarValue]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchElections(isOnlyBefore, calendarValue);
  //   }
  // }, [isAuthenticated, update]);

  const changeCalendarValue = (newValue) => {
    setCalendarValue(newValue);

    resetElections(isOnlyBefore);
  };

  const handleShowMoreCountries = () => {
    setPage(page + 1);
  };
  return (
    <Container maxWidth="lg" className={styles.VotesContainer}>
      {!isMobile ? (
        <div className={styles.sortDrop}>
          {sortDropdownCountryVotes(t).map(({ id, full_title, field }) => {
            return (
              <SortDropdownVotes
                key={id}
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
          <VoteCalendar
            page={page}
            isOnlyBefore={isOnlyBefore}
            handleChange={handleChange}
            changeCalendarValue={changeCalendarValue}
            calendarValue={calendarValue}
          />
        </div>
      ) : (
        <div className={styles.sortDrop}>
          {sortDropdownCountryVotes(t).map(({ id, full_title, field }) => {
            return (
              <SortDropdownVotesMobile
                key={id}
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
          <VoteCalendar
            page={page}
            isOnlyBefore={isOnlyBefore}
            handleChange={handleChange}
            changeCalendarValue={changeCalendarValue}
            calendarValue={calendarValue}
          />
        </div>
      )}
      <WrapperAsyncRequest status={status}>
        {isAuthenticated && <MyVotesCard props={visibleUserElections} />}
        {visibleElections.map((election) => (
          <VotesCard key={election?.id} props={election} />
        ))}
      </WrapperAsyncRequest>
      {isMorePages && (
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
