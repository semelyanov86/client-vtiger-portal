import { create } from 'zustand';

import { DEFAULT_SETTINGS } from '../config';

interface Settings {
  value: SettingsState;
  setColor: (value: string) => void;
  setRadius: (value: string) => void;
  setNavColor: (value: string) => void;
  setLayout: (value: string) => void;
  resetLayout: () => void;
  setThemeValues: () => void;
}

interface SettingsState {
  color: string;
  layout: string;
  radius: string;
  navColor: string;
  themeValues: ThemeValues;
}

interface ThemeValues {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  body: string;
  alternate: string;
  lightText: string;
  warning: string;
  danger: string;
  success: string;
  info: string;
  font: string;
  fontHeading: string;
  background: string;
  foreground: string;
  separator: string;
  separatorLight: string;
  primaryrgb: string;
  secondaryrgb: string;
  tertiaryrgb: string;
  quaternaryrgb: string;
  transitionTimeShort: string;
  transitionTime: string;
  navSizeSlim: string;
  borderRadiusXl: string;
  borderRadiusLg: string;
  borderRadiusMd: string;
  borderRadiusSm: string;
  spacingHorizontal: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  direction: string;
}

const getComputedValues = (): ThemeValues => {
  const rootStyle = window.getComputedStyle(document.body);
  return {
    primary: rootStyle.getPropertyValue('--primary').trim(),
    secondary: rootStyle.getPropertyValue('--secondary').trim(),
    tertiary: rootStyle.getPropertyValue('--tertiary').trim(),
    quaternary: rootStyle.getPropertyValue('--quaternary').trim(),
    body: rootStyle.getPropertyValue('--body').trim(),
    alternate: rootStyle.getPropertyValue('--alternate').trim(),
    lightText: rootStyle.getPropertyValue('--light-text').trim(),
    warning: rootStyle.getPropertyValue('--warning').trim(),
    danger: rootStyle.getPropertyValue('--danger').trim(),
    success: rootStyle.getPropertyValue('--success').trim(),
    info: rootStyle.getPropertyValue('--info').trim(),

    font: rootStyle.getPropertyValue('--font').trim(),
    fontHeading: rootStyle.getPropertyValue('--font-heading').trim(),

    background: rootStyle.getPropertyValue('--background').trim(),
    foreground: rootStyle.getPropertyValue('--foreground').trim(),
    separator: rootStyle.getPropertyValue('--separator').trim(),
    separatorLight: rootStyle.getPropertyValue('--separator-light').trim(),

    primaryrgb: rootStyle.getPropertyValue('--primary-rgb').trim(),
    secondaryrgb: rootStyle.getPropertyValue('--secondary-rgb').trim(),
    tertiaryrgb: rootStyle.getPropertyValue('--tertiary-rgb').trim(),
    quaternaryrgb: rootStyle.getPropertyValue('--quaternary-rgb').trim(),

    transitionTimeShort: rootStyle
      .getPropertyValue('--transition-time-short')
      .trim()
      .replace('ms', ''),
    transitionTime: rootStyle.getPropertyValue('--transition-time').trim().replace('ms', ''),
    navSizeSlim: rootStyle.getPropertyValue('--nav-size-slim').trim(),

    borderRadiusXl: rootStyle.getPropertyValue('--border-radius-xl').trim(),
    borderRadiusLg: rootStyle.getPropertyValue('--border-radius-lg').trim(),
    borderRadiusMd: rootStyle.getPropertyValue('--border-radius-md').trim(),
    borderRadiusSm: rootStyle.getPropertyValue('--border-radius-sm').trim(),
    spacingHorizontal: rootStyle.getPropertyValue('--main-spacing-horizontal').trim(),

    sm: rootStyle.getPropertyValue('--sm').trim(),
    md: rootStyle.getPropertyValue('--md').trim(),
    lg: rootStyle.getPropertyValue('--lg').trim(),
    xl: rootStyle.getPropertyValue('--xl').trim(),
    xxl: rootStyle.getPropertyValue('--xxl').trim(),
    direction: 'ltr',
  };
};

const initialState = {
  color: DEFAULT_SETTINGS.COLOR,
  layout: DEFAULT_SETTINGS.LAYOUT,
  radius: DEFAULT_SETTINGS.RADIUS,
  navColor: DEFAULT_SETTINGS.NAV_COLOR,
  themeValues: getComputedValues(),
} as SettingsState;

export const useSettingsStore = create<Settings>((set) => ({
  value: initialState,
  setColor: (data: string) =>
    set((store) => ({
      value: {
        ...store.value,
        color: data,
      },
    })),
  setThemeValues: () =>
    set((store) => ({
      value: {
        ...store.value,
        themeValues: getComputedValues(),
      },
    })),
  setRadius: (data: string) =>
    set((store) => ({
      value: {
        ...store.value,
        radius: data,
      },
    })),
  setNavColor: (data: string) =>
    set((store) => ({
      value: {
        ...store.value,
        navColor: data,
      },
    })),
  setLayout: (data: string) =>
    set((store) => ({
      value: {
        ...store.value,
        layout: data,
      },
    })),
  resetLayout: () =>
    set((store) => ({
      value: {
        ...store.value,
        layout: DEFAULT_SETTINGS.LAYOUT,
      },
    })),
}));
