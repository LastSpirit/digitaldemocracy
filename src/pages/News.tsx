import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFetchNewsData } from '../components/News/hooks/useFetchNewsData';
import NewsNav from '../components/News/NewsNav/NewsNav';
import NewsContent from '../components/News/NewsContent/NewsContent';
import { newsSelector } from '../slices/newsSlice';
import { userSelectors } from '../slices/userSlice';

const News: FC = () => {
  const navigation = [
    { title: 'Актуальное', id: 0, type: 'actual' },
    { title: 'Подписки', id: 1, type: 'subscriptions' },
    { title: 'Новости страны', id: 2, type: 'country' },
    { title: 'Новости региона', id: 3, type: 'region' },
    { title: 'Новости города', id: 4, type: 'city' },
  ];
  const [selectedTab, setSelectedTab] = useState('actual');
  const { fetch, fetchAreaNews } = useFetchNewsData();
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
  const data = useSelector(newsSelector.getData());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  return (
    <Box>
      <Container maxWidth="lg">
        {isAuthenticated && <NewsNav navigation={navigation} selectedTab={selectedTab} onClick={setSelectedTab} />}
        <NewsContent newsTopics={data?.newsTopics} news={data?.news} isMorePages={data?.isMorePages} />
      </Container>
    </Box>
  );
};

export default News;
