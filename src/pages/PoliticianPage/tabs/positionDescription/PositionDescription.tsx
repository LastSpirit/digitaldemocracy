import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import styles from './PositionDescription.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import { useFetchPositionDescription } from './hooks/useFetchPositionDescription';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';

export default function Description() {
  const { status, fetch } = useFetchPositionDescription();
  const data = useSelector(politicianSelectors.getPositionsDescription());
  const result = data?.filter((item) => item.is_active === true);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <WrapperAsyncRequest status={status}>
      {data?.length ? (
        <div className={styles.root}>
          <h4>{data[0].position}</h4>
          <p>{data[0].description}</p>
          {data[0].link !== null ? (
            <div className={styles.link}>
              <p>Ссылка на иcточник: </p>
              <IconButton className={styles.arrowButton} onClick={() => window.open(data[0].link)}>
                <CallMadeIcon className={styles.arrowLink} />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={styles.empty}>
          <h3> Данных пока нет</h3>
        </div>
      )}
    </WrapperAsyncRequest>
  );
}

export const PositionDescription = () => <Description />;
