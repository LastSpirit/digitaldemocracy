import '../HomeSlider/HomeSlider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFetchHomePageData } from '../hooks/useFetchHomePageData';

const useStyles = makeStyles({
  topic: {
    textAlign: 'center',
    width: '150px',
    maxWidth: '160px',
    cursor: 'pointer'
  },
  topicText: {
    fontWeight: 400,
    fontSize: 13,
    padding: '4px 8px',
    border: '1px solid #747373',
    borderRadius: '50px',
    color: '#747373'
  },
  carouselContainer: {
    width: '80%',
    margin: 'auto',
  },

});

export default function TopicsSlider({ newsTopics }) {
  const { fetch } = useFetchHomePageData();
  const handleNewsTopics = (id) => {
    console.log('TopicsSlider');
    fetch(1, id);
  };
  const classes = useStyles();

  const settings = {

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
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
        {newsTopics.map((item) => (
          <Box
            className={classes.topic}
            onClick={() => handleNewsTopics(item.id)}
            key={item.id}
          >
            <Typography className={classes.topicText}>{item.title}</Typography>
          </Box>
        ))}
      </Slider>

    </div>
  );
}
