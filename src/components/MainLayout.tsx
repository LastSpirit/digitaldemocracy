import type { FC, ReactNode } from 'react';
import { experimentalStyled } from '@material-ui/core/styles';
import Footer from './Footer';
import MainNavbar from './MainNavbar';
import AuthModal from './widgets/modals/AuthModal/AuthModal';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: 64,
}));

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <MainLayoutRoot style={{ background: 'white' }}>
    <MainNavbar />
    <AuthModal />
    {children}
    <Footer />
  </MainLayoutRoot>
);

export default MainLayout;
