import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Container, Button } from '@material-ui/core';
import SingleNewsHero from '../components/SingleNews/SingleNewsHero/SingleNewsHero';
import SingleNewsList from '../components/SingleNews/SingleNewsList/SingleNewsList';
import SingleNewsStatistics from '../components/SingleNews/SingleNewsStatistics/SingleNewsStatistics';
import { useFetchSingleNews } from '../components/SingleNews/hooks/useFetchSingleNews';
import { singleNewsSelector } from '../slices/SingleNewsSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';
import styles from './MassMediaPage/MassMediaPage.module.scss';

interface MatchParamsI {
  link: string;
}

interface Props extends RouteComponentProps<MatchParamsI> {}

const SingleNews: FC<Props> = (props) => {
  const { goBack, length, push } = useHistory() as any;
  const { match } = props;
  useFetchSingleNews(match.params.link);
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
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
