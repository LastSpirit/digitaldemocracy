import type { FC, ReactNode } from 'react';
import { experimentalStyled } from '@material-ui/core/styles';
import Footer from './Footer/Footer';
import MainNavbar from './MainNavbar';
import AuthModal from './widgets/modals/AuthModal/AuthModal';
import { useWindowSize } from '../hooks/useWindowSize';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: 64,
}));

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isMobile } = useWindowSize();

  return (
    <MainLayoutRoot
      style={{ background: 'white', paddingBottom: isMobile ? 80 : 0, paddingTop: isMobile ? '88px' : '90px' }}
    >
      <MainNavbar />
      <AuthModal />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

export default MainLayout;
