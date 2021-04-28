import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import Footer from './Footer';
import MainNavbar from './MainNavbar';
import AuthModal from './widgets/modals/AuthModal/AuthModal';

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
    <MainNavbar />
    <AuthModal />
    <Outlet />
    <Footer />
  </MainLayoutRoot>
);

export default MainLayout;
