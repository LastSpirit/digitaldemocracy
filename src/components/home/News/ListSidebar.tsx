import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Box, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { NewsTopicsI } from '../../../slices/homeSlice';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';
import '../styles.scss';
import { useSearchParams } from '../../../hooks/useSearchParams';

const useStyles = makeStyles(() => ({
  listTitle: {
    fontSize: 40,
    fontWeight: 400,
  },
  lineStyle: {
    whiteSpace: 'nowrap',
  },
}));

interface SidebarPropsI {
  newsTopics?: NewsTopicsI[]
}

const ListSidebar: FC<SidebarPropsI> = ({ newsTopics }) => {
  const classes = useStyles();
  const { fetch } = useFetchHomePageData();
  const [resultNewsTopics, setResultNewsTopics] = useState([]);
  const { news_topic_id: { value: topicId, setValue: setTopicId } } = useSearchParams('news_topic_id');

  const handleNewsTopics = (id) => {
    fetch(1, id, true);
    setTopicId(id);
  };

  useEffect(() => {
    if (newsTopics && newsTopics.length !== 0) {
      setResultNewsTopics([{ id: -1, title: 'Все новости' }, ...newsTopics]);
    }
  }, [newsTopics]);

  return (
    <Box sx={{ maxWidth: '270px' }}>
      <Typography className={classes.listTitle}>Темы</Typography>
      <List
        className={classes.lineStyle}
        sx={{ maxWidth: '270px' }}
      >
        {resultNewsTopics?.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleNewsTopics(item.id)}
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                maxWidth: '270px',
                whiteSpace: 'pre-wrap',
                cursor: 'pointer',
              }}
              className="list-item"
            >
              <ListItemText
                primary={item.title}
                sx={{
                  maxWidth: '250px',
                  fontSize: 14,
                  color: Number(topicId) === item.id ? 'red!important' : 'black'
                }}
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}

      </List>
    </Box>
  );
};

export default ListSidebar;
