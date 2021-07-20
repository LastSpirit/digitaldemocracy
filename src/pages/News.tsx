import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFetchNewsData } from '../components/News/hooks/useFetchNewsData';
import NewsNav from '../components/News/NewsNav/NewsNav';
import NewsContent from '../components/News/NewsContent/NewsContent';
import { newsSelector } from '../slices/newsSlice';
import { userSelectors } from '../slices/userSlice';
import { APIStatus } from '../lib/axiosAPI';
import { Loading } from '../components/Loading/Loading';

const News: FC = () => {
  const navigation = [
    { title: 'Актуальное', id: 0, type: 'actual' },
    { title: 'Подписки', id: 1, type: 'subscriptions' },
    { title: 'Новости страны', id: 2, type: 'country' },
    { title: 'Новости региона', id: 3, type: 'region' },
    { title: 'Новости города', id: 4, type: 'city' },
  ];
  const [selectedTab, setSelectedTab] = useState('actual');
  const { fetch, fetchAreaNews, fetchDataStatus } = useFetchNewsData();
  const data = useSelector(newsSelector.getData());
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (selectedTab === 'country' || selectedTab === 'region' || selectedTab === 'city') {
      fetchAreaNews(selectedTab);
    } else {
      fetch();
    }
  }, [selectedTab]);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  return (
    <Box>
      <Container maxWidth="lg">
        {isAuthenticated && <NewsNav navigation={navigation} selectedTab={selectedTab} onClick={setSelectedTab} />}
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
          <NewsContent
            newsTopics={data?.newsTopics}
            news={data?.news}
            isMorePages={data?.isMorePages}
            nameArea={data?.country || data?.region || data?.city}
          />
        )}
      </Container>
    </Box>
  );
};

export default News;
