import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import SingleNewsHero from '../components/singleNews/SingleNewsHero';
import SingleNewsList from '../components/singleNews/SingleNewsList';
import SingleNewsStatistics from '../components/singleNews/SingleNewsStatistics';
import { useFetchSingleNews } from '../components/home/hooks/useFetchSingleNews';
import { singleNewsSelector } from '../slices/SingleNewsSlice';

const SingleNews: FC = () => {
  useFetchSingleNews();
  const data = useSelector(singleNewsSelector.getData());
  console.log(data);
  return (
    <>
      <Helmet>
        <title>Digital Democracy</title>
      </Helmet>
      <div>
        <SingleNewsHero />
        <SingleNewsStatistics />
        <SingleNewsList />
      </div>
    </>
  );
};

export default SingleNews;
