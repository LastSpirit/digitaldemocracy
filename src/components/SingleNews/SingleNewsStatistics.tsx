import type { FC } from 'react';
import { Box, makeStyles, Container, Typography, Grid } from '@material-ui/core';
import StatisticsCard from './StatisticsCard';
import { AuthorI, MediaI, PoliticiansI } from '../../slices/SingleNewsSlice';

const useStyles = makeStyles((theme) => ({
  statistics: {
    paddingBottom: 50,
    marginBottom: 55
  },
  statisticsContainer: {
    width: '100%',
    borderBottom: '1px solid #b0b0b0',
    // display: 'flex',
    // justifyContent: 'space-between'
  },
  politicians: {
    // width: '50%',
    // width: '100%',
    paddingRight: 100,
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
      width: '100%'
    }
  },
  authors: {
    // width: '50%'
  },
  headings: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e5e5'
  },
  heading: {
    fontSize: '30px',
    lineHeight: '30px',
    fontWeight: 300,
    fontFamily: 'Helvetica',
    color: '#7a7a7a',
    padding: 0
  }
}));

interface StatisticsPropsI {
  author?: AuthorI,
  media?: MediaI,
  politicians?: PoliticiansI[]
}

const SingleNewsStatistics: FC<StatisticsPropsI> = ({ author, media, politicians }) => {
  const classes = useStyles();
  return (
    <Box className={classes.statistics}>
      <Container
        maxWidth="lg"
      >
        <Grid
          container
          className={classes.statisticsContainer}
        >
          { politicians && politicians.length > 0 ? (
            <Grid
              item
              lg={6}
              md={12}
              sm={12}
              className={classes.politicians}
            >
              <Box className={classes.headings}>
                <Typography className={classes.heading}>Ваше мнение по поводу новости</Typography>
                <Typography className={classes.heading}>Оцените политиков</Typography>
              </Box>
              {politicians?.map((item) => (
                <StatisticsCard
                  key={item?.name}
                  name={item?.name}
                  photo={item?.photo}
                  percent={item?.percent}
                />
              ))}

            </Grid>
          ) : null}
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            className={classes.authors}
          >
            {media ? (
              <Box>
                <Box className={classes.headings}>
                  <Typography className={classes.heading}>Доверяете ли вы СМИ как источнику новости?</Typography>
                </Box>
                <StatisticsCard
                  name={media?.name}
                  photo={media?.photo}
                  percent={media?.percent}
                />
              </Box>
            ) : null}
            {author ? (
              <Box>
                <Box className={classes.headings}>
                  <Typography className={classes.heading}>Доверяете ли вы автору новости?</Typography>
                </Box>
                <StatisticsCard
                  name={author?.title ? author?.title : 'Автор'}
                  photo={author?.photo}
                  percent={author?.percent}
                />
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleNewsStatistics;
