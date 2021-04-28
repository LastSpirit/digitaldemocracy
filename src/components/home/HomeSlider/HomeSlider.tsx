import type { FC } from "react";
import { Box, Hidden, Typography } from "@material-ui/core";
import "../HomeSlider/HomeSlider.css";
import CustomArrows from "./slickSlider";
const HomeSlider: FC = () => (
  <Box>
    <Box className="textBeforeCarousel">
      <Hidden smDown>
        <Typography fontSize="50px">Открытый рейтинг политиков*</Typography>
      </Hidden>
      <button className="buttonStyle">Весь рейтинг</button>
    </Box>
    <CustomArrows />
  </Box>
);

export default HomeSlider;
