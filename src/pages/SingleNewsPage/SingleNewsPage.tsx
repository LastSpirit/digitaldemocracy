import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Container, Button } from '@material-ui/core';
import { BackButton } from 'src/components/BackButton/BackButton';
import { singleNewsSelector, singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { Loading } from 'src/components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import { WrapperAsyncRequest } from './features/Loading/WrapperAsyncRequest';
import SingleNewsHero from './features/SingleNewsHero/SingleNewsHero';
import SingleNewsList from './features/SingleNewsList/SingleNewsList';
import SingleNewsStatistics from './features/SingleNewsStatistics/SingleNewsStatistics';
import { useFetchSingleNews } from './hooks/useFetchSingleNews';
import { SingleBillsStatistics } from '../SingleBillsPage/features/SingleBillsStatistics/SingleBillsStatistics';

import styles from '../MassMediaPage/MassMediaPage.module.scss';

const SingleNews = (props) => {
  const { goBack, length, push } = useHistory() as any;
  const { t } = useTranslation();
  const { fetch } = useFetchSingleNews();
  const { resetSingleNews } = singleNewsActionCreators();
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
  const title = 'Ваше мнение по поводу законопроекта?';
  useEffect((): any => {
    fetch();
    return () => resetSingleNews();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <BackButton />
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
