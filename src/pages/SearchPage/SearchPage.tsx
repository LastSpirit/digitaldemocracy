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

  // data={searchData.news.data}
  // data={searchData.party.data}
  // data={searchData.author.data}
  // data={searchData.politician.data}
  // data={searchData.media.data}

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
        ? <SearchBlock headerText={'Новости'} type={SearchBlockTypes.NEWS} />
        : null
      }
      {
        searchData.party.data.length
        ? <SearchBlock headerText={'Партии'} type={SearchBlockTypes.PARTY} />
        : null
      }
      {
        searchData.author.data.length
          ? <SearchBlock headerText={'Авторы'} type={SearchBlockTypes.AUTHOR} />
          : null
      }
      {
        searchData.politician.data.length
          ? <SearchBlock headerText={'Политики'} type={SearchBlockTypes.POLITICIAN} />
          : null
      }
      {
        searchData.media.data.length
          ? <SearchBlock headerText={'СМИ'} type={SearchBlockTypes.MEDIA} />
          : null
      }
    </Container>
  );
};

export default SearchPage;
