import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { HomeHero, HomeSlider, HomeFeatures } from '../components/home';
import { homeSelector } from '../slices/homeSlice';
import gtm from '../lib/gtm';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const data = useSelector(homeSelector.getData());
  console.log(data);

  return (
    <>
      <Helmet>
        <title>Material Kit Pro</title>
      </Helmet>
      <div>
        <HomeHero />
        <HomeSlider />
        <HomeFeatures />
      </div>
    </>
  );
};

export default Home;
