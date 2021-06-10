import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { homeSelector } from '../../../slices/homeSlice';
import PartyCard from '../../../components/PartyCard/PartyCard';
import styles from '../PartyPage.module.scss';
import { partySelectors } from '../../../slices/partySlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useFetchPartyPoliticians } from '../hooks/useFetchPoliticians';
import { RootState } from '../../../store/index';
import { SortBadge } from './SortBadge';
import { sortParty } from '../../../static/static';
import logo from '../../../icons/logo/2.svg';
import { WrapperAsyncRequest } from '../../../components/Loading/WrapperAsyncRequest';

const PartyBlock = () => {
  const { isMobile } = useWindowSize();
  const data = useSelector(partySelectors.getPartyPoliticians());
  const partyInfo = useSelector(partySelectors.getPartyInfo());
  const { fetch, status } = useFetchPartyPoliticians();
  const sortDirection = useSelector((s: RootState) => s.party.sort_direction);
  const sortField = useSelector((s: RootState) => s.party.sort_field);

  useEffect(() => {
    fetch(partyInfo.id);
  }, [sortDirection, sortField]);

  return (
    <WrapperAsyncRequest status={status}>
      <div className={styles.newsContainer}>
        <div className={styles.sortRow}>
          {sortParty.map(({ id, full_title, short_title, field }) => {
            return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
          })}
        </div>
        {data?.politicians && data?.politicians.length > 0 ? (
          <div className={styles.news}>
            {data?.politicians?.map((item, index) => (
              <PartyCard {...item} />
            ))}
          </div>
        ) : (
          <div className={styles.noNewsBlock}>
            <span>Здесь будут отображаться политики</span>
          </div>
        )}
      </div>
    </WrapperAsyncRequest>
  );
};

export default PartyBlock;
