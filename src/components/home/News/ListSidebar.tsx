import type { FC } from "react";
import { Box, Divider, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listTitle: {
    fontSize: 50,
    paddingLeft: 20,
    fontWeight: 400,
  },
  lineStyle: {
    whiteSpace: "nowrap",
  },
}));

const ListSidebar: FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.listTitle}>Темы</Typography>
      <List className={classes.lineStyle}>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Митинги в Москве" />
        </ListItem>
      </List>
    </Box>
  );
};

export default ListSidebar;
