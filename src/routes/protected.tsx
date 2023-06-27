import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '../components/Elements';
import { MainLayout } from '../components/Layout';
import { DEFAULT_PATHS, SUPPORTED_MODULES } from '../config';
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
const { CustomModuleRoutes } = lazyImport(
  () => import('../features/custom-module'),
  'CustomModuleRoutes'
);
const { UserEdit } = lazyImport(() => import('../features/auth/routes/UserEdit.tsx'), 'UserEdit');
const { UserSecurity } = lazyImport(
  () => import('../features/auth/routes/UserSecurity.tsx'),
  'UserSecurity'
);
const { UserSettings } = lazyImport(
  () => import('../features/auth/routes/UserSettings.tsx'),
  'UserSettings'
);
const { UserPayments } = lazyImport(
  () => import('../features/payment/routes/UserPayments.tsx'),
  'UserPayments'
);
// eslint-disable-next-line
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
          path: clearRoutePath(DEFAULT_PATHS.HELPDESK) + '/*',
          element: <TicketsRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Project')
      ? {
          path: clearRoutePath(DEFAULT_PATHS.PROJECT) + '/*',
          element: <ProjectRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Faq')
      ? {
          path: clearRoutePath(DEFAULT_PATHS.FAQ) + '/*',
          element: <FaqsRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('Invoice')
      ? {
          path: clearRoutePath(DEFAULT_PATHS.INVOICE) + '/*',
          element: <InvoiceRoutes />,
        }
      : null,
    SUPPORTED_MODULES.includes('SalesOrder')
      ? {
          path: clearRoutePath(DEFAULT_PATHS.SALES_ORDER) + '/*',
          element: <SalesOrderRoutes />,
        }
      : null,
    {
      path: clearRoutePath(DEFAULT_PATHS.CUSTOM_MODULES) + '/*',
      element: <CustomModuleRoutes />,
    },
  ];
  return routes.filter(notEmpty);
}

export const protectedRoutes = [
  {
    path: DEFAULT_PATHS.DASHBOARD,
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
        path: clearRoutePath(DEFAULT_PATHS.USER_INFO),
        element: <UserInfo />,
      },
      {
        path: clearRoutePath(DEFAULT_PATHS.USER_EDIT),
        element: <UserEdit />,
      },
      {
        path: clearRoutePath(DEFAULT_PATHS.USER_SECURITY),
        element: <UserSecurity />,
      },
      {
        path: clearRoutePath(DEFAULT_PATHS.USER_SETTINGS),
        element: <UserSettings />,
      },
      {
        path: clearRoutePath(DEFAULT_PATHS.USER_PAYMENTS),
        element: <UserPayments />,
      },
      ...getModulesRoutes(),
    ],
  },
];

function clearRoutePath(str: string): string {
  return str.replace(/^\/app\//, '');
}
