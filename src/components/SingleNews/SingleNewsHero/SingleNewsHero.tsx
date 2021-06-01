import type { FC } from 'react';
import { useState } from 'react';
import { Box, Container, Typography, IconButton, Grid } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FacebookIcon from '@material-ui/icons/Facebook';
import styles from './SingleNewsHero.module.scss';
import { CurrentNewsI } from '../../../slices/SingleNewsSlice';
import FacebookShare from '../../FacebookShare/FacebookShare';

interface HeroPropsI {
  data?: CurrentNewsI
}

const SingleNewsHero: FC<HeroPropsI> = ({ data }) => {
  const [toggleIframe, setToggleIframe] = useState(true);
  const handleToggleIframe = () => {
    setToggleIframe(!toggleIframe);
  };
  return (
    <Box className={styles.hero}>
      <Container maxWidth="lg">
        <Grid
          container
          className={styles.newsContainer}
        >

          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            className={styles.newsTitle}
          >
            <Typography className={styles.newsHeading}>{data?.title}</Typography>
            <Box className={styles.newsLinks}>
              <Box className={styles.arrows}>
                <SubdirectoryArrowRightIcon className={styles.arrowGrey} />
                <IconButton
                  className={styles.arrowButton}
                  onClick={handleToggleIframe}
                >
                  <CallMadeIcon className={styles.arrowLink} />
                </IconButton>
                <FacebookShare
                  url={data?.source_link}
                >
                  <FacebookIcon
                    fontSize="large"
                    className={styles.facebook}
                  />
                </FacebookShare>
              </Box>
              <Box className={styles.hashtags}>
                {data?.hashtags.map((item) => (
                  <Box
                    className={styles.hashtag}
                    key={item.id}
                  >
                    <Typography className={styles.hashtagContain}>{`#${item.title}`}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            className={styles.newsInfo}
          >
            <Box className={styles.newsAuthor}>
              <Box>
                <Typography>{data?.media?.name}</Typography>
                <Typography>{data?.author?.title}</Typography>
              </Box>
              <Box className={styles.date}>
                <Typography>{data?.publication_date}</Typography>
              </Box>
            </Box>

            <Box className={styles.newsSubject}>
              {data?.newTopics.map((item) => (
                <Typography
                  key={item.id}
                  sx={{
                    marginRight: '15px'
                  }}
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
          </Grid>

        </Grid>
        {toggleIframe ? (
          <Box>
            <iframe
              src={data?.source_link}
              title="link"
              className={styles.iframe}
              width="80vw"
            />
          </Box>
        ) : null}
      </Container>

    </Box>
  );
};

export default SingleNewsHero;
