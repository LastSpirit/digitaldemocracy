import type { FC } from 'react';
import { Box, Hidden, Typography, Container } from '@material-ui/core';
import './HomeSlider.css';
import CustomArrows from './slickSlider';
import { PoliticiansI } from '../../../slices/homeSlice';

interface SliderPropsI {
  data?: PoliticiansI[]
}

const HomeSlider: FC<SliderPropsI> = ({ data }) => (
  <Box style={{ backgroundColor: 'white' }}>
    <Container maxWidth="lg">
      <Box className="textBeforeCarousel">
        <Hidden smDown>
          <Typography fontSize="50px">Открытый рейтинг политиков*</Typography>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="buttonStyle">Весь рейтинг</button>
        </Hidden>
      </Box>
      <Box sx={{
        maxWidth: '90%',
        margin: '0 auto'
      }}
      >
        <CustomArrows data={data} />
      </Box>

    </Container>
  </Box>
);

export default HomeSlider;
