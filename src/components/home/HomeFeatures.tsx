import type { FC } from "react";
import { Box, Hidden, makeStyles, Typography } from "@material-ui/core";
import CardBig from "./News/CardBig";
import ListSidebar from "./News/ListSidebar";
import CardSmall from "./News/CardSmall";

const useStyles = makeStyles((theme) => ({
  actualNews: {
    fontSize: 35,
    fontWeight: 300,
    color: "#222222",
    whiteSpace: "nowrap",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    margin: " 38px auto",
    justifyContent: "center",
    alignItems: "flex-end",
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
  return (
    <Box>
      <Box style={{ display: "flex" }}>
        <Hidden mdDown>
          <Box>
            <ListSidebar />
          </Box>
        </Hidden>

        <Box className={classes.content}>
          <Box>
            <Typography className={classes.allStyle}>Актуальные новости</Typography>
            <CardBig />
            <CardBig />
          </Box>
          <Box>
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
          </Box>
          <Box>
            <CardSmall />
            <CardSmall />
            <CardBig />
          </Box>
        </Box>
      </Box>
      <Box className={classes.content}>
        <button className="buttonStyle">Показать больше</button>
        <button className="buttonStyle">К разделу новостей</button>
      </Box>
    </Box>
  );
};

export default HomeFeatures;
