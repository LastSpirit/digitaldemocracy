import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import SingleNewsHero from '../components/singleNews/SingleNewsHero';
import SingleNewsList from '../components/singleNews/SingleNewsList';
import SingleNewsStatistics from '../components/singleNews/SingleNewsStatistics';

const SingleNews: FC = () => (
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

export default SingleNews;
