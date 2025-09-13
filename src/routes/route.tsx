import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));

const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
