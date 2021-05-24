import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchPromises } from './hooks/useFetchPromises';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';
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
        {data?.map(({ text, link, promise_date }, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            key={index.toString()}
            className={styles.promise}
          >
            <span>{text}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
              <div className={styles.date}>
                Дата:
                {' '}
                {promise_date}
              </div>
            </div>
          </div>
        ))}
      </WrapperAsyncRequest>
    </div>
  );
};
