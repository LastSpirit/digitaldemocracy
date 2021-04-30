import type { FC } from 'react';
import { Box, Hidden, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListSidebar from './News/ListSidebar';
import CardSmall from './News/CardSmall';
import { useFetchNews } from './hooks/useFetchNews';
import { newsSelector } from '../../slices/newsSlice';

const useStyles = makeStyles(() => ({
  actualNews: {
    fontSize: 35,
    fontWeight: 300,
    color: '#222222',
    whiteSpace: 'nowrap',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: ' 38px auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actualText: {
    fontSize: 19.44,
    textIndent: 46,
  },
  allStyle: {
    fontSize: 35,
    fontWeight: 300,
  },
}));

const HomeFeatures: FC = () => {
  const classes = useStyles();
  const { status, fetch } = useFetchNews();
  console.log(status);
  const data = useSelector(newsSelector.getData());
  console.log(data);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box>
      <Box style={{ display: 'flex' }}>
        <Hidden mdDown>
          <Box>
            <ListSidebar />
          </Box>
        </Hidden>

        <Box className={classes.content}>
          <Box>
            {data?.map((item, index) => (
              <CardSmall
                {...item}
                key={index.toString()}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={classes.content}>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="buttonStyle">Показать больше</button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="buttonStyle">К разделу новостей</button>
      </Box>
    </Box>
  );
};

export default HomeFeatures;
