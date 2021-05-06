import type { FC } from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import './HeroPicture.css';
import heroImage from '../../../icons/pictures/HeroPictureBig.png';

const HomeHero: FC = () => (
  <Box className="heroContainer">
    <Container maxWidth="lg">
      <Box
        className="heroImage"
        sx={{
          position: 'relative'
        }}
      >
        <img
          src={heroImage}
          alt="/"
        />
        <Typography
          align="left"
          color="#FFFFFF"
          className="heroText"
        >
          Дорогой Друг! Развитие демократии невозможно без системы сдержек и противовесов, не позволяющей всей полноте
          власти концентрироваться в одних руках и равномерно распределенной между государственными ветвями власти. С
          развитием средств связи к этой системе добавились СМИ, которые могли влиять на общественное мнение, но без
          обратной связи от населения. Интернет привнес интерактив в диалог между властью и народом. Осталось лишь
          формализовать и структурировать эти отношения и общество будет готово вступить в следующий этап развития
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          политического строя - "Цифровую демократию". Добро пожаловать!
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default HomeHero;
