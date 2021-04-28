import type { FC } from "react";
import {
  Container,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CardBig from "./News/CardBig";

const useStyles = makeStyles((theme) => ({
  actualNews: {
    fontSize: 24,
  },
}));

const HomeFeatures: FC = () => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container>
        <Hidden smDown>
          <Grid item lg={3}>
            <List className={classes.actualNews}>
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
          </Grid>
        </Hidden>
        <Grid item lg={9}>
          <Typography className={classes.actualNews}>Актуальные новости</Typography>
          <CardBig />
          <CardBig />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeFeatures;
