import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '../components/Elements';
import { MainLayout } from '../components/Layout';
import WithAuth from '../features/auth/components/WithAuth.tsx';
import { UserInfo } from '../features/auth/routes/UserInfo.tsx';
import { lazyImport } from '../utils/lazyImport';

const { Home } = lazyImport(() => import('../features/home/routes/Home.tsx'), 'Home');
const { TicketsRoutes } = lazyImport(() => import('../features/help-desk'), 'TicketsRoutes');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: (
      <WithAuth>
        <App />
      </WithAuth>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      { path: '*', element: <Navigate to="." /> },
      {
        path: 'user/info',
        element: <UserInfo />,
      },
      {
        path: 'tickets/*',
        element: <TicketsRoutes />,
      },
    ],
  },
];
