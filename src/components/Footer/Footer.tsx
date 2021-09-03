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
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { routesWithNotification } from 'src/static/static';
import Logo from '../Logo';
import { useWindowSize } from '../../hooks/useWindowSize';
import Register from '../../icons/Register';
import News from '../../icons/News';
import Information from '../../icons/Information';
import Search from '../../icons/Search';
import { Person } from '../../icons/Person';
import Rating from '../../icons/Rating';
import '../MainNavbar.scss';
import { userSelectors } from '../../slices/userSlice';
import { AuthParam, ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';
import PrivacyPolicyPdf from '../../theme/PrivacyPolicy.pdf';
import TermsOfUse from '../../theme/TermsOfUse.pdf';

import styles from './styles.module.scss';

const sectionsData = (t) => {
  return [
    {
      title: t('footer.menu.contacts') || 'Контакты',
      links: [
        {
          title: 'info@digitaldemocracy.ru',
          href: 'mailto:info@digitaldemocracy.ru',
        },
      ],
    },
    {
      title: t('footer.menu.mapSite') || 'Карта сайта',
      links: [
        {
          title: t('footer.menu.newsMenu') || 'Новости',
          href: '/news',
        },
        {
          title: t('footer.menu.ratingMenu') || 'Рейтинг',
          href: '/rating/politicians',
        },
        {
          title: t('footer.menu.aboutMenu') || 'О площадке',
          href: '/about',
        },
        {
          title: t('footer.menu.userAgreement') || 'Пользовательское соглашение',
          href: null,
          download: true,
          downloadLink: TermsOfUse,
        },
        {
          title: t('footer.menu.personalDataPolicy') || 'Политика обработки персональных данных',
          href: null,
          download: true,
          downloadLink: PrivacyPolicyPdf,
        },
      ],
    },
  ];
};

const authUserSectionsData = (t) => {
  return [
    {
      title: t('footer.menu.contacts') || 'Контакты',
      links: [
        {
          title: 'info@digitaldemocracy.ru',
          href: 'mailto:info@digitaldemocracy.ru',
        },
      ],
    },
    {
      title: t('footer.menu.mapSite') || 'Карта сайта',
      links: [
        {
          title: t('footer.menu.newsMenu') || 'Новости',
          href: '/news',
        },
        {
          title: t('footer.menu.ratingMenu') || 'Рейтинг',
          href: '/rating/politicians',
        },
        {
          title: t('footer.menu.aboutMenu') || 'О площадке',
          href: '/about',
        },
        {
          title: t('footer.menu.addNews') || 'Добавить новость',
          href: '/suggestion',
        },
        {
          title: t('footer.menu.addPolitician') || 'Добавить политика',
          href: '/suggestion',
        },
        {
          title: t('footer.menu.userAgreement') || 'Пользовательское соглашение',
          href: null,
          download: true,
          downloadLink: TermsOfUse,
        },
        {
          title: t('footer.menu.personalDataPolicy') || 'Политика обработки персональных данных',
          href: null,
          download: true,
          downloadLink: PrivacyPolicyPdf,
        },
      ],
    },
  ];
};

const iconsData = (isAuthenticated) => {
  const { t } = useTranslation();
  return [
    {
      title: t('footer.menu.search') || 'Поиск',
      icon: <Search />,
      to: '/search',
    },
    {
      title: t('footer.menu.ratingMenu') || 'Рейтинг',
      icon: <Rating />,
      to: '/rating/politicians',
    },
    {
      title: t('footer.menu.newsMenu') || 'Новости',
      icon: <News />,
      to: '/news',
    },
    {
      title: t('footer.menu.aboutMenu') || 'О площадке',
      icon: <Information />,
      to: '/about',
    },
    {
      title: isAuthenticated ? t('footer.menu.profileMenu') : t('footer.menu.signInFooter'),
      icon: isAuthenticated ? <Person /> : <Register />,
      to: isAuthenticated ? '/profile' : AuthParam.login,
    },
  ];
};

const Footer: FC = (props) => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { t } = useTranslation();
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
  const sections = sectionsData(t);
  const authUserSections = authUserSectionsData(t);
  const icons = iconsData(isAuthenticated);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pb: {
          md: 2,
          xs: 0,
        },
        pt: {
          md: 2,
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
                  onClick={() => {
                    return !isAuthenticated && title === t('footer.menu.signInFooter') ? setAuthValue(to) : push(to);
                  }}
                >
                  {icon}
                  <span style={{ marginTop: '4px', fontSize: '10px' }}>{title}</span>
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
                          link.href !== 'mailto:info@digitaldemocracy.ru' ? (
                            <Link
                              sx={{
                                cursor: 'pointer',
                                paddingBottom: '0!important',
                              }}
                              onClick={() => {
                                if (!link.href) {
                                  return null;
                                }
                                return push(link.href);
                              }}
                              color="#747373"
                              fontWeight="300"
                              variant="subtitle2"
                              download={link?.download}
                              href={link?.downloadLink}
                            >
                              {link.title}
                            </Link>
                          ) : (
                            <a style={{ color: '#747373' }} href={link.href}>
                              {link.title}
                            </a>
                          )
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
              <Link
                href={'/donation'}
                className={styles.btn}
              >
                {t('buttons.helpSite')}
              </Link>
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
                    ? t('footer.descriptionsFooter.variant1') || 'отображает только мнение пользователей данного сайта'
                    : t('footer.descriptionsFooter.variant2') ||
                      'рейтинг отображает мнение пользователей Digital Democracy'
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
