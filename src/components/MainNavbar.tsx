import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Link, Toolbar, Typography, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Search from '../icons/Search';
import InputTextField from './widgets/inputs/InputTextField';
import Brand from '../icons/Brand';
import { useWindowSize } from '../hooks/useWindowSize';
import Person from '../icons/Person';
import { ModalParams } from '../types/routing';
import { useSearchParams } from '../hooks/useSearchParams';
import './MainNavbar.css';
import Logo from './Logo';
import { userActionCreators, userSelectors } from '../slices/userSlice';

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
  },
];

const MainNavbar: FC = () => {
  const { push, length } = useHistory() as any;
  const { pathname } = useLocation();
  const { isMobile } = useWindowSize();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { setRout } = userActionCreators();
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const handleClick = (to: string) => {
    if (isAuthenticated) {
      push(to);
    } else {
      setAuthValue(to);
    }
  };
  useEffect(() => {
    setRout({ path: pathname, length });
  }, [pathname]);
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        maxHeight: '88px',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            minHeight: 64,
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {isMobile ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={() => push('/')}
            >
              <Brand />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    cursor: 'pointer',
                  }}
                  onClick={() => push('/')}
                >
                  <div className="logo">
                    <Logo />
                  </div>
                  <Typography
                    sx={{ ml: 1.5, fontSize: '14px' }}
                    color="textSecondary"
                    // variant="caption"
                  >
                    Digital
                    <br />
                    Democracy
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginLeft: 2,
                  }}
                >
                  {!isMobile && (
                    <Box style={{ width: '322px' }}>
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
                      // variant="body1"
                      sx={{
                        marginRight: mr,
                        fontSize: 14,
                        sm: {
                          fontSize: 12,
                        },
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
                <Button
                  className={classNames(['comeIn'])}
                  sx={{
                    p: 1,
                    paddingRight: 2,
                    paddingLeft: 2,
                    borderRadius: 100,
                    mr: 3,
                    textDecoration: 'none',
                  }}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    if (pathname !== '/suggestion') {
                      handleClick(isAuthenticated ? '/suggestion' : 'login');
                    }
                  }}
                >
                  {isAuthenticated ? 'Предложить новость / политика' : 'Вход'}
                </Button>
                <Button
                  className={
                    !isAuthenticated ? classNames(['buttonsStyle', { register: true }]) : classNames(['buttonsStyleProfile'])
                  }
                  sx={{
                    backgroundColor: 'white',
                    p: 1,
                    paddingRight: 2,
                    paddingLeft: 2,
                    borderRadius: 100,
                    mr: 0,
                  }}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    if (!pathname.includes('profile')) {
                      handleClick(isAuthenticated ? '/profile' : 'register');
                    }
                  }}
                >
                  {isAuthenticated ? <Person /> : 'Регистрация'}
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
