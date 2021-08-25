import React, { FC } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { searchActionCreators } from 'src/slices/searchSlice';
import CardSmall from '../../../components/CardSmall/CardSmall';
import PartyCard from '../../RatingPage/PartyCard/PartyCard';
import AuthorCard from '../../RatingPage/AuthorCard/AuthorCard';
import PoliticiansCard from '../../RatingPage/PoliticianCard/PoliticiansCard';
import MassMediaCard from '../../RatingPage/MassMediaCard/MassMediaCard';

interface SearchBlockI {
  headerText: string,
  type: SearchBlockTypes,
  data: Array<any>,
}

export enum SearchBlockTypes {
  NEWS,
  POLITICIAN,
  PARTY,
  MEDIA,
  AUTHOR,
}

export const SearchBlock: FC<SearchBlockI> = ({
  headerText,
  type,
  data }) => {
  const getComponent = (props) => {
    switch (type) {
    case SearchBlockTypes.NEWS:
      return <CardSmall {...props} />;
    case SearchBlockTypes.PARTY:
      return <PartyCard {...props} />;
    case SearchBlockTypes.AUTHOR:
      return <AuthorCard {...props} />;
    case SearchBlockTypes.POLITICIAN:
      return <PoliticiansCard {...props} />;
    case SearchBlockTypes.MEDIA:
      return <MassMediaCard {...props} />;
    default:
      return null;
    }
  };

  return (
    <Box
      sx={{
        marginBottom: '30px',
      }}
    >
      <Typography
        fontSize="35px"
        textAlign="left"
        component="h2"
        marginBottom="20px"
      >
        {headerText}
      </Typography>
      <Grid
        container
        spacing={2}
        // justifyContent="center"
      >
        {data.map((item, index) => (
          <Grid key={index.toString()} item md={3} sm={6} xs={12} justifyContent="center">
            {getComponent(item)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
