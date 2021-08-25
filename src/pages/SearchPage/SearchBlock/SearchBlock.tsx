import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { searchActionCreators, searchSelectors } from 'src/slices/searchSlice';
import CardSmall from '../../../components/CardSmall/CardSmall';
import PartyCard from '../../RatingPage/PartyCard/PartyCard';
import AuthorCard from '../../RatingPage/AuthorCard/AuthorCard';
import PoliticiansCard from '../../RatingPage/PoliticianCard/PoliticiansCard';
import MassMediaCard from '../../RatingPage/MassMediaCard/MassMediaCard';

interface SearchBlockI {
  headerText: string,
  type: SearchBlockTypes,
  // data: Array<any>,
}

export enum SearchBlockTypes {
  NEWS = 'news',
  POLITICIAN = 'politician',
  PARTY = 'party',
  MEDIA = 'media',
  AUTHOR = 'author',
}

// setPerPage({
//   key: type,
//   value: searchData[type].perPage + 4
// });

export const SearchBlock: FC<SearchBlockI> = ({
  headerText,
  type,
}) => {
  // const { setPage, setPerPage } = searchActionCreators();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const searchData = useSelector(searchSelectors.getSearchData());

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

  useEffect(() => {
    console.log(type, perPage);
  }, [perPage]);

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
        {searchData[type].data.map((item, index) => (
          <Grid key={index.toString()} item md={3} sm={6} xs={12} justifyContent="center">
            {getComponent(item)}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          onClick={() => {
            setPerPage(perPage + 4);
          }}
        >
          Показать еще
        </Button>
      </Box>
    </Box>
  );
};
