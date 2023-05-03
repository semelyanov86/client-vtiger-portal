import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '../components/Elements';
import { MainLayout } from '../components/Layout';
import WithAuth from '../features/auth/components/WithAuth.tsx';
import { lazyImport } from '../utils/lazyImport';

const { Dashboard } = lazyImport(() => import('../features/misc'), 'Dashboard');

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
        path: '/',
        element: (
          <WithAuth>
            <Dashboard />
          </WithAuth>
        ),
      },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
