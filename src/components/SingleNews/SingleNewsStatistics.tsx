import type { FC } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import StatisticsCard from './StatisticsCard';
import { AuthorI, MediaI, PoliticiansI } from '../../slices/SingleNewsSlice';

const useStyles = makeStyles(() => ({
  statistics: {
    paddingBottom: 50,
    marginBottom: 55
  },
  statisticsContainer: {
    width: '100%',
    borderBottom: '1px solid #b0b0b0',
    display: 'flex',
    justifyContent: 'space-between'
  },
  politicians: {
    width: '50%',
    paddingRight: 100
  },
  authors: {
    width: '50%'
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
        <Box className={classes.statisticsContainer}>
          <Box className={classes.politicians}>
            <Box className={classes.headings}>
              <Typography className={classes.heading}>Ваше мнение по поводу новости</Typography>
              <Typography className={classes.heading}>Оцените политиков</Typography>
            </Box>
            <Box>
              {politicians?.map((item) => (
                <StatisticsCard
                  key={item.name}
                  name={item.name}
                  photo={item.photo}
                  percent={item.percent}
                />
              ))}
            </Box>
          </Box>
          <Box className={classes.authors}>
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SingleNewsStatistics;
