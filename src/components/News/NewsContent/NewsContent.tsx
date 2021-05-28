import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import ListSidebar from '../../ListSidebar';
import styles from './NewsContent.module.scss';
import { NewsListI, NewTopicsI, newsSelector } from '../../../slices/newsSlice';
import CardSmall from '../../CardSmall/CardSmall';
import WidgetLink from '../../WidgetLink/WidgetLink';
import { useWindowSize } from '../../../hooks/useWindowSize';
import TopicsSlider from '../../TopicsSlider';

interface NewsPropsI {
  fetch?: any,
  newsTopics?: Array<NewTopicsI>,
  news?: Array<NewsListI>,
  isMorePages?: boolean
}

const NewsContent: FC<NewsPropsI> = ({ fetch, newsTopics, news, isMorePages }) => {
  const { isMobile } = useWindowSize();
  const page = useSelector(newsSelector.getPage());
  const handleGetMorePages = () => {
    fetch(page + 1, undefined, true);
  };
  return (
    <Box className={styles.content}>
      <Box className={styles.contentContainer}>
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
              ? news.map((item, index) => {
                if (item.type === 'widgetLink') {
                  return (
                    <Grid
                      key={index.toString()}
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      style={{
                        alignSelf: 'center'
                      }}
                    >
                      <WidgetLink {...item.widgetLink} />

                    </Grid>
                  );
                }

                return (
                  <Grid
                    key={index.toString()}
                    item
                    md={4}
                    sm={6}
                    xs={12}
                  >
                    <CardSmall {...item.news} />
                  </Grid>
                );
              }) : null}
          </Grid>
          <Box className={styles.content}>
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
    </Box>
  );
};

export default NewsContent;
