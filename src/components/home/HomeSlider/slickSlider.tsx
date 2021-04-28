import "./HomeSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import politic1 from "../../../icons/pictures/politicsProfiles/politic1.png";
import politic2 from "../../../icons/pictures/politicsProfiles/politic2.png";
import politic3 from "../../../icons/pictures/politicsProfiles/politic3.png";
import politic4 from "../../../icons/pictures/politicsProfiles/politic4.png";
import politic5 from "../../../icons/pictures/politicsProfiles/politic5.png";
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import leftArrow from "../../../icons/pictures/arrow1.png";

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
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "#F3F3F3" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "#F3F3F3" }} onClick={onClick} />;
}

const informationOnPolitics = [
  {
    source: politic1,
    name: "Алексей Навальный",
    lastName: "Анатольевич",
    persent: "42,2%",
    id: 1,
  },
  {
    source: politic2,
    name: "Собчак Ксения",
    lastName: "Анатольевна",
    persent: "42,2%",
    id: 2,
  },
  {
    source: politic3,
    name: "Собчак Ксения",
    lastName: "Анатольевна",
    persent: "42,2%",
    id: 3,
  },
  {
    source: politic4,
    name: "Жириновский Владимир",
    lastName: "Вольфович",
    persent: "42,2%",
    id: 4,
  },
  {
    source: politic5,
    name: "Жириновский Владимир",
    lastName: "Вольфович",
    persent: "42,2%",
    id: 5,
  },
];

export default function CustomArrows() {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <Slider {...settings} className="cardContainer">
        {informationOnPolitics.map((item) => (
          <Card key={item.id} className={classes.custom}>
            <CardActionArea>
              <div style={{ position: "relative", height: "208px" }}>
                <CardMedia
                  style={{ backgroundColor: "red" }}
                  className="carouselImage"
                  component="img"
                  alt="Contemplative Reptile"
                  height="208"
                  image={item.source}
                />
                <CardMedia
                  style={{ backgroundColor: "red" }}
                  className="carouselImage2"
                  component="img"
                  alt="Contemplative Reptile"
                  height="208"
                  image="https://lh3.googleusercontent.com/proxy/p2voWxFd_lRVb0jeqsNTxuuW_3jXxXWcws6AS1ppI26HZ-Xqx09IWwRRpjWE6xBVmDYcTseU2_EiWKndyjbLfDPok__bJ3Vc4KK5"
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
    </div>
  );
}
