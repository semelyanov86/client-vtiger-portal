import { MenuItem } from '../components/Navigation/main-menu/MainMenuItems.tsx';
import { DEFAULT_PATHS } from '../config';
import { lazyImport } from '../utils/lazyImport.ts';

export interface MenuRoutesInterface {
  mainMenuItems: MenuItem[];
  sidebarItems: MenuItem[];
}

const appRoot = DEFAULT_PATHS.APP.endsWith('/')
  ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  : DEFAULT_PATHS.APP;

const { Home } = lazyImport(() => import('../features/home/routes/Home.tsx'), 'Home');

export const menuRoutes: MenuRoutesInterface = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/app`,
    },
    {
      path: `${appRoot}/app`,
      component: Home,
      label: 'Dashboards',
      icon: 'House',
    },
  ],
  sidebarItems: [],
};
