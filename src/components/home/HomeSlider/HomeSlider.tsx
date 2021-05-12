import type { FC } from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import './HomeSlider.css';
import CustomArrows from './slickSlider';
import { PoliticiansI } from '../../../slices/homeSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';

interface SliderPropsI {
  data?: PoliticiansI[]
}

const HomeSlider: FC<SliderPropsI> = ({ data }) => {
  const { isMobile } = useWindowSize();
  return (
    <Box style={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box className="textBeforeCarousel">
          {!isMobile
            ? (
              <>
                {' '}
                <Typography fontSize="40px">Открытый рейтинг политиков*</Typography>
                {/* eslint-disable-next-line react/button-has-type */}
                <button className="buttonStyle">Весь рейтинг</button>
              </>
            )
            : null }
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
};

export default HomeSlider;
