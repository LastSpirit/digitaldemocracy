import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { searchSelectors } from '../../slices/searchSlice';
import { SearchBlockTypes, SearchBlock } from './SearchBlock/SearchBlock';

const SearchPage = () => {
  const { isMobile } = useWindowSize();
  const searchData = useSelector(searchSelectors.getSearchData());

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // height: '80vh',
        flexDirection: 'column',
        // p: 4,
      }}
    >
      {
        searchData.news.data.length
        ? <SearchBlock headerText={'Новости'} type={SearchBlockTypes.NEWS} data={searchData.news.data} />
        : null
      }
      {
        searchData.party.data.length
        ? <SearchBlock headerText={'Партии'} type={SearchBlockTypes.PARTY} data={searchData.party.data} />
        : null
      }
      {
        searchData.author.data.length
          ? <SearchBlock headerText={'Авторы'} type={SearchBlockTypes.AUTHOR} data={searchData.author.data} />
          : null
      }
      {
        searchData.politician.data.length
          ? <SearchBlock headerText={'Политики'} type={SearchBlockTypes.POLITICIAN} data={searchData.politician.data} />
          : null
      }
      {
        searchData.media.data.length
          ? <SearchBlock headerText={'СМИ'} type={SearchBlockTypes.MEDIA} data={searchData.media.data} />
          : null
      }
    </Container>
  );
};

export default SearchPage;
