import { MenuItem } from '../components/Navigation/main-menu/MainMenuItems.tsx';
import { CUSTOM_MODULES, DEFAULT_PATHS, SUPPORTED_MODULES } from '../config';
import { notEmpty } from '../utils/array.ts';
import { lazyImport } from '../utils/lazyImport.ts';

export interface MenuRoutesInterface {
  mainMenuItems: MenuItem[];
  sidebarItems: MenuItem[];
}

const appRoot = DEFAULT_PATHS.APP.endsWith('/')
  ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  : DEFAULT_PATHS.APP;

const { Home } = lazyImport(() => import('../features/home/routes/Home.tsx'), 'Home');
const { Tickets } = lazyImport(() => import('../features/help-desk/routes/Tickets.tsx'), 'Tickets');
const { Invoices } = lazyImport(
  () => import('../features/invoice/routes/Invoices.tsx'),
  'Invoices'
);
const { SalesOrders } = lazyImport(
  () => import('../features/sales-order/routes/SalesOrders.tsx'),
  'SalesOrders'
);
const { Projects } = lazyImport(
  () => import('../features/project/routes/Projects.tsx'),
  'Projects'
);
const { Faqs } = lazyImport(() => import('../features/faq/routes/Faqs.tsx'), 'Faqs');
const { Entities } = lazyImport(
  () => import('../features/custom-module/routes/Entities.tsx'),
  'Entities'
);

function getMenuRoutes(): MenuItem[] {
  const items: (MenuItem | null)[] = [
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
    SUPPORTED_MODULES.includes('HelpDesk')
      ? {
          path: `${appRoot}/app/tickets`,
          component: Tickets,
          label: 'Tickets',
          icon: 'StickiesFill',
        }
      : null,
    SUPPORTED_MODULES.includes('Project')
      ? {
          path: `${appRoot}/app/projects`,
          component: Projects,
          label: 'Projects',
          icon: 'Briefcase',
        }
      : null,
    SUPPORTED_MODULES.includes('Invoice')
      ? {
          path: `${appRoot}/app/invoices`,
          component: Invoices,
          label: 'Invoices',
          icon: 'Coin',
        }
      : null,
    SUPPORTED_MODULES.includes('SalesOrder')
      ? {
          path: `${appRoot}/app/sales-orders`,
          component: SalesOrders,
          label: 'Sales Orders',
          icon: 'Bank',
        }
      : null,
    SUPPORTED_MODULES.includes('Faq')
      ? {
          path: `${appRoot}/app/faq`,
          component: Faqs,
          label: 'FAQ',
          icon: 'QuestionSquare',
        }
      : null,
  ];

  for (const key in CUSTOM_MODULES) {
    const moduleCfg = CUSTOM_MODULES[key];
    items.push({
      path: `${appRoot}/app/custom/${key}`,
      component: Entities,
      label: key,
      icon: moduleCfg.icon,
    });
  }
  return items.filter(notEmpty);
}

export const menuRoutes: MenuRoutesInterface = {
  mainMenuItems: getMenuRoutes(),
  sidebarItems: [],
};
