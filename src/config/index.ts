import {
  LAYOUT,
  MENU_BEHAVIOUR,
  NAV_COLOR,
  MENU_PLACEMENT,
  RADIUS,
  THEME_COLOR,
  USER_ROLE,
} from './constants.ts';
import { ConfigCustomModules } from '../features/custom-module/types';

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
];

export const CUSTOM_MODULES: ConfigCustomModules = {
  SPPayments: {
    default_sort: 'pay_no',
    list_fields: ['pay_no', 'amount', 'pay_date', 'type_payment', 'spstatus'],
    icon: 'Wallet',
    edit_fields: [
      'pay_date',
      'pay_type',
      'type_payment',
      'amount',
      'spstatus',
      'description',
      'doc_no',
      'pay_details',
      'cf_1380',
    ],
  },
};

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: 'Customer Portal',
  titleTemplate: '%s | Customer Portal',
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
};

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
