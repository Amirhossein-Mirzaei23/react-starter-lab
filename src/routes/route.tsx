import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { PostList } from '../features/posts/components/posts-list/posts-list';
import BillsList from '../features/bills/components/bills-list';
import FriendsList from '../features/friends/components/friends-list';
import { Authentication } from '../features/auth/components/authentication';
import ProfilePage from '../features/profile/profile/landing/profile';
import ProfileDetailPage from '../features/profile/profile/detail/detail';
import ProfileLogOutPage from '../features/profile/profile/logout/logout';
import FriendshipRequestsListPage from '../features/friends/friendShip/requests';
import GroupsListPage from '../features/groups/groups/list';
import { Spinner } from '@chakra-ui/react';
import ProtectedRoute from './ProtectedRoute';
import GroupDetailPage from '../features/groups/groups/detail';

const Home = lazy(() => import('./Home'));

const NotFound = lazy(() => import('./NotFound'));

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
