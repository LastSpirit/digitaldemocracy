import type { FC } from 'react';
import { Box, makeStyles, Container, Typography, IconButton } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { CurrentNewsI } from '../../slices/SingleNewsSlice';

const useStyles = makeStyles(() => ({
  hero: {
    paddingTop: 50,
    marginBottom: 25
  },
  newsContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: '20px',
    padding: '10px 20px 10px 30px',
    display: 'flex'
  },
  newsTitle: {
    width: '55%',
    borderRight: '1px solid #b0b0b0',
    paddingRight: '40px',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 50,
    color: '#222222',
    maxWidth: '600px',
    lineHeight: '55px',
    marginBottom: '20px'
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
    width: '45%'
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
    fontSize: 25
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
  }
}));

interface HeroPropsI {
  data?: CurrentNewsI
}

const SingleNewsHero: FC<HeroPropsI> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box className={classes.hero}>
      <Container maxWidth="lg">
        <Box className={classes.newsContainer}>
          <Box className={classes.newsTitle}>
            <Typography className={classes.title}>{data?.title}</Typography>
            <Box className={classes.newsLinks}>
              <Box className={classes.arrows}>
                <SubdirectoryArrowRightIcon className={classes.arrowGrey} />
                <IconButton className={classes.arrowButton}>
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

          </Box>
          <Box className={classes.newsInfo}>
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
              <Typography>
                {data?.newTopics}
              </Typography>
            </Box>
          </Box>

        </Box>

      </Container>

    </Box>
  );
};

export default SingleNewsHero;
