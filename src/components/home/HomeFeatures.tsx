import type { FC } from 'react';
import { Box, Hidden, Container, makeStyles, Typography, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { maxWidth } from '@material-ui/system';
import ListSidebar from './News/ListSidebar';
import CardSmall from './News/CardSmall';
import { useFetchNews } from './hooks/useFetchNews';
import { newsSelector } from '../../slices/newsSlice';

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
  const { fetch } = useFetchNews();
  const data = useSelector(newsSelector.getData());

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box>
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
              {data?.map((item, index) => (
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}

                >
                  <CardSmall
                    {...item}
                    key={index.toString()}
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

    </Box>
  );
};

export default HomeFeatures;
