import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { HomeHero, HomeSlider, HomeFeatures } from '../components/home';
import { useFetchHomePageData } from '../components/home/hooks/useFetchHomePageData';
import { homeSelector } from '../slices/homeSlice';
import gtm from '../lib/gtm';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useFetchHomePageData();
  const data = useSelector(homeSelector.getData());
  const status = useSelector(homeSelector.getStatus());

  return (
    <>
      <Helmet>
        <title>Digital Democracy</title>
      </Helmet>
      <div>
        <HomeHero />
        <HomeSlider data={...data?.politicians} />
        <HomeFeatures />
      </div>
    </>
  );
};

export default Home;
