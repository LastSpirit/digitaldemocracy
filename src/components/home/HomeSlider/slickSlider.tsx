import { Box, Card, Typography, CardActionArea, CardActions, Button } from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './HomeSlider.module.scss';
import styles from './slickSlider.module.scss';
import { frames } from '../../../icons/pictures/picturesExports/picturesExport';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './slickArrows.css';

export default function CustomArrows({ data }) {
  const settings = {

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 843,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        },
      },
    ],
  };
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.carouselContainer}>
      {data ? (
        <Slider {...settings}>
          {data?.map((item) => (
            <Card
              key={item.name}
              className={styles.custom}
            >
              <CardActionArea>
                <Box>
                  <Box className={styles.imgContainer}>
                    <img
                      src={frames.greenFrame}
                      alt="frame"
                      className={styles.frame}
                    />
                    <img
                      src={item.photo}
                      alt="politics"
                      className={styles.img}
                    />
                  </Box>
                </Box>
                <Box className={styles.caption}>
                  <Typography className={styles.name}>{item.name}</Typography>
                </Box>
                <Box>
                  <Typography className={styles.percent}>{item.percent}</Typography>
                </Box>
              </CardActionArea>
              <CardActions />
            </Card>
          ))}
        </Slider>
      ) : null}
      {isMobile && (
      // eslint-disable-next-line react/button-has-type
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button className={classes.buttonStyle}>Весь рейтинг</Button>
        </Box>
      )}
    </div>
  );
}
