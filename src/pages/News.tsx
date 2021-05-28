import { useEffect } from 'react';
import type { FC } from 'react';
import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFetchNewsData } from '../components/News/hooks/useFetchNewsData';
import NewsNav from '../components/News/NewsNav/NewsNav';
import NewsContent from '../components/News/NewsContent/NewsContent';
import { newsSelector } from '../slices/newsSlice';
import { userSelectors } from '../slices/userSlice';

const News: FC = () => {
  const { fetch } = useFetchNewsData();
  useEffect(() => {
    fetch();
  }, []);
  const data = useSelector(newsSelector.getData());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  return (
    <Box>
      <Container maxWidth="lg">
        {isAuthenticated && <NewsNav />}
        <NewsContent
          newsTopics={data?.newsTopics}
          news={data?.news}
          isMorePages={data?.isMorePages}
        />
      </Container>
    </Box>
  );
};

export default News;
