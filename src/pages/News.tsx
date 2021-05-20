import type { FC } from 'react';
import { Box, Container } from '@material-ui/core';
import NewsNav from '../components/News/NewsNav/NewsNav';

const News: FC = () => (
  <Box>
    <Container maxWidth="lg">
      <NewsNav />
    </Container>
  </Box>
);

export default News;
