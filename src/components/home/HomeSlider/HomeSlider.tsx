import type { FC } from 'react';
import { Box, Hidden, Typography, Container } from '@material-ui/core';
import './HomeSlider.css';
import CustomArrows from './slickSlider';

const HomeSlider: FC = () => (
  <Box style={{ backgroundColor: 'white' }}>
    <Container maxWidth="lg">
      <Box className="textBeforeCarousel">
        <Hidden smDown>
          <Typography fontSize="50px">Открытый рейтинг политиков*</Typography>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="buttonStyle">Весь рейтинг</button>
        </Hidden>
      </Box>
      <CustomArrows />
    </Container>
  </Box>
);

export default HomeSlider;
