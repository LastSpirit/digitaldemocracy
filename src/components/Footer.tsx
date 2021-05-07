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
import { useHistory } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import Logo from './Logo';
import { useWindowSize } from '../hooks/useWindowSize';
import Register from '../icons/Register';
import News from '../icons/News';
import Search from '../icons/Search';
import Person from '../icons/Person';
import Rating from '../icons/Rating';
import useAuth from '../hooks/useAuth';
import './MainNavbar.css';

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
        title: 'Помощь площадке',
        href: '/help_site',
      },
      {
        title: 'Пользовательское соглашение',
        href: '#',
      },
    ],
  },
];

const Footer: FC = (props) => {
  const { isAuthenticated } = useAuth();
  const { isMobile } = useWindowSize();
  const { push } = useHistory();
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
      to: '',
    },
    {
      title: isAuthenticated ? 'Профиль' : 'Регистрация',
      icon: isAuthenticated ? <Person /> : <Register />,
      to: '',
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
      {...props}
    >
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1.5,
          }}
        >
          <Box
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              display: 'flex',
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
                onClick={() => push(to)}
              >
                {icon}
                <span style={{ marginTop: '10px' }}>{title}</span>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
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
                }}
              >
                <div className="logo-footer">
                  <Logo />
                </div>
                <Box sx={{ mt: 1, ml: 1.5 }}>
                  <Typography
                    color="textSecondary"
                    variant="caption"
                  >
                    Digital
                    <br />
                    Democracy
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {sections.map((section, index) => (
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
                        primary={(
                          <Link
                            href={link.href}
                            color="#747373"
                            fontWeight="300"
                            variant="subtitle2"
                          >
                            {link.title}
                          </Link>
                        )}
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
          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
              my: 6,
            }}
          />
          <Typography
            color="textSecondary"
            variant="caption"
          >
            * отображает только мнение
            {' '}
            {isAuthenticated ? 'пользователя' : 'пользователей данного сайта'}
            .
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Footer;
