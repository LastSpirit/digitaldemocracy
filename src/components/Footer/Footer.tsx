import type { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { routesWithNotification } from 'src/static/static';
import Logo from '../Logo';
import { useWindowSize } from '../../hooks/useWindowSize';
import Register from '../../icons/Register';
import News from '../../icons/News';
import Search from '../../icons/Search';
import Person from '../../icons/Person';
import Rating from '../../icons/Rating';
import '../MainNavbar.css';
import { userSelectors } from '../../slices/userSlice';
import { AuthParam, ModalParams } from '../../types/routing';
import styles from './styles.module.scss';
import { useSearchParams } from '../../hooks/useSearchParams';

const sections = [
  {
    title: 'Контакты',
    links: [
      {
        title: 'info@digitaldemocracy.ru',
        href: '/browse',
      },
    ],
  },
  {
    title: 'Карта сайта',
    links: [
      {
        title: 'Новости',
        href: '/news',
      },
      {
        title: 'Рейтинг',
        href: '/rating',
      },
      {
        title: 'О площадке',
        href: '/help_site',
      },
      {
        title: 'Пользовательское соглашение',
        href: '/',
      },
    ],
  },
];

const authUserSections = [
  {
    title: 'Контакты',
    links: [
      {
        title: 'info@digitaldemocracy.ru',
        href: '/browse',
      },
    ],
  },
  {
    title: 'Карта сайта',
    links: [
      {
        title: 'Новости',
        href: '/news',
      },
      {
        title: 'Рейтинг',
        href: '/rating',
      },
      {
        title: 'О площадке',
        href: '/help_site',
      },
      {
        title: 'Добавить новость',
        href: '/suggestion',
      },
      {
        title: 'Добавить политика',
        href: '/suggestion',
      },
      {
        title: 'Пользовательское соглашение',
        href: '/',
      },
    ],
  },
];

const Footer: FC = (props) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const {
    push,
    location: { pathname },
  } = useHistory();
  const withNotification =
    routesWithNotification.reduce((acc, rec) => {
      return acc || pathname.includes(rec);
    }, 0) || pathname === '/';
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const icons = [
    {
      title: 'Поиск',
      icon: <Search />,
      to: '',
    },
    {
      title: 'Рейтинг',
      icon: <Rating />,
      to: '',
    },
    {
      title: 'Новости',
      icon: <News />,
      to: '/news',
    },
    {
      title: isAuthenticated ? 'Профиль' : 'Вход/Регистрация',
      icon: isAuthenticated ? <Person /> : <Register />,
      to: isAuthenticated ? '/profile' : AuthParam.register,
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pb: {
          md: 6,
          xs: 0,
        },
        pt: {
          md: 6,
          xs: 0,
        },
      }}
      className={classNames(styles.container, { [styles.mobileContainer]: isMobile })}
      {...props}
    >
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1.5,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            <Container
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              {icons.map(({ icon, title, to }, index) => (
                <Box
                  key={index.toString()}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => (!isAuthenticated && title === 'Вход/Регистрация' ? setAuthValue(to) : push(to))}
                >
                  {icon}
                  <span style={{ marginTop: '10px', fontSize: '12px' }}>{title}</span>
                </Box>
              ))}
            </Container>
          </Box>
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid
              item
              md={3}
              sm={4}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                order: 1,
              }}
              xs={12}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => push('/')}
              >
                <div className="logo-footer">
                  <Logo />
                </div>
                <Box sx={{ mt: 1, ml: 1.5 }}>
                  <Typography color="textSecondary" variant="caption">
                    Digital
                    <br />
                    Democracy
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {[...(isAuthenticated ? authUserSections : sections)].map((section, index) => (
              <Grid
                item
                key={section.title}
                md={3}
                sm={4}
                sx={{
                  order: index + 1,
                }}
                xs={12}
              >
                <Typography
                  color="#222222"
                  variant="overline"
                  sx={{
                    pb: '0!important',
                  }}
                >
                  {section.title}
                </Typography>
                <List disablePadding>
                  {section.links.map((link) => (
                    <ListItem
                      disableGutters
                      key={link.title}
                      sx={{
                        pb: 0,
                        pt: 1,
                      }}
                    >
                      <ListItemAvatar
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          minWidth: 0,
                          mr: 0.5,
                        }}
                      />
                      <ListItemText
                        sx={{
                          paddingBottom: '0!important',
                        }}
                        primary={
                          <Link
                            sx={{
                              cursor: 'pointer',
                              paddingBottom: '0!important',
                            }}
                            onClick={() => push(link.href)}
                            color="#747373"
                            fontWeight="300"
                            variant="subtitle2"
                          >
                            {link.title}
                          </Link>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
            <Grid
              item
              md={3}
              sm={4}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                order: 3,
              }}
              xs={12}
            >
              <Button
                sx={{
                  border: '1px solid #B0B0B0',
                  borderRadius: 100,
                  paddingTop: 3,
                  paddingBottom: 3,
                  fontSize: '20px',
                  width: 400,
                  color: '#222222',
                }}
              >
                Помочь&ensp;площадке
              </Button>
            </Grid>
          </Grid>
          {withNotification && (
            <>
              <Divider
                sx={{
                  borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
                  my: 2,
                }}
              />

              <Typography color="textSecondary" variant="caption">
                {`* ${
                  pathname === '/'
                    ? 'отображает только мнение пользователей данного сайта'
                    : 'рейтинг отображает мнение пользователей Digital Democracy'
                }`}
              </Typography>
            </>
          )}
        </Container>
      )}
    </Box>
  );
};

export default Footer;
