import type { FC } from 'react';
import { Box, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { NewsTopicsI } from '../../../slices/homeSlice';

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
  console.log(newsTopics);
  return (
    <Box sx={{ maxWidth: '270px' }}>
      <Typography className={classes.listTitle}>Темы</Typography>
      <List
        className={classes.lineStyle}
        sx={{ maxWidth: '270px' }}
      >
        {newsTopics.map((item) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={item.id}
              sx={{
                maxWidth: '270px',
                whiteSpace: 'pre-wrap'
              }}
            >
              <ListItemText
                primary={item.title}
                sx={{ maxWidth: '250px' }}
              />
            </ListItem>
            <Divider component="li" />
          </>
        ))}

      </List>
    </Box>
  );
};

export default ListSidebar;
