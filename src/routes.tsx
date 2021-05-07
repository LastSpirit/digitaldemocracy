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
const SingleNews = Loadable(lazy(() => import('./pages/SingleNews')));

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
        path: '/singleNews',
        element: <SingleNews />
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
