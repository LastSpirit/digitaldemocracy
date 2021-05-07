import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Box, Container, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
// import { maxWidth } from '@material-ui/system';
import ListSidebar from './News/ListSidebar';
import { useFetchHomePageData } from './hooks/useFetchHomePageData';
import { APIStatus } from '../../lib/axiosAPI';
import { homeSelector } from '../../slices/homeSlice';
import CardSmall from './News/CardSmall';

const useStyles = makeStyles(() => ({
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
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: ' 38px auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actualText: {
    fontSize: 19.44,
    textIndent: 46,
  },
  allStyle: {
    fontSize: 35,
    fontWeight: 300,
  },
}));

const HomeFeatures: FC = () => {
  const classes = useStyles();
  useFetchHomePageData();
  const data = useSelector(homeSelector.getData());
  const status = useSelector(homeSelector.getStatus());
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, []);

  return (
    <Box>
      {status === APIStatus.Loading ? (
        <>Loading</>
      ) : (
        <Container maxWidth="lg">
          <Box style={{ display: 'flex' }}>
            <Hidden mdDown>
              <Box
                sx={{
                  marginRight: '120px'
                }}
              >
                <ListSidebar />
              </Box>
            </Hidden>

            <Box className={classes.news}>
              <Typography
                fontSize="35px"
                textAlign="left"
                component="span"
              >
                Актуальные новости
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                  maxWidth: '900px'
                }}
              >
                {data?.news.map((item, index) => (
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
            </Box>
          </Box>
          <Box className={classes.content}>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="buttonStyle">Показать больше</button>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="buttonStyle">К разделу новостей</button>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default HomeFeatures;
