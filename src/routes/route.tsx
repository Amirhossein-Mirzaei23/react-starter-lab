import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { PostList } from '../components/posts-list/posts-list';
import BillsList from '../components/pendding-bills/bills-list';
import FriendsList from '../components/friends-container/friends-list';
import { Authentication } from '../components/authentication/authentication';
import ProfilePage from '../pages/profile/landing/profile';
import ProfileDetailPage from '../pages/profile/detail/detail';
import ProfileLogOutPage from '../pages/profile/logout/logout';
import FriendshipRequestsListPage from '../pages/friendShip/requests';
import GroupsListPage from '../pages/groups/list';
import { Spinner } from '@chakra-ui/react';
import ProtectedRoute from './ProtectedRoute';
import GroupDetailPage from '../pages/groups/detail';

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
          <Suspense
            fallback={
              <div className="flex-1 flex  flex-col justify-center items-center">
                <Spinner size="lg" borderWidth="2px" />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'sign-in',
        element: <Authentication />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'friends-list',
            element: <FriendsList />,
          },

          {
            path: 'profile',
            element: <ProfilePage />,

            // {
            //   path:'logout',
            //   element:<ProfileDetailPage />
            // },
          },
          {
            path: 'profile/detail',
            element: <ProfileDetailPage />,
          },
          {
            path: 'profile/logout',
            element: <ProfileLogOutPage />,
          },
          {
            path: 'profile/friend',
            element: <FriendsList />,
          },
          {
            path: 'profile/friendship-requests',
            element: <FriendshipRequestsListPage />,
          },
          {
            path: 'groups',
            element: <GroupsListPage />,
          },
          {
            path: 'group/:id',
            element: <GroupDetailPage />,
          },
        ],
      },

      {
        path: 'post-list',
        element: <PostList />,
      },
      {
        path: 'pending-bils-list',
        element: <BillsList />,
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
