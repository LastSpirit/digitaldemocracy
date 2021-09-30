import React, { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isDev, firebaseConfig, gtmConfig } from './config';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import { createAppTheme } from './theme';
import YandexRegisterModal from './components/widgets/modals/YandexRegisterModal/YandexRegisterModal';
import { ModalParams } from './types/routing';
import { useSearchParams } from './hooks/useSearchParams';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import SingleNewsPage from './pages/SingleNewsPage/SingleNewsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChangeProfilePage from './pages/ChangeProfilePage/ChangeProfilePage';
import { userSelectors } from './slices/userSlice';
import News from './pages/News';
import PoliticianPage from './pages/PoliticianPage/PoliticianPage';
import MassMediaPage from './pages/MassMediaPage/MassMediaPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import PartyPage from './pages/PartyPage/PartyPage';
import WidgetLinkPage from './pages/WidgetLinkPage';
import SuggestionPage from './pages/SuggestionPage/SuggestionPage';
import { DonationPage } from './pages/ProfilePage/DonationPage/DonationPage';
import RatingPage from './pages/RatingPage/RatingPage';
import SingleBills from './pages/SingleBillsPage/SingleBillsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ModalCookie from './components/ModalCookie/ModalCookie';
import { getItem } from './lib/localStorageManager';

const App: FC = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const location = useLocation();
  const { pathname } = useLocation();
  const [path, setPath] = React.useState(pathname);
  const [visibleCookie, setVisibleCookie] = React.useState(!JSON.parse(getItem('user_cookie_confirm')));

  const intersect = (prev, next) => {
    return prev
      .split('/')
      .filter(Boolean)
      .filter((item) => next.split('/').filter(Boolean).indexOf(item) !== -1);
  };
  // нуждается в тесте
  useEffect(() => {
    if (intersect(path, pathname).length < 1) {
      window.scrollTo(0, 0);
    }
    setPath(pathname);
  }, [pathname]);

  const { settings } = useSettings();
  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createAppTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  const {
    [ModalParams.YandexRegister]: { value: yandexRegisterValue, setValue: setYandexRegisterValue },
  } = useSearchParams(ModalParams.YandexRegister);
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  return useMemo(
    () =>
      isAuthenticated !== undefined ? (
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>{isDev ? 'Digital Democracy | Dev' : 'Digital Democracy'}</title>
          </Helmet>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/singleNews/:link" component={SingleNewsPage} />
              <Route path="/singleBills/:link" component={SingleBills} />
              <Route path="/donation" component={DonationPage} />
              <Route path="/news" component={News} />
              <Route path="/widgetLink/:id" component={WidgetLinkPage} />
              {isAuthenticated && <Route exact path="/profile" component={ProfilePage} />}
              {isAuthenticated && <Route exact path="/profile/*" component={ProfilePage} />}
              {isAuthenticated && <Route exact path="/changeProfile" component={ChangeProfilePage} />}
              <Route exact path="/politician/:short_link" component={PoliticianPage} />
              <Route exact path="/politician/:short_link/*" component={PoliticianPage} />
              <Route exact path="/mass-media/:link" component={MassMediaPage} />
              <Route exact path="/mass-media/:link/*" component={MassMediaPage} />
              <Route exact path="/author/:link" component={AuthorPage} />
              <Route exact path="/author/:link/*" component={AuthorPage} />
              <Route exact path="/party/:short_link" component={PartyPage} />
              <Route exact path="/party/:short_link*" component={PartyPage} />
              <Route exact path="/rating/*" component={RatingPage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/about" component={AboutPage} />
              {isAuthenticated && <Route exact path="/suggestion" component={SuggestionPage} />}
              <Redirect to="/" />
            </Switch>
          </MainLayout>
          {visibleCookie && <ModalCookie onClick={setVisibleCookie} />}
          <YandexRegisterModal open={!!yandexRegisterValue} onClose={() => setYandexRegisterValue(undefined)} />
          <div id="sign-in-button" />
        </ThemeProvider>
      ) : null,
    [isAuthenticated, location, visibleCookie]
  );
};

export default App;
