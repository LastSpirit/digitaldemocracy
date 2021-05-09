import { useEffect } from 'react';
import type { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import firebase from 'firebase';
import { firebaseConfig, gtmConfig } from './config';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import { createTheme } from './theme';
import YandexRegisterModal from './components/widgets/modals/YandexRegisterModal/YandexRegisterModal';
import { ModalParams } from './types/routing';
import { useSearchParams } from './hooks/useSearchParams';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SingleNews from './pages/SingleNews';

const App: FC = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const { settings } = useSettings();
  useScrollReset();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  const {
    [ModalParams.YandexRegister]: { value: yandexRegisterValue, setValue: setYandexRegisterValue },
  } = useSearchParams(ModalParams.YandexRegister);

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/singleNews/:link"
            component={SingleNews}
          />
          <Route
            path="/404"
            component={NotFound}
          />
          <Redirect to="/" />
        </Switch>
      </MainLayout>
      <YandexRegisterModal
        open={!!yandexRegisterValue}
        onClose={() => setYandexRegisterValue(undefined)}
      />
    </ThemeProvider>
  );
};

export default App;
