import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Container } from '@material-ui/core';
import SingleNewsHero from '../components/SingleNews/SingleNewsHero';
import SingleNewsList from '../components/SingleNews/SingleNewsList';
import SingleNewsStatistics from '../components/SingleNews/SingleNewsStatistics';
import { useFetchSingleNews } from '../components/home/hooks/useFetchSingleNews';
import { singleNewsSelector } from '../slices/SingleNewsSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';

interface MatchParamsI {
  link: string
}

interface Props extends RouteComponentProps<MatchParamsI> {}

const SingleNews: FC<Props> = (props) => {
  const { match } = props;
  useFetchSingleNews(match.params.link);
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector((singleNewsSelector.getStatus()));

  return (
    <>
      <Helmet>
        <title>Digital Democracy</title>
      </Helmet>
      <div>
        {status === APIStatus.Loading
          ? (
            <Container
              maxWidth="lg"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
              }}
            >
              <Loading size={80} />
              {' '}
            </Container>
          )
          : (
            <>
              <SingleNewsHero data={data?.currentNews} />
              <SingleNewsStatistics
                author={data?.currentNews?.author}
                media={data?.currentNews?.media}
                politicians={data?.politicians}
              />
              {
              data?.news && data?.news.length > 0
                ? (
                  <SingleNewsList
                    news={data?.news}
                    isMorePages={data?.isMorePages}
                  />
                )
                : null
          }
            </>
          )}
      </div>
    </>
  );
};

export default SingleNews;
