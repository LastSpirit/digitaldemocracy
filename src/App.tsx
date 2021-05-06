import { useEffect } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import firebase from 'firebase';
import GlobalStyles from './components/GlobalStyles';
import RTL from './components/RTL';
import { firebaseConfig, gtmConfig } from './config';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import routes from './routes';
import { createTheme } from './theme';

const App: FC = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const content = useRoutes(routes);
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

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <SnackbarProvider
          dense
          maxSnack={3}
        >
          <GlobalStyles />
          {content}
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  );
};

export default App;
