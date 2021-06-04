import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { homeSelector } from '../../../slices/homeSlice';
import PartyCard from '../../../components/PartyCard/PartyCard';
import styles from '../PartyPage.module.scss';
import { partySelectors } from '../../../slices/partySlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { SortBadge } from './SortBadge';
import { sortParty } from '../../../static/static';
import logo from '../../../icons/logo/2.svg';

const staticInfo = [
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: true,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
  {
    percent: 42,
    name: 'Имя политика',
    url: logo,
    subscribe: false,
  },
];

const PartyBlock = () => {
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.newsContainer}>
      <div className={styles.sortRow}>
        {sortParty.map(({ id, full_title, short_title, field }) => {
          return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
        })}
      </div>
      {staticInfo && staticInfo.length > 0 ? (
        <div className={styles.news}>
          {staticInfo?.map((item, index) => (
            <PartyCard {...item} />
          ))}
        </div>
      ) : (
        <div className={styles.noNewsBlock}>
          <span>Здесь будут отображаться новости за выбранный период</span>
        </div>
      )}
    </div>
  );
};

export default PartyBlock;
