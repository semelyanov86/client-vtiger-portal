import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '../components/Elements';
import { MainLayout } from '../components/Layout';
import { SUPPORTED_MODULES } from '../config';
import WithAuth from '../features/auth/components/WithAuth.tsx';
import { UserInfo } from '../features/auth/routes/UserInfo.tsx';
import { notEmpty } from '../utils/array.ts';
import { lazyImport } from '../utils/lazyImport';

const { Home } = lazyImport(() => import('../features/home/routes/Home.tsx'), 'Home');
const { TicketsRoutes } = lazyImport(() => import('../features/help-desk'), 'TicketsRoutes');
const { ProjectRoutes } = lazyImport(() => import('../features/project'), 'ProjectRoutes');
const { InvoiceRoutes } = lazyImport(() => import('../features/invoice'), 'InvoiceRoutes');
const { SalesOrderRoutes } = lazyImport(
  () => import('../features/sales-order'),
  'SalesOrderRoutes'
);
const { FaqsRoutes } = lazyImport(() => import('../features/faq'), 'FaqsRoutes');
const { UserEdit } = lazyImport(() => import('../features/auth/routes/UserEdit.tsx'), 'UserEdit');
const { UserSecurity } = lazyImport(
  () => import('../features/auth/routes/UserSecurity.tsx'),
  'UserSecurity'
);
const { UserSettings } = lazyImport(
  () => import('../features/auth/routes/UserSettings.tsx'),
  'UserSettings'
);

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

interface RouteElement {
  path: string;
  element: JSX.Element;
}

function getModulesRoutes(): RouteElement[] {
  const routes = [
    SUPPORTED_MODULES.includes('HelpDesk')
      ? {
          path: 'tickets/*',
          element: <TicketsRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Project')
      ? {
          path: 'projects/*',
          element: <ProjectRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Faq')
      ? {
          path: 'faq/*',
          element: <FaqsRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Invoice')
      ? {
          path: 'invoices/*',
          element: <InvoiceRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('SalesOrder')
      ? {
          path: 'sales-orders/*',
          element: <SalesOrderRoutes />,
        }
      : null,
  ];
  return routes.filter(notEmpty);
}

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
        path: 'user/edit',
        element: <UserEdit />,
      },
      {
        path: 'user/security',
        element: <UserSecurity />,
      },
      {
        path: 'user/settings',
        element: <UserSettings />,
      },
      ...getModulesRoutes(),
    ],
  },
];
