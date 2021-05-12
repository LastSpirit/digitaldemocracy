import { useEffect } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { HomeHero, HomeSlider, HomeFeatures } from '../components/home';
import { useFetchHomePageData } from '../components/home/hooks/useFetchHomePageData';
import { homeSelector } from '../slices/homeSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';
import gtm from '../lib/gtm';
import { userSelectors } from '../slices/userSlice';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const { fetch, fetchDataStatus, fetchNewsStatus } = useFetchHomePageData();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  useEffect(() => {
    fetch();
  }, []);
  const data = useSelector(homeSelector.getData());

  return (
    <>
      <div>
        {fetchDataStatus === APIStatus.Loading
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
          ) : (
            <>
              {!isAuthenticated && (
              <HomeHero />
              )}
              <HomeSlider data={data?.politicians} />
              <HomeFeatures
                newsTopics={data?.newsTopics}
                news={data?.news}
                status={fetchNewsStatus}
                isMorePages={data?.isMorePages}
              />
            </>
          )}
      </div>
    </>
  );
};

export default Home;
