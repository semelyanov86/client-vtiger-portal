import { ConfigCustomModules } from '../features/custom-module/types';

import {
  LAYOUT,
  MENU_BEHAVIOUR,
  NAV_COLOR,
  MENU_PLACEMENT,
  RADIUS,
  THEME_COLOR,
  USER_ROLE,
} from './constants.ts';

export const API_URL = import.meta.env.VITE_APP_API_URL as string;
export const JWT_SECRET = '123456' as string;

export const IS_DEMO = true;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;
export const SUPPORTED_MODULES = [
  'HelpDesk',
  'Project',
  'Invoice',
  'Faq',
  'Contacts',
  'Products',
  'Services',
  'Lead',
  'Documents',
  'SalesOrder',
  // 'ServiceContract',
];

export const CUSTOM_MODULES: ConfigCustomModules = {
  Assets: {
    default_sort: 'asset_no',
    list_fields: ['asset_no', 'assetstatus', 'assetname', 'datesold', 'serialnumber'],
    icon: 'Wallet',
    edit_fields: [
      'assetstatus',
      'assetname',
      'datesold',
      'product',
      'assetstatus',
      'description',
      'dateinservice',
      'shippingmethod',
      'shippingtrackingnumber',
    ],
    related: ['Documents'],
  },
};

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: 'Customer Portal',
  titleTemplate: '%s | Customer Portal',
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot',
  DASHBOARD: '/app',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
  USER_INFO: '/app/user/info',
  USER_SETTINGS: '/app/user/settings',
  USER_SECURITY: '/app/user/security',
  USER_PAYMENTS: '/app/user/payments',
  USER_EDIT: '/app/user/edit',
  HELPDESK: '/app/tickets',
  PROJECT: '/app/projects',
  FAQ: '/app/faq',
  INVOICE: '/app/invoices',
  SALES_ORDER: '/app/sales-orders',
  CUSTOM_MODULES: '/app/custom',
  SERVICE_CONTRACT: '/app/service-contracts',
};

export const TERMS_AND_CONDITIONS_URL = 'https://itvolga.com/privacy';

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Horizontal,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Pinned,
  LAYOUT: LAYOUT.Fluid,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
};
