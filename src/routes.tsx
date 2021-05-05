import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const NotFound = Loadable(lazy(() => import('./pages/NotFound')));

// Other pages

const Home = Loadable(lazy(() => import('./pages/Home')));

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
