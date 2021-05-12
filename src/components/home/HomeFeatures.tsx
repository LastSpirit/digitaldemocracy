import type { FC } from 'react';
import React from 'react';
import { Box, Container, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ListSidebar from './News/ListSidebar';
import { APIStatus } from '../../lib/axiosAPI';
import { homeSelector, NewsI, NewsTopicsI } from '../../slices/homeSlice';
import CardSmall from './News/CardSmall';
import TopicsSlider from './News/TopicsSlider';
import { useFetchHomePageData } from './hooks/useFetchHomePageData';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Loading } from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  actualNews: {
    fontSize: 35,
    fontWeight: 300,
    color: '#222222',
    whiteSpace: 'nowrap',
  },
  news: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'flex-start'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '38px 0',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  actualText: {
    fontSize: 19.44,
    textIndent: 46,
  },
  allStyle: {
    fontSize: 35,
    fontWeight: 300,
  },
  buttonText: {
    color: '#363557',
    fontSize: '20px',
    cursor: 'pointer'
  }
}));

interface HomeFeaturesPropsI {
  status?: string,
  newsTopics?: NewsTopicsI[],
  news?: NewsI[],
  isMorePages?: boolean
}

const HomeFeatures: FC<HomeFeaturesPropsI> = ({ status, newsTopics, news, isMorePages }) => {
  const classes = useStyles();
  const { fetch } = useFetchHomePageData();
  const page = useSelector(homeSelector.getPage());
  const { isMobile } = useWindowSize();
  const handleGetMorePages = () => {
    console.log('HomeFeatures');
    fetch(page + 1, undefined, true);
  };

  return (
    <Box>
      {status === APIStatus.Loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">

          {isMobile ? (
            <Box sx={{
              maxWidth: '80%',
              marginBottom: '30px',
              marginTop: '40px',
              margin: '35px auto'
            }}
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
                    maxWidth: '270px'
                  }}
                >
                  <ListSidebar newsTopics={newsTopics} />
                </Box>
              ) : null
            }

            <Box className={classes.news}>
              <Typography
                fontSize="35px"
                textAlign="left"
                component="span"
              >
                Актуальные новости
              </Typography>
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
              <Box className={classes.content}>
                {isMorePages ? (
                  <Button>
                    <Typography
                      className={classes.buttonText}
                      sx={{
                        textDecoration: 'underline'
                      }}
                      onClick={handleGetMorePages}
                    >
                      Показать больше
                    </Typography>
                  </Button>
                ) : null}
                <Button>
                  <Typography
                    className={classes.buttonText}
                    sx={{
                      padding: '15px 35px',
                      border: '1px solid #363557',
                      borderRadius: '50px'
                    }}
                  >
                    К разделу новостей
                  </Typography>
                </Button>
              </Box>
            </Box>

          </Box>

        </Container>
      )}
    </Box>
  );
};

export default HomeFeatures;
