/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import { useFetchBills } from './hooks/useFetchBills';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { VotesGroup } from '../../../../components/VotesGroup/VotesGroup';
import styles from './styles.module.scss';

const Bills = ({ title, source_link, publication_date, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.promise}>
        <div className={styles.promises}>
          <div className={styles.date}>{publication_date}</div>
          <span>{title}</span>
          <div className={styles.link}>
            <p>Иcточник: </p>
            <IconButton className={styles.arrowButton} onClick={() => setOpen(!open)}>
              <CallMadeIcon className={styles.arrowLink} />
            </IconButton>
          </div>
        </div>
        <div className={styles.votes}>
          <p>Как вы к этому относитесь?</p>
          <VotesGroup />
        </div>
      </div>
      {open ? (
        <iframe
          title={`${source_link}`}
          loading="lazy"
          src={source_link}
          style={{ marginBottom: '20px', borderBottom: '1px solid #b0b0b0', paddingBottom: '20px' }}
        />
      ) : null}
    </>
  );
};

export const PoliticianBills = () => {
  const { status, fetch } = useFetchBills();
  const data = useSelector(politicianSelectors.getBills());
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.length ? (
          data?.map(({ title, source_link, publication_date, id }) => (
            <Bills key={id} title={title} source_link={source_link} publication_date={publication_date} id={id} />
          ))
        ) : (
          <div className={styles.noPromises}>Раздел пока еще пуст</div>
        )}
      </WrapperAsyncRequest>
    </div>
  );
};
