import React, { FC } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { useWindowSize } from '../../../hooks/useWindowSize';
import ListSidebar from '../../ListSidebar';
import styles from './WidgetLinkPageContent.module.scss';
import { NewsArrayI, NewTopicsI } from '../../../slices/widgetLinkSlice';
import CardSmall from '../../CardSmall/CardSmall';
import TopicsSlider from '../../TopicsSlider';

interface NewsPropsI {
  fetch?: any,
  newsTopics?: Array<NewTopicsI>,
  news?: Array<NewsArrayI>,
  isMorePages?: boolean
}

const WidgetLinkPageContent: FC<NewsPropsI> = ({ fetch, newsTopics, news, isMorePages }) => {
  const { isMobile } = useWindowSize();
  console.log(isMorePages);
  return (
    <Box className={styles.content}>
      <Box
        className={styles.contentContainer}
      >
        {isMobile ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Typography
              fontSize="18px"
              textAlign="center"
              component="span"
              marginBottom="10px"
            >
              Актуальные новости
            </Typography>
          </Box>
        ) : null}
        {isMobile
          ? (
            <Box className={styles.topicsSlider}>
              <TopicsSlider
                newsTopics={newsTopics}
                fetch={fetch}
              />
            </Box>
          )
          : (
            <Box className={styles.listSidebar}>
              <ListSidebar
                newsTopics={newsTopics}
                fetch={fetch}
              />
            </Box>
          )}
        <Box className={styles.news}>
          {!isMobile ? (
            <Typography
              fontSize="35px"
              textAlign="left"
              component="span"
              marginBottom="20px"
            >
              Актуальные новости
            </Typography>
          ) : null}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              maxWidth: '900px',
              justifyContent: 'flex-start'
            }}
          >
            {news && news.length > 0
              ? news.map((item, index) => (
                <Grid
                  key={index.toString()}
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <CardSmall {...item} />
                </Grid>
              )) : null}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default WidgetLinkPageContent;
