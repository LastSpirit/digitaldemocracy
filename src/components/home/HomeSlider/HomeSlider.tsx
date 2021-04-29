import type { FC } from "react";
import { Box, Hidden, Typography } from "@material-ui/core";
import "../HomeSlider/HomeSlider.css";
import CustomArrows from "./slickSlider";
const HomeSlider: FC = () => (
  <Box style={{ backgroundColor: "white" }}>
    <Box className="textBeforeCarousel">
      <Hidden smDown>
        <Typography fontSize="50px">Открытый рейтинг политиков*</Typography>
        <button className="buttonStyle">Весь рейтинг</button>
      </Hidden>
    </Box>
    <CustomArrows />
  </Box>
);

export default HomeSlider;
