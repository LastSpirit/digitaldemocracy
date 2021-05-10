import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import SingleNewsHero from '../components/SingleNews/SingleNewsHero';
import SingleNewsList from '../components/SingleNews/SingleNewsList';
import SingleNewsStatistics from '../components/SingleNews/SingleNewsStatistics';
import { useFetchSingleNews } from '../components/home/hooks/useFetchSingleNews';
import { singleNewsSelector } from '../slices/SingleNewsSlice';

interface MatchParamsI {
  link: string
}

interface Props extends RouteComponentProps<MatchParamsI> {}

const SingleNews: FC<Props> = (props) => {
  const { match } = props;
  useFetchSingleNews(match.params.link);
  const data = useSelector(singleNewsSelector.getData());

  return (
    <>
      <Helmet>
        <title>Digital Democracy</title>
      </Helmet>
      <div>
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
      </div>
    </>
  );
};

export default SingleNews;
