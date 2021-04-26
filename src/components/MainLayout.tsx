import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import Footer from './Footer';
import MainNavbar from './MainNavbar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = experimentalStyled('div')(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.default,
      height: '100%',
      paddingTop: 64
    }
  )
);

const MainLayout: FC<MainLayoutProps> = () => (
  <MainLayoutRoot>
    <MainNavbar
      onSidebarMobileOpen={(): void => {}}
    />
    <Outlet />
    <Footer />
  </MainLayoutRoot>
);

export default MainLayout;
