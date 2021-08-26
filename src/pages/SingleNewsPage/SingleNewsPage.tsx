import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { singleNewsSelector, singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { WrapperAsyncRequest } from './features/Loading/WrapperAsyncRequest';
import SingleNewsHero from './features/SingleNewsHero/SingleNewsHero';
import SingleNewsList from './features/SingleNewsList/SingleNewsList';
import SingleNewsStatistics from './features/SingleNewsStatistics/SingleNewsStatistics';
import { useFetchSingleNews } from './hooks/useFetchSingleNews';
import { SingleBillsStatistics } from '../SingleBillsPage/features/SingleBillsStatistics/SingleBillsStatistics';

import styles from '../MassMediaPage/MassMediaPage.module.scss';

const SingleNews = (props) => {
  const { fetch } = useFetchSingleNews();
  const { resetSingleNews } = singleNewsActionCreators();
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
  useEffect((): any => {
    fetch();
    return () => resetSingleNews();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <SingleNewsHero data={data?.currentNews} />
          <SingleNewsStatistics
            author={data?.currentNews?.author}
            media={data?.currentNews?.media}
            politicians={data?.politicians}
          />
          {data?.news && data?.news.length > 0 ? (
            <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />
          ) : null}
        </WrapperAsyncRequest>
      </div>
      {data?.bills && data?.bills.length > 0 ? data.bills.map((elem) => <SingleBillsStatistics {...elem} />) : null}
    </Container>
  );
};

export default SingleNews;
