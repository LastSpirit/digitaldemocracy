import type { FC } from 'react';
import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './HomeFeatures.module.scss';
import ListSidebar from '../../ListSidebar';
import { APIStatus } from '../../../lib/axiosAPI';
import { homeSelector, NewsI, NewsTopicsI } from '../../../slices/homeSlice';
import CardSmall from '../News/CardSmall';
import TopicsSlider from '../News/TopicsSlider';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Loading } from '../../Loading/Loading';
import '../HomeSlider/HomeSlider.module.scss';

interface HomeFeaturesPropsI {
  status?: string,
  newsTopics?: NewsTopicsI[],
  news?: NewsI[],
  isMorePages?: boolean
}

const HomeFeatures: FC<HomeFeaturesPropsI> = ({ status, newsTopics, news, isMorePages }) => {
  const { fetch, fetchNewsStatus } = useFetchHomePageData();
  const page = useSelector(homeSelector.getPage());
  const { isMobile } = useWindowSize();
  const handleGetMorePages = () => {
    fetch(page + 1, undefined, true);
  };
  console.log(fetchNewsStatus);

  return (
    <Box>
      {status === APIStatus.Loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">

          {isMobile ? (
            <Box
              className={styles.container}
            >
              <TopicsSlider newsTopics={newsTopics} />
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
                    maxWidth: '300px',
                    minWidth: '220px'
                  }}
                >
                  <ListSidebar newsTopics={newsTopics} />
                </Box>
              ) : null
            }

            <Box className="news">
              <Typography
                fontSize="35px"
                textAlign="left"
                component="span"
              >
                Актуальные новости
              </Typography>
              {fetchNewsStatus !== 'Loading'
                ? (
                  <>
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
                  </>
                ) : (
                  <Box sx={{
                    display: 'flex', marginTop: 40, justifyContent: 'center' }}
                  >
                    <Loading size={60} />
                  </Box>
                )}
              <Box className={styles.content}>
                <Button>
                  <Typography
                    className={styles.violetButtonText}

                  >
                    К разделу новостей
                  </Typography>
                </Button>
                {isMorePages ? (
                  <Button>
                    <Typography
                      className={styles.transparentButtonText}
                      onClick={handleGetMorePages}
                    >
                      Показать больше
                    </Typography>
                  </Button>
                ) : null}

              </Box>
            </Box>
          </Box>

        </Container>
      )}
    </Box>
  );
};

export default HomeFeatures;
