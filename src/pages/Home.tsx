import { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { SuggestButton } from 'src/components/SuggestButton/SuggestButton';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { HomeHero, HomeSlider, HomeFeatures } from '../components/home';
import { useFetchHomePageData } from '../components/home/hooks/useFetchHomePageData';
import { homeSelector, homeSlice } from '../slices/homeSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';
import gtm from '../lib/gtm';
import { userSelectors } from '../slices/userSlice';
import { useSearchParams } from '../hooks/useSearchParams';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  const { isMobile } = useWindowSize();
  const { fetch, fetchDataStatus, fetchNewsStatus } = useFetchHomePageData();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const {
    news_topic_id: { setValue: setTopicId },
  } = useSearchParams('news_topic_id');
  const { pageReset } = homeSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    setTopicId('-1');
    fetch();
    return () => {
      dispatch(pageReset());
    };
  }, []);
  const data = useSelector(homeSelector.getData());
  return (
    <>
      <div>
        {fetchDataStatus === APIStatus.Loading ? (
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
            {!isAuthenticated && <HomeHero />}
            {isAuthenticated && isMobile && <SuggestButton />}
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
