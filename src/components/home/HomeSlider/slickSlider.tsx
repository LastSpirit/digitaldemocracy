import React, { useState, useEffect } from 'react';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, CardActionArea, CardActions, Button, Tooltip, fabClasses } from '@material-ui/core';
import { milliseconds } from 'date-fns';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { avatarColorChanger } from 'src/utils/avatarColorChanger';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classes from './HomeSlider.module.scss';
import styles from './slickSlider.module.scss';
import { frames } from '../../../icons/pictures/picturesExports/picturesExport';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './slickArrows.css';

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        left: -30,
        width: '55px',
        height: '55px',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        border: '0px',
      }}
      onClick={onClick}
      type="button"
    >
      <NavigateBeforeIcon />
    </button>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        right: -30,
        width: '55px',
        height: '55px',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        border: '0px',
      }}
      onClick={onClick}
      type="button"
    >
      <NavigateNextIcon />
    </button>
  );
};

export default function CustomArrows({ data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    display: 'flex',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
  const { push } = useHistory();
  const [date, setDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const initialDate: any = new Date(0);
  return (
    <div className={styles.carouselContainer}>
      {data ? (
        <Slider {...settings} style={{ display: 'flex', alignItems: 'center' }}>
          {data?.map((item) => (
            <Tooltip
              title={item.position ?? ''}
              classes={{
                tooltip: styles.tooltip,
              }}
            >
              <Card
                // onClick={() => push(`/politician/${String(item?.short_link)}`)}
                onMouseDown={() => {
                  setDate((new Date() as any) - initialDate);
                }}
                onMouseUp={() => {
                  setSecondDate((new Date() as any) - initialDate);
                }}
                onClick={() => {
                  if (secondDate - date < 200) {
                    push(`/politician/${String(item?.short_link)}`);
                  }
                  setDate(null);
                  setSecondDate(null);
                }}
                key={item.name}
                className={styles.custom}
              >
                <CardActionArea>
                  <Box>
                    <Box
                      className={data?.rating && data?.place ? styles.imgContainer : classNames(styles.imgContainer, styles.imgContainer__nonRaiting)}
                      style={data?.rating && data?.place ? { backgroundImage: `url(${avatarColorChanger(data?.rating)})`, backgroundSize: 'cover' } : {}}
                    >
                      <img src={item.photo} alt="politics" className={data?.rating && data?.place ? styles.img : classNames(styles.img, styles.img__nonRaiting)} />
                    </Box>
                  </Box>
                  <Box className={styles.caption}>
                    <Typography className={styles.name}>{item.name}</Typography>
                  </Box>
                  <Box>
                    <Typography className={styles.percent}>{item.rating ? `${item.rating} %` : 'Без рейтинга'}</Typography>
                  </Box>
                </CardActionArea>
                <CardActions />
              </Card>
            </Tooltip>
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
