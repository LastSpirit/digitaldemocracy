import type { FC } from 'react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Link, Typography } from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './HomeFeatures.module.scss';
import ListSidebar from '../../ListSidebar';
import { APIStatus } from '../../../lib/axiosAPI';
import { homeSelector, NewsI, NewsTopicsI } from '../../../slices/homeSlice';
import CardSmall from '../../CardSmall/CardSmall';
import TopicsSlider from '../../TopicsSlider';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import '../HomeSlider/HomeSlider.module.scss';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';

interface HomeFeaturesPropsI {
  status?: APIStatus,
  newsTopics?: NewsTopicsI[],
  news?: NewsI[],
  isMorePages?: boolean
}

const HomeFeatures: FC<HomeFeaturesPropsI> = ({ status, newsTopics, news, isMorePages }) => {
  const { fetch, fetchNewsStatus } = useFetchHomePageData();
  const page = useSelector(homeSelector.getPage());
  console.log(page);
  const { isMobile } = useWindowSize();
  const [loadMoreNews, setLoadMoreNews] = useState(false);

  const handleGetMorePages = () => {
    setLoadMoreNews(true);
    fetch(page + 1, undefined, true);
  };

  return (
    <Box>
      <WrapperAsyncRequest
        status={status}
        height={600}
      >
        <Container
          maxWidth="lg"
          className={styles.newsWrapper}
        >

          {isMobile ? (
            <Box
              className={styles.container}
            >
              <TopicsSlider
                newsTopics={newsTopics}
                fetch={fetch}
              />
            </Box>
          )
            : null}
          <Box style={{ display: 'flex' }}>
            {

            !isMobile
              ? (
                <Box
                  sx={{
                    marginRight: '60px',
                    width: '24%',
                    minWidth: '220px'
                  }}
                >
                  <ListSidebar
                    newsTopics={newsTopics}
                    fetch={fetch}
                  />
                </Box>
              ) : null
            }

            <Box className={styles.news}>
              <Typography
                fontSize="35px"
                textAlign="left"
                component="span"
                mb={2}
              >
                Актуальные новости
              </Typography>

              <WrapperAsyncRequest
                height={600}
                status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}
              >
                {news && news.length > 0 ? (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{
                      maxWidth: '900px',
                      justifyContent: 'flex-start'
                    }}
                  >
                    {news?.map((item, index) => (
                      <Grid
                        key={index.toString()}
                        item
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        <CardSmall
                          {...item}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )
                  : (
                    <Box>
                      На данный момент новостей нет
                    </Box>
                  )}
              </WrapperAsyncRequest>
              {loadMoreNews && fetchNewsStatus !== APIStatus.Initial && (
              <div className={styles.loadMore}>
                <WrapperAsyncRequest
                  height={600}
                  status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}
                >
                  <div />
                </WrapperAsyncRequest>
              </div>
              )}
              {fetchNewsStatus !== APIStatus.Loading && (
              <Box className={styles.content}>
                <Link
                  to="/news"
                  component={RouterLink}
                >
                  <Typography
                    className={styles.violetButtonText}
                  >
                    К разделу новостей
                  </Typography>
                </Link>
                {isMorePages && (
                  <Button>
                    <Typography
                      className={styles.transparentButtonText}
                      onClick={handleGetMorePages}
                    >
                      Показать больше
                    </Typography>
                  </Button>
                )}
              </Box>
              )}
            </Box>
          </Box>
        </Container>
      </WrapperAsyncRequest>
    </Box>
  );
};

export default HomeFeatures;
