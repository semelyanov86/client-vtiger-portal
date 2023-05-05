import { lazy } from 'react';
import { House } from 'react-bootstrap-icons';

import { MenuItem } from '../components/Navigation/main-menu/MainMenuItems.tsx';
import { DEFAULT_PATHS } from '../config';

export interface MenuRoutesInterface {
  mainMenuItems: MenuItem[];
  sidebarItems: MenuItem[];
}

const appRoot = DEFAULT_PATHS.APP.endsWith('/')
  ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  : DEFAULT_PATHS.APP;

const Home = lazy(() => import('../features/home/routes/Home.tsx'));

export const menuRoutes: MenuRoutesInterface = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/default`,
    },
    {
      path: `${appRoot}/dashboards`,
      component: Home,
      label: 'Dashboards',
      icon: House,
    },
  ],
  sidebarItems: [],
};
