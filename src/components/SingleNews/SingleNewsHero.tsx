import type { FC } from 'react';
import { useState } from 'react';
import { Box, makeStyles, Container, Typography, IconButton, Grid } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { CurrentNewsI } from '../../slices/SingleNewsSlice';

const useStyles = makeStyles((theme) => ({
  hero: {
    paddingTop: 50,
    marginBottom: 40
  },
  newsContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: '20px',
    padding: '15px 20px 15px 30px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
      maxWidth: '100%'
    }
    // display: 'flex'
  },

  newsTitle: {
    width: '60%',
    borderRight: '1px solid #b0b0b0',
    paddingRight: '40px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
      width: '100%'
    }
  },
  title: {
    fontSize: 40,
    color: '#222222',
    maxWidth: '500px',
    lineHeight: '45px',
    marginBottom: '20px',
    fontFamily: 'Helvetica',
    [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '30px',
    },
  },
  newsLinks: {
    display: 'flex'
  },
  hashtags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  hashtag: {
    padding: '8px 20px',
    marginRight: '7px',
    border: '1px solid #b0b0b0',
    borderRadius: '30px',
    textAlign: 'center',
    height: '40px',
    marginBottom: '7px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      height: '30px',
      padding: '5px 12px'
    },
  },
  hashtagContain: {
    fontWeight: 300,
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#b0b0b0',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    },
  },
  arrows: {
    display: 'flex',
    marginRight: '50px'
  },
  newsInfo: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px 20px 15px 40px',
    color: '#747473',
    minWidth: '300px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      width: '100%',
      marginTop: 20
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: '11px 15px',
      minWidth: 'unset'
    },
  },
  newsAuthor: {
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    },
  },
  date: {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    },
  },
  newsSubject: {
    fontSize: 14,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    },
  },
  arrowGrey: {
    color: '#7a7a7a',
    height: '50px',
    width: '50px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px'
    },
  },
  arrowLink: {
    height: '17px',
    width: '17px',
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
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '35px',
      height: '35px'
    },
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
            lg={6}
            md={12}
            sm={12}
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
            lg={6}
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
