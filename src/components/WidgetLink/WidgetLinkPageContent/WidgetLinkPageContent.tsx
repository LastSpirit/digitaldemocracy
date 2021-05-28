import React, { FC, useState } from 'react';
import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../../../hooks/useWindowSize';
import ListSidebar from '../../ListSidebar';
import styles from './WidgetLinkPageContent.module.scss';
import { NewsArrayI, NewTopicsI, widgetLinkSelector } from '../../../slices/widgetLinkSlice';
import CardSmall from '../../CardSmall/CardSmall';
import TopicsSlider from '../../TopicsSlider';
import { useFetchWidgetLinkData } from '../hooks/useFetchWidgetLinkPage';
import { APIStatus } from '../../../lib/axiosAPI';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';

interface NewsPropsI {
  newsTopics?: Array<NewTopicsI>,
  news?: Array<NewsArrayI>,
  isMorePages?: boolean,
}

const WidgetLinkPageContent: FC<NewsPropsI> = ({ newsTopics, news, isMorePages }) => {
  const { isMobile } = useWindowSize();
  const [loadMoreNews, setLoadMoreNews] = useState(false);
  const { fetch, fetchNewsStatus } = useFetchWidgetLinkData(setLoadMoreNews);
  const page = useSelector(widgetLinkSelector.getPage());

  const handleGetMorePages = () => {
    setLoadMoreNews(true);
    fetch(page + 1, undefined, true);
  };

  return (
    <Box className={styles.content}>
      <Box
        className={styles.contentContainer}
      >
        {isMobile && (
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
        )}
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
          {!isMobile && (
            <Typography
              fontSize="35px"
              textAlign="left"
              component="span"
              marginBottom="20px"
            >
              Актуальные новости
            </Typography>
          )}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              maxWidth: '900px',
              justifyContent: 'flex-start'
            }}
          >
            <WrapperAsyncRequest status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}>
              {news && news.length > 0 && news.map((item, index) => (
                <Grid
                  key={index.toString()}
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <CardSmall {...item} />
                </Grid>
              ))}
            </WrapperAsyncRequest>
          </Grid>
          <div className={styles.loadMore}>
            <WrapperAsyncRequest status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}><></></WrapperAsyncRequest>
          </div>
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
    </Box>
  );
};

export default WidgetLinkPageContent;
