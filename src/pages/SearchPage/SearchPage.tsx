import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Search } from '../../components/Search/Search';
import { searchSelectors } from '../../slices/searchSlice';
import PoliticiansCard from '../RatingPage/PoliticianCard/PoliticiansCard';

const SearchPage = () => {
  const { isMobile } = useWindowSize();
  const searchData = useSelector(searchSelectors.getSearchData());

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {/* <Search /> */}
      {/* searchData */}
    </Container>
  );
};

export default SearchPage;
