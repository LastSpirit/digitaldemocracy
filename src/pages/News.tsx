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

export enum TypeNavigationMenu {
  ACTUAL = 'actual',
  SUBSCRIPTIONS = 'subscriptions',
  COUNTRY = 'country',
  REGION = 'region',
  CITY = 'city'
}

const News: FC = () => {
  const navigation = [
    { title: 'Актуальное', id: 0, type: TypeNavigationMenu.ACTUAL },
    { title: 'Подписки', id: 1, type: TypeNavigationMenu.SUBSCRIPTIONS },
    { title: 'Новости страны', id: 2, type: TypeNavigationMenu.COUNTRY },
    { title: 'Новости региона', id: 3, type: TypeNavigationMenu.REGION },
    { title: 'Новости города', id: 4, type: TypeNavigationMenu.CITY },
  ];
  const [selectedTab, setSelectedTab] = useState(TypeNavigationMenu.ACTUAL);
  const { fetch, fetchAreaNews, fetchDataStatus, fetchSubscriptionsNews } = useFetchNewsData();
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    switch (selectedTab) {
      case TypeNavigationMenu.COUNTRY:
      case TypeNavigationMenu.REGION:
      case TypeNavigationMenu.CITY:
        fetchAreaNews(selectedTab);
        return;
      case TypeNavigationMenu.SUBSCRIPTIONS:
        fetchSubscriptionsNews();
        return;
      default:
        fetch();
    }

    /*
    if (selectedTab === 'country' || selectedTab === 'region' || selectedTab === 'city') {
      fetchAreaNews(selectedTab);
    } else {
      fetch();
    }
    */
  }, [selectedTab]);
  const data = useSelector(newsSelector.getData());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box>
      <Container maxWidth="lg">
        {isAuthenticated && <NewsNav navigation={navigation} selectedTab={selectedTab} onClick={setSelectedTab} />}
        {
          fetchDataStatus === APIStatus.Loading ?
            (
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
              <NewsContent selectedTab={selectedTab} newsTopics={data?.newsTopics} news={data?.news} isMorePages={data?.isMorePages} nameArea={data?.country || data?.region || data?.city} />
            )
        }
      </Container>
    </Box>
  );
};

export default News;
