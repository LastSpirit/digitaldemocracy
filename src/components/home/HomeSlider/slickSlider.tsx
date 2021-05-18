import './HomeSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, Typography, CardActionArea, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { frames } from '../../../icons/pictures/picturesExports/picturesExport';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { PoliticiansI } from '../../../slices/homeSlice';
// import { slideData } from './SlideData';

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: '#F3F3F3' }}
//       onClick={onClick}
//     />
//   );
// }
//
// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: '#F3F3F3' }}
//       onClick={onClick}
//     />
//   );
// }

const useStyles = makeStyles((theme) => ({
  custom: {
    cursor: 'default',
    maxWidth: 210,
    width: 210,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    border: 'none',
    marginBottom: 30,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    }
  },

  carouselContainer: {
    width: '90%',
    margin: 'auto',
  },
  frame: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 210,
    height: 210,

  },
  img: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: '50%',
    zIndex: 3,
    width: 210,
    height: 210,
    objectFit: 'cover'
  },
  imgContainer: {
    position: 'relative',
    height: 210,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    }
  },
  caption: {
    marginBottom: 15,
    padding: '0px 15px',
    minHeight: 50,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    }
  },
  name: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    maxWidth: 200,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
  percent: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
}));

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

const CustomArrows: FC<{ data: PoliticiansI[] }> = ({ data }) => {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const { push } = useHistory();
  return (
    <div className={classes.carouselContainer}>
      {data ? (
        <Slider {...settings}>
          {data?.map(({ id, name, percent, photo }) => (
            <Card
              onClick={() => push(`/politician/${String(id)}`)}
              key={name}
              className={classes.custom}
            >
              <CardActionArea>
                <Box>
                  <Box className={classes.imgContainer}>
                    <img
                      src={frames.greenFrame}
                      alt="frame"
                      className={classes.frame}
                    />
                    <img
                      src={photo}
                      alt="politics"
                      className={classes.img}
                    />
                  </Box>
                </Box>
                <Box className={classes.caption}>
                  <Typography className={classes.name}>{name}</Typography>
                </Box>
                <Box>
                  <Typography className={classes.percent}>{percent}</Typography>
                </Box>
              </CardActionArea>
              <CardActions />
            </Card>
          ))}
        </Slider>
      ) : null}
      {isMobile ? (
      // eslint-disable-next-line react/button-has-type
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="buttonStyle">Весь рейтинг</Button>
        </Box>
      ) : null}
    </div>
  );
};

export default CustomArrows;
