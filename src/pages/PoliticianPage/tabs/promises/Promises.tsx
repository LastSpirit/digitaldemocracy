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
  const handleOpenNewTab = (link: string) => {
    window.open(link);
  };

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.map(({ text, link, promise_date }, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            key={index.toString()}
            className={styles.promise}
            onClick={() => handleOpenNewTab(link)}
          >
            {text}
            <div className={styles.date}>{promise_date}</div>
          </div>
        ))}
      </WrapperAsyncRequest>
    </div>
  );
};
