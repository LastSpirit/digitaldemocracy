import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Hidden,
  Link,
  Toolbar,
} from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Logo from './Logo';
import Search from '../icons/Search';
import InputTextField from './widgets/inputs/InputTextField';
import Brand from '../icons/Brand';
import { useWindowSize } from '../hooks/useWindowSize';
import useAuth from '../hooks/useAuth';

interface MainNavbarProps {
  onSidebarMobileOpen?: () => void;
}

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

const MainNavbar: FC<MainNavbarProps> = () => {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  const { isAuthenticated } = useAuth();
  const buttons = [
    {
      title: isAuthenticated ? 'Предложить новость/политика' : 'Вход',
      to: isAuthenticated ? '/' : '/login',
      color: 'error.main',
    },
    {
      title: isAuthenticated ? <PersonOutlineOutlinedIcon /> : 'Регистрация',
      to: isAuthenticated ? '/profile' : '/register',
      color: '',
    }
  ];
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary'
      }}
    >
      <Toolbar sx={{ minHeight: 64, justifyContent: isMobile ? 'center' : 'space-between', alignItems: 'center', display: 'flex' }}>
        <Hidden smDown>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            height: 40
          }}
          >
            <RouterLink to="/">
              <Logo
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
            <Box sx={{
              marginLeft: 17,
            }}
            >
              <InputTextField
                icon={<Search />}
              />
            </Box>
          </Box>
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
                  marginRight: mr
                }}
              >
                {title}
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              p: 3
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
                variant="contained"
                onClick={() => navigate(to)}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
          }}
          >
            <Brand />
          </Box>
        </Hidden>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default MainNavbar;
