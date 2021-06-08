import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Container, Button } from '@material-ui/core';
import { singleNewsSelector, singleNewsActionCreators } from 'src/slices/SingleNewsSlice';
import { APIStatus } from 'src/lib/axiosAPI';
import { Loading } from 'src/components/Loading/Loading';
import SingleNewsHero from './features/SingleNewsHero/SingleNewsHero';
import SingleNewsList from './features/SingleNewsList/SingleNewsList';
import SingleNewsStatistics from './features/SingleNewsStatistics/SingleNewsStatistics';
import { useFetchSingleNews } from './hooks/useFetchSingleNews';

import styles from '../MassMediaPage/MassMediaPage.module.scss';

const SingleNews = (props) => {
  const { goBack, length, push } = useHistory() as any;
  const { fetch } = useFetchSingleNews();
  const { resetSingleNews } = singleNewsActionCreators();
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
  useEffect((): any => {
    fetch();
    return () => resetSingleNews();
  }, []);
  return (
    <>
      <div>
        {status === APIStatus.Loading ? (
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <Loading size={80} />
          </Container>
        ) : (
          <>
            <div className={styles.buttonRow} style={{ width: '78%', margin: '0 auto' }}>
              <Button
                variant="outlined"
                className={styles.backButton}
                onClick={() => (length > 2 ? goBack() : push('/'))}
              >
                <div className={styles.icon}>←</div>
                <div className={styles.text}>Назад</div>
              </Button>
            </div>
            <SingleNewsHero data={data?.currentNews} />
            <SingleNewsStatistics
              author={data?.currentNews?.author}
              media={data?.currentNews?.media}
              politicians={data?.politicians}
            />
            {data?.news && data?.news.length > 0 ? (
              <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default SingleNews;
