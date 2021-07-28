/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import { useFetchAdditionalInformation } from './hooks/useFetchAdditionalInformation';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianActionCreators, politicianSelectors } from '../../../../slices/politicianSlice';
import styles from './styles.module.scss';

export const AdditionalInformation = () => {
  const { fetch, status } = useFetchAdditionalInformation();
  const data = useSelector(politicianSelectors.getPoliticianAdditionalInformation());

  useEffect(() => {
    fetch();
  }, [data?.[0]?.id]);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {data?.map((item) => {
          return (
            <div key={item.id} className={styles.informationBlock}>
              <div className={styles.link}>
                <p>Ссылка на иcточник: </p>
                <a href={item.link} className={styles.linkContent}>
                  {item.title}
                </a>
              </div>
            </div>
          );
        })}
      </WrapperAsyncRequest>
    </div>
  );
};
