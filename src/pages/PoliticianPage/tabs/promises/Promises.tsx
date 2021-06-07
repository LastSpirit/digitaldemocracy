/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchPromises } from './hooks/useFetchPromises';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { VotesGroup } from '../../../../components/VotesGroup/VotesGroup';
import styles from './styles.module.scss';

export const Promises = () => {
  const { status, fetch } = useFetchPromises();
  const data = useSelector(politicianSelectors.getPositionPromises());
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.length ? (
          data?.map(({ text, link, promise_date }, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div key={index.toString()} className={styles.promise}>
              <div className={styles.promises}>
                <div className={styles.date}>{promise_date}</div>
                <span>{text}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a href={link} target="_blank" rel="noreferrer">
                    ссылка на статью
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a href={link} target="_blank" rel="noreferrer">
                    ссылка на видео
                  </a>
                </div>
              </div>
              <div className={styles.votes}>
                <p>Как вы к этому относитесь?</p>
                <VotesGroup />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noPromises}>Не было обещаний</div>
        )}
      </WrapperAsyncRequest>
    </div>
  );
};
