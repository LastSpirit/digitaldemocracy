import './HomeSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, Hidden, Typography, CardActionArea, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { frames } from '../../../icons/pictures/picturesExports/picturesExport';
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
    border: 'none'
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
    marginBottom: 25,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 15,
    }
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    maxWidth: 200
  },
  percentContainer: {
    marginBottom: 10
  },
  percent: {
    fontSize: 25,
    fontFamily: 'Helvetica'
  },

}));
export default function CustomArrows({ data }) {
  const classes = useStyles();
  // const settings = {
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  const settings = {
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      // {
      //   breakpoint: 1441,
      //   settings: {
      //     slidesToShow: 5,
      //     slidesToScroll: 1,
      //     initialSlide: 0,
      //     infinite: false,
      //     dots: false,
      //   },
      // },
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
  return (
    <div className={classes.carouselContainer}>
      <Slider {...settings}>
        {data?.map((item) => (
          <Card
            key={item.name}
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
                    src={item.photo}
                    alt="politics"
                    className={classes.img}
                  />
                </Box>
              </Box>
              <Box className={classes.caption}>
                <Typography className={classes.name}>{item.name}</Typography>
              </Box>
              <Box className={classes.percentContainer}>
                <Typography className={classes.percent}>{item.percent}</Typography>
              </Box>
            </CardActionArea>
            <CardActions />
          </Card>
        ))}
      </Slider>
      <Hidden smUp>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="buttonStyle">Весь рейтинг</button>
      </Hidden>
    </div>
  );
}
