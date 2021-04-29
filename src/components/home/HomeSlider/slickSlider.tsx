import "./HomeSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { slideData } from "./SlideData.jsx";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: "block", background: "#F3F3F3" }} onClick={onClick} />;
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: "block", background: "#F3F3F3" }} onClick={onClick} />;
// }

const useStyles = makeStyles({
  custom: {
    border: "none",
    boxShadow: "none",
    cursor: "default",
  },
  customText: {
    color: "#222222",
    fontSize: 18,
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  carouselContainer: {
    width: "82%",
    margin: "auto",
  },
});
export default function CustomArrows() {
  const classes = useStyles();
  // const settings = {
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
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
        {slideData.map((item) => (
          <Card key={item.id} className={classes.custom}>
            <CardActionArea>
              <div className="imageFrame">
                <CardMedia
                  className="carouselImage"
                  component="img"
                  alt="Contemplative Reptile"
                  height="208"
                  image={item.source}
                />
                <CardMedia
                  className="carouselImage2"
                  component="img"
                  alt="Contemplative Reptile"
                  height="208"
                  image={item.imageFrame}
                />
              </div>
              <CardContent>
                <Typography gutterBottom className={classes.customText}>
                  <Box>{item.name}</Box>
                  <Box>{item.lastName}</Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className="persentage">
                  {item.persent}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        ))}
      </Slider>
      <Hidden smUp>
        <button className="buttonStyle">Весь рейтинг</button>
      </Hidden>
    </div>
  );
}
