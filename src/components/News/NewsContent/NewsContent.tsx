import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ListSidebar from '../../ListSidebar';
import styles from './NewsContent.module.scss';
import { NewsListI, newsSelector, NewTopicsI } from '../../../slices/newsSlice';
import CardSmall from '../../CardSmall/CardSmall';
import WidgetLink from '../../WidgetLink/WidgetLink';
import { useWindowSize } from '../../../hooks/useWindowSize';
import TopicsSlider from '../../TopicsSlider';
import { useFetchNewsData } from '../hooks/useFetchNewsData';
import { APIStatus } from '../../../lib/axiosAPI';
import { WrapperAsyncRequest } from '../../Loading/WrapperAsyncRequest';

interface NewsPropsI {
  newsTopics?: Array<NewTopicsI>,
  news?: Array<NewsListI>,
  isMorePages?: boolean
}

const NewsContent: FC<NewsPropsI> = ({ newsTopics, news, isMorePages }) => {
  const { isMobile } = useWindowSize();
  const [loadMoreNews, setLoadMoreNews] = useState(false);
  const { fetch, fetchNewsStatus } = useFetchNewsData(setLoadMoreNews);
  const page = useSelector(newsSelector.getPage());

  const handleGetMorePages = () => {
    setLoadMoreNews(true);
    fetch(page + 1, undefined, true);
  };
  return (
    <Box className={styles.content}>
      <Box className={styles.contentContainer}>
        {isMobile ? (
          <Box className={styles.topicsSlider}>
            <TopicsSlider newsTopics={newsTopics} fetch={fetch} />
          </Box>
        ) : (
          <Box className={styles.listSidebar}>
            <ListSidebar newsTopics={newsTopics} fetch={fetch} />
          </Box>
        )}
        <Box className={styles.news}>
          {!isMobile && (
            <Typography fontSize="35px" textAlign="left" component="span" marginBottom="20px">
              Актуальные новости
            </Typography>
          )}
          <WrapperAsyncRequest height={600} status={loadMoreNews ? APIStatus.Success : fetchNewsStatus}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{
                maxWidth: '900px',
                justifyContent: 'flex-start',
              }}
            >
              {news &&
                news.length > 0 &&
                news.map((item, index) => (
                  <Grid
                    key={index.toString()}
                    item
                    md={4}
                    sm={6}
                    xs={12}
                    style={
                      item.type === 'widgetLink'
                        ? {
                            alignSelf: 'center',
                          }
                        : {}
                    }
                  >
                    {item.type === 'widgetLink' ? <WidgetLink {...item.widgetLink} /> : <CardSmall {...item.news} />}
                  </Grid>
                ))}
            </Grid>
            <div className={styles.loadMore}>
              <WrapperAsyncRequest status={loadMoreNews ? fetchNewsStatus : APIStatus.Success}>
                <div />
              </WrapperAsyncRequest>
            </div>
          </WrapperAsyncRequest>
          <Box className={styles.content} sx={{ mt: 2 }}>
            {isMorePages && fetchNewsStatus !== APIStatus.Loading && (
              <Button sx={{ mt: 4 }}>
                <Typography className={styles.transparentButtonText} onClick={handleGetMorePages}>
                  Показать больше
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsContent;
