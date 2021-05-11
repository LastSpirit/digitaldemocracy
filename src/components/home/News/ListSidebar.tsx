import type { FC } from 'react';
import { Box, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { NewsTopicsI } from '../../../slices/homeSlice';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';

const useStyles = makeStyles(() => ({
  listTitle: {
    fontSize: 50,
    paddingLeft: 20,
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
  const handleNewsTopics = (id) => {
    fetch(1, id);
  };
  return (
    <Box sx={{ maxWidth: '270px' }}>
      <Typography className={classes.listTitle}>Темы</Typography>
      <List
        className={classes.lineStyle}
        sx={{ maxWidth: '270px' }}
      >
        {newsTopics?.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleNewsTopics(item.id)}
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                maxWidth: '270px',
                whiteSpace: 'pre-wrap',
                cursor: 'pointer'
              }}
            >
              <ListItemText
                primary={item.title}
                sx={{ maxWidth: '250px' }}
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
