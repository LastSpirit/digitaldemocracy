import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { searchActionCreators, searchSelectors } from 'src/slices/searchSlice';
import CardSmall from '../../../components/CardSmall/CardSmall';
import PartyCard from '../../RatingPage/PartyCard/PartyCard';
import AuthorCard from '../../RatingPage/AuthorCard/AuthorCard';
import PoliticiansCard from '../../RatingPage/PoliticianCard/PoliticiansCard';
import MassMediaCard from '../../RatingPage/MassMediaCard/MassMediaCard';
import { useSearchCategory } from '../hooks/useSearchCategory';
import ArrowDown from '../../../icons/ArrowDown';

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
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const searchData = useSelector(searchSelectors.getSearchData());
  const { status: statusSearch, fetchSearchBlock } = useSearchCategory(type);

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
    if (page > 1) {
      fetchSearchBlock({ page });
      // if (type === SearchBlockTypes.NEWS) {
      //   fetchSearchNewsBlock({ search: 'Россия', page });
      // }
    }
  }, [page]);

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
      {searchData[type].isMorePages && (
        <Box
          sx={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            sx={{
              p: 1,
              borderRadius: 100,
              mr: 2,
              textDecoration: 'none',
              minWidth: '270px',
              width: '100%',
              maxWidth: '360px',
              display: 'flex',
              alignItems: 'center',
            }}
            size="small"
            variant="outlined"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <ArrowDown
              htmlColor={'#363557'}
              style={{ marginRight: '10px', height: '16px', width: '16px' }}
            />
            {t('buttons.showMore')}
          </Button>
        </Box>
      )}
    </Box>
  );
};
