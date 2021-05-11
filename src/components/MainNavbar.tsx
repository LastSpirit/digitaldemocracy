import type { FC } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
  Container
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Search from '../icons/Search';
import InputTextField from './widgets/inputs/InputTextField';
import Brand from '../icons/Brand';
import { useWindowSize } from '../hooks/useWindowSize';
import Person from '../icons/Person';
import { ModalParams } from '../types/routing';
import { useSearchParams } from '../hooks/useSearchParams';
import './MainNavbar.css';
import Logo from './Logo';
import { userSelectors } from '../slices/userSlice';

const links = [
  {
    to: '/rating',
    title: 'Рейтинг',
    mr: 4,
  },
  {
    to: '/news',
    title: 'Новости',
    mr: 4,
  },
  {
    to: '/about_site',
    title: 'О площадке',
    mr: 0,
  }];

const MainNavbar: FC = () => {
  const { push } = useHistory();
  const { isMobile } = useWindowSize();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const buttons = [
    {
      title: isAuthenticated ? 'Предложить новость / политика' : 'Вход',
      to: isAuthenticated ? '/' : 'login',
      color: '',
    },
    {
      title: isAuthenticated ? <Person /> : 'Регистрация',
      to: isAuthenticated ? '/profile' : 'register',
      color: '',
    }
  ];

  const handleClick = (to: string) => {
    if (isAuthenticated) {
      push(to);
    } else {
      setAuthValue(to);
    }
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 64, justifyContent: isMobile ? 'center' : 'space-between', alignItems: 'center', display: 'flex' }}>
          {isMobile ? (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}
            >
              <Brand />
            </Box>
          ) : (
            <>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: 40
              }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40
                  }}
                >
                  <RouterLink to="/">
                    <div className="logo">
                      <Logo />
                    </div>
                  </RouterLink>
                  <Typography
                    sx={{ ml: 1.5 }}
                    color="textSecondary"
                    variant="caption"
                  >
                    Digital
                    <br />
                    Democracy
                  </Typography>
                </Box>
                <Box sx={{
                  marginLeft: 17,
                }}
                >
                  {!isMobile && (
                  <Box style={{ width: '210px' }}>
                    <InputTextField icon={<Search />} />
                  </Box>
                  )}
                </Box>
              </Box>
              {!isMobile && (
              <Box>
                {links.map(({ title, mr, to }, index) => (
                  <Link
                    key={index.toString()}
                    to={to}
                    color="textSecondary"
                    component={RouterLink}
                    underline="none"
                    variant="body1"
                    sx={{
                      marginRight: mr,
                    }}
                  >
                    {title}
                  </Link>
                ))}
              </Box>
              )}
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  p: 3,
                }}
              >
                {buttons.map(({ to, color, title }, index) => (
                  <Button
                    key={index.toString()}
                    sx={{
                      backgroundColor: color,
                      p: 1,
                      paddingRight: 2,
                      paddingLeft: 2,
                      borderRadius: 100,
                      mr: index === 0 ? 3 : 0,
                    }}
                    size="small"
                    variant="outlined"
                    onClick={() => handleClick(to)}
                  >
                    {title}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>

    </AppBar>
  );
};

export default MainNavbar;
