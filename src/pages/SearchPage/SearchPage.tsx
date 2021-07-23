import { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Search } from './form/Search';

const SearchPage = () => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Search />
      </Container>
    </div>
  );
};

export default SearchPage;
