import type { FC } from 'react';
import React from 'react';
import { Box, Container, Grid, Hidden, makeStyles, Typography, Button } from '@material-ui/core';
import ListSidebar from './News/ListSidebar';
import { APIStatus } from '../../lib/axiosAPI';
import { NewsI, NewsTopicsI } from '../../slices/homeSlice';
import CardSmall from './News/CardSmall';

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
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '38px 0',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

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
                  marginRight: '60px',
                  maxWidth: '270px'
                }}
              >
                <ListSidebar newsTopics={newsTopics} />
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
                spacing={1}
                justifyContent="center"
                sx={{
                  maxWidth: '900px',
                  justifyContent: 'center'
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
              <Box className={classes.content}>
                {isMorePages ? (
                  <Button>
                    <Typography
                      className={classes.buttonText}
                      sx={{
                        textDecoration: 'underline'
                      }}
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
