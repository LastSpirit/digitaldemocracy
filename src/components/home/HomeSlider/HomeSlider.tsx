import type { FC } from 'react';
import { Box, Typography, Container, Button } from '@material-ui/core';
import styles from './HomeSlider.module.scss';
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
        <Box className={styles.textBeforeCarousel}>
          {!isMobile
            ? (
              <Box className={styles.carouselTitle}>
                {' '}
                <Typography>Открытый рейтинг политиков*</Typography>
                {/* eslint-disable-next-line react/button-has-type */}
                <Button
                  color="primary"
                  className={styles.buttonStyle}
                >
                  Весь рейтинг
                </Button>
              </Box>
            )
            : null }
        </Box>
        <Box sx={{
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
