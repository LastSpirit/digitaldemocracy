import React, { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { firebaseConfig, gtmConfig } from './config';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import { createTheme } from './theme';
import YandexRegisterModal from './components/widgets/modals/YandexRegisterModal/YandexRegisterModal';
import { ModalParams } from './types/routing';
import { useSearchParams } from './hooks/useSearchParams';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import SingleNews from './pages/SingleNews';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { userSelectors } from './slices/userSlice';
import News from './pages/News';
import PoliticianPage from './pages/PoliticianPage/PoliticianPage';
import MassMediaPage from './pages/MassMediaPage/MassMediaPage';
import WidgetLinkPage from './pages/WidgetLinkPage';
import { DonationPage } from './pages/ProfilePage/DonationPage/DonationPage';

const App: FC = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { settings } = useSettings();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createTheme({
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
            <title>Digital Democracy | Dev</title>
          </Helmet>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/singleNews/:link" component={SingleNews} />
              <Route path="/donation" component={DonationPage} />
              <Route path="/news" component={News} />
              <Route path="/widgetLink/:id" component={WidgetLinkPage} />
              {isAuthenticated && <Route exact path="/profile" component={ProfilePage} />}
              {isAuthenticated && <Route exact path="/profile/*" component={ProfilePage} />}
              <Route exact path="/politician/:politicianId" component={PoliticianPage} />
              <Route exact path="/politician/:politicianId/*" component={PoliticianPage} />
              <Route exact path="/mass-media/:massMediaId" component={MassMediaPage} />
              <Route exact path="/mass-media/:massMediaId/*" component={MassMediaPage} />
              <Redirect to="/" />
            </Switch>
          </MainLayout>
          <YandexRegisterModal open={!!yandexRegisterValue} onClose={() => setYandexRegisterValue(undefined)} />
          <div id="sign-in-button" />
        </ThemeProvider>
      ) : null,
    [isAuthenticated, location]
  );
};

export default App;
