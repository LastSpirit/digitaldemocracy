import React, { useEffect } from 'react';
import type { FC } from 'react';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import { gtmConfig } from './config';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import { createTheme } from './theme';

const App: FC = () => {
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
      <div>APP</div>
    </ThemeProvider>
  );
};

export default App;
