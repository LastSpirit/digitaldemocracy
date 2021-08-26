import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { searchSelectors } from '../../slices/searchSlice';
import { SearchBlockTypes, SearchBlock } from './SearchBlock/SearchBlock';

const SearchPage = () => {
  const { isMobile } = useWindowSize();
  const { t } = useTranslation();
  const searchData = useSelector(searchSelectors.getSearchData());

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
        ? <SearchBlock headerText={t('tabs.news')} type={SearchBlockTypes.NEWS} />
        : null
      }
      {
        searchData.politician.data.length
          ? <SearchBlock headerText={t('tabs.politicians')} type={SearchBlockTypes.POLITICIAN} />
          : null
      }
      {
        searchData.author.data.length
          ? <SearchBlock headerText={t('tabs.authors')} type={SearchBlockTypes.AUTHOR} />
          : null
      }
      {
        searchData.media.data.length
          ? <SearchBlock headerText={t('tabs.massMedia')} type={SearchBlockTypes.MEDIA} />
          : null
      }
      {
        searchData.party.data.length
        ? <SearchBlock headerText={t('tabs.parties')} type={SearchBlockTypes.PARTY} />
        : null
      }
    </Container>
  );
};

export default SearchPage;
