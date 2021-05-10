import type { FC } from 'react';
import { useState } from 'react';
import { Box, makeStyles, Container, Typography, IconButton, Grid } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { CurrentNewsI } from '../../slices/SingleNewsSlice';

const useStyles = makeStyles((theme) => ({
  hero: {
    paddingTop: 50,
    marginBottom: 25
  },
  newsContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: '20px',
    padding: '10px 20px 10px 30px',
    marginBottom: '20px'
    // display: 'flex'
  },
  newsTitle: {
    // width: '55%',
    borderRight: '1px solid #b0b0b0',
    paddingRight: '40px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {

      borderRight: 'none'
    }
  },
  title: {
    fontSize: 40,
    color: '#222222',
    maxWidth: '550px',
    lineHeight: '45px',
    marginBottom: '20px',
    fontFamily: 'Helvetica',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  },
  newsLinks: {
    display: 'flex'
  },
  hashtags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  hashtag: {
    padding: '5px 20px',
    marginRight: '7px',
    border: '1px solid #b0b0b0',
    borderRadius: '30px',
    textAlign: 'center',
    height: '30px',
    marginBottom: '7px'
  },
  hashtagContain: {
    fontWeight: 300,
    fontSize: 18,
    fontFamily: 'Helvetica',
    color: '#b0b0b0',
    padding: 0
  },
  arrows: {
    display: 'flex',
    marginRight: '50px'
  },
  newsInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px 20px 15px 40px',
    color: '#747473',
    minWidth: '200px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      width: '100%',
      marginTop: 20
    }
    // width: '45%'
  },
  newsAuthor: {
    fontSize: 25,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  date: {
    fontSize: 25
  },
  newsSubject: {
    fontSize: 25,
    display: 'flex'
  },
  arrowGrey: {
    color: '#7a7a7a',
    height: '50px',
    width: '50px',
    marginRight: '10px'
  },
  arrowLink: {
    height: '22px',
    width: '22px',
    color: '#fff',
    borderRadius: '50%',
    border: '2px solid #fff',
    padding: '3px'

  },
  arrowButton: {
    padding: 0,
    backgroundColor: '#363557',
    width: '50px',
    height: '50px',
    cursor: 'pointer'
  },
  iframe: {
    width: '100%',
    maxHeight: '650px',
    height: '50vh',
    borderRadius: '20px',
    margin: '0 auto'
  }
}));

interface HeroPropsI {
  data?: CurrentNewsI
}

const SingleNewsHero: FC<HeroPropsI> = ({ data }) => {
  const classes = useStyles();
  const [toggleIframe, setToggleIframe] = useState(false);
  const handleToggleIframe = () => {
    setToggleIframe(!toggleIframe);
  };
  return (
    <Box className={classes.hero}>
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.newsContainer}
        >

          <Grid
            item
            lg={7}
            md={12}
            className={classes.newsTitle}
          >
            <Typography className={classes.title}>{data?.title}</Typography>
            <Box className={classes.newsLinks}>
              <Box className={classes.arrows}>
                <SubdirectoryArrowRightIcon className={classes.arrowGrey} />
                <IconButton
                  className={classes.arrowButton}
                  onClick={handleToggleIframe}
                >
                  <CallMadeIcon className={classes.arrowLink} />
                </IconButton>
              </Box>
              <Box className={classes.hashtags}>
                {data?.hashtags.map((item) => (
                  <Box
                    className={classes.hashtag}
                    key={item.id}
                  >
                    <Typography className={classes.hashtagContain}>{`#${item.title}`}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

          </Grid>
          <Grid
            item
            lg={5}
            md={12}
            className={classes.newsInfo}
          >
            <Box className={classes.newsAuthor}>
              <Box>
                <Typography>{data?.media?.name}</Typography>
                <Typography>{data?.author?.title}</Typography>
              </Box>
              <Box className={classes.date}>
                <Typography>{data?.publication_date}</Typography>
              </Box>
            </Box>

            <Box className={classes.newsSubject}>
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
              className={classes.iframe}
              width="80vw"
            />
          </Box>
        ) : null}
      </Container>

    </Box>
  );
};

export default SingleNewsHero;