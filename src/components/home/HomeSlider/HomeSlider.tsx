import type { FC } from 'react';
import { Box, Typography, Container, Button } from '@material-ui/core';
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
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                {' '}
                <Typography fontSize="40px">Открытый рейтинг политиков*</Typography>
                {/* eslint-disable-next-line react/button-has-type */}
                <Button
                  color="primary"
                  className="buttonStyle"
                >
                  Весь рейтинг
                </Button>
              </Box>
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
